import React, { useContext, useState, useRef } from "react";
import styled from "styled-components";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";

import ControlContext from "shared/control-context";
import {
  PageTitleText,
  PageSubtitleText,
  RegularBodyText,
  EmphasizedSmallBodyText,
} from "styles/sharedStyles";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import * as fb from "shared/firebase";


const ArchivedProjectPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const { groupId, projectId } = useParams();

  const [projectData, setProjectData] = useState(null);
  const [projectSnapshot, loadingProject, errorProject] = useDocument(
    fb.getProjectRef({id:projectId, groupId}),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  const [updatesSnapshot, loadingUpdates, errorUpdates] = useCollection(
    fb.getProjectUpdates({groupId, projectId}),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  const [membersSnapshot, loadingMembers, errorMembers] = useCollection(
    fb.getMembers({groupId}),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );


  let helpRequests = [];
  let totalUpdates = [];

  if (!loadingProject &&  !loadingUpdates &&!loadingMembers&& !projectData ) {
    let _projectData = {...projectSnapshot.data(),  id:projectSnapshot.id, contributors:[], updates:[]};
    _projectData["contributors"] = membersSnapshot.docs.filter((v) => (("projects" in v.data()) && (projectId in v.data().projects))).map((v)=>{return {...v.data(), id:v.id}});
    _projectData["updates"] = updatesSnapshot.docs.map((d)=>{return {...d.data(), id:d.id}});
   
    _projectData["sections"]?.forEach((section) => {
      section["updates"] =  _projectData["updates"]
      .filter((v) => v.sectionId == section.id);
    });
    
    setProjectData(_projectData);
    totalUpdates = _projectData["updates"];
    helpRequests = _projectData["updates"].filter((d)=>d.type == "request help");
  }

  let contributorsSections = {};
  projectData &&projectData["sections"]?.forEach((section) => {
    let names = [];
    projectData["contributors"]?.forEach((contr) => {
      if (
        contr.projects[projectData.id].roles.filter(
          (role) => role.sectionId == section.id
        ).length
      ) {
        names.push(contr);
      }
    });
    contributorsSections[section["id"]] = [...names];
  });

  let contributorsText = projectData && "contributors" in projectData &&
    projectData["contributors"] &&
    projectData["contributors"].map((data) => data.name).join(", ");

  const LeftComponent = () => {
    return  projectData && (
      <div>
        <PageTitleText>{projectData && projectData["name"]}</PageTitleText>
        <Flex isMobile={isMobile}>
          <div className={"GalleryStyle"}>
            <Slideshow
              images={
                projectData["display_images"] ??
                projectData["artifact_images"] ??
                []
              }
            />
          </div>
        </Flex>
        <Flex isMobile={isMobile}>
          <OverviewTextStyle>
            <PageSubtitleText>Description</PageSubtitleText>
            <RegularBodyText>
              {projectData["description"] ?? "No description"}
            </RegularBodyText>
          </OverviewTextStyle>
          <OverviewTextStyle>
            <PageSubtitleText>Outcome</PageSubtitleText>
            <RegularBodyText>
              {projectData["outcome"] ?? "No Outcome"}
            </RegularBodyText>
          </OverviewTextStyle>
        </Flex>
      </div>
    );
  };
  const RightComponent = () => {
    return projectData && (
      <div>
        <AtAG>
          <PageSubtitleText>Timespan</PageSubtitleText>
          <EmphasizedSmallBodyText>March 2020</EmphasizedSmallBodyText>
          <PageSubtitleText>Contributors</PageSubtitleText>

          {projectData["contributors"] && (
            <UserText>{contributorsText}</UserText>
          )}
          <PageSubtitleText>Artifacts</PageSubtitleText>
          <ResourceBox>
            {projectData["resources"] &&
              projectData["resources"].map((data) => (
                <ArtifactLink>
                  <a href={data.url} target="_blank">
                    {data.name}
                  </a>
                </ArtifactLink>
              ))}
          </ResourceBox>
        </AtAG>
      </div>
    );
  };

  return (
    <ResponsiveSplitScreen
      currentPage={"projects"}
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
      projectName={projectData && projectData["name"]}
    />
  );
};

const Slideshow = ({ images }) => {
  const slideRef = useRef();
  return (
    <Slide
      ref={slideRef}
      easing="ease"
      style={{ width: "100%", paddingTop: "50px" }}
    >
      {images.map((i) => {
        return (
          <EachSlide
            style={{
              backgroundImage: `url(${i.url})`,
              width: "400px",
              height: "300px",
              margin: "auto",
            }}
          ></EachSlide>
        );
      })}
    </Slide>
  );
};

export default ArchivedProjectPage;

const UserText = styled.div`
  padding-bottom: 20px;
  font-size: 16px;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;

  ${({ isMobile }) =>
    isMobile
      ? `
  flex-direction: column;

`
      : `height:47%;
      .GalleryStyle{
        width: 60%;
        height: 50vh;
        margin:auto;
      }
      `}
`;

const AtAG = styled.div`
  padding-left: 10px;
  padding-top: 40px;
  width: 100%;
`;

const ResourceBox = styled.div`
  padding-left: 20px;
`;

const ArtifactLink = styled(RegularBodyText)`
  align-items: center;
`;
const OverviewTextStyle = styled.div`
  width: 100%;
  padding: 20px;
`;

const EachSlide = styled.div`
  height: 250px;
  width: 200px;
  background-size: cover;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    height: 150px;
  }

  span {
    padding: 20px;
    font-size: 20px;
    background: #efefef;
    text-align: center;
  }
`;
