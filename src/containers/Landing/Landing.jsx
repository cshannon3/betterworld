import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useDocument } from "react-firebase-hooks/firestore";

import LeftPanel from "components/Panels/LeftPanel";
import ControlContext from "shared/control-context";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router-dom";
import { committeeIcons, quickLinks } from "data/dummydata";
import {
  LargeBodyText,
  PageSubtitleText,
  PageTitleText,
  ProjectCardText,
  ProjectCardTextWhite,
  SectionHeaderText,
  SmallestBodyTextBlack,
  SmallestBodyTextWhite,
} from "styles/sharedStyles";

import * as fb from "shared/firebase";

import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import QuickLinksSection from "components/QuickLinks";
import AtAGlanceModule from "components/AtAGlanceModule";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";

export default function Landing() {
  const ctrctx = useContext(ControlContext);
  const [value, loading, error] = useDocument(fb.getGroupRef(), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [link, setLink] = useState(null);
  let projectsData = ctrctx.getProjectsData();
  projectsData = projectsData ? Object.values(projectsData) : [];

  const LeftComponent = () => {
    const groupData = loading ? null : value && value.data();
    return (
      <div>
        <OverviewSection>
          <PageTitleText>CMU Against ICE</PageTitleText>
          <P10 />
          <PageSubtitleText>Mission Statement/Who We Are</PageSubtitleText>
          {loading && <span>Document: Loading...</span>}
          {groupData && <LargeBodyText>{groupData.description}</LargeBodyText>}
        </OverviewSection>
        <QuickLinksSection
          resources={groupData && groupData.resources}
          clickLink={(_link) => {
            setLink(_link);
          }}
          addLink={(url, name)=>{
            fb.updateGroup(url,name);
          }}
        />
      </div>
    );
  };
  const RightComponent = () => {
    if (link)
      return (
        <div style={{ height: "100%" }}>
          <button onClick={() => setLink(null)}>X</button>
          <a href={link} target="_blank">
            go to
          </a>
          <iframe
            width="100%"
            height="100%"
            src={link}
            allowFullScreen
          ></iframe>
        </div>
      );
    return (
      <CommitteeSection>
        <AtAGlanceModule />
        <UpdatesSection/>
      </CommitteeSection>
    );
  };

  return link ? (
    <ResponsiveSplitScreen
      currentPage={"home"}
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  ) : (
    <ResponsiveSplitScreen
      currentPage={"home"}
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
}

const P10 = styled.div`
  padding-top: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const OverviewSection = styled.div``;
// const QuickLinksSection = styled.div`
//   width: 100%;
// `;
const CommitteeSection = styled.div`
  width: 100%;
`;
const CommitteeBox = styled.div`
  position: relative;
  cursor: pointer;
  height: 111px;
  min-width: 244px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  background: #0cc998;
  img {
    position: absolute;
    top: 0px;
    right: 0px;
    height: 111px;
    min-width: 244px;
  }
  .contentBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 30px;
    height: 100px;

    .order {
      color: white;
      font-family: "Baloo 2";
      font-weight: normal;
      font-size: 26px;
      line-height: 28px;
    }

    .line {
      background-color: white;
      width: 50px;
      height: 3px;
      margin-top: 5px;
      border-radius: 11px;
    }
  }
`;

const LinkBox = styled.div`
  height: 60px;
  min-width: 60px;
  img {
    height: 54px;
    width: 60px;
    margin: 3px;
  }
`;

/*

/<QuickLinksSection>
        <P10/>
          <PageSubtitleText>Quick Links</PageSubtitleText>
          <Row>
            {quickData.map((data) => (
              <Tooltip title={data.tip}>
                <a href={data.url} target="_blank">
                  <LinkBox>
                    <img src={data.icon} alt={data.title} />
                  </LinkBox>
                </a>
              </Tooltip>
            ))}
          </Row>
        </QuickLinksSection> 
 return (
    <RowWrapper>
      <LeftPanel />
      <ContentContainer isMobile={isMobile}>
       
        <CommitteeSection>
          <SectionHeaderText> Committees</SectionHeaderText>
          <Row>
            {committeeData.map((data) =>
              <CommitteeBox onClick={()=>{
                history.push(`/committees/${data.id}`);
              }}>
                <div className="contentBox">
                  <div className="order">{`0${data["order"]}`}</div>
                  <ProjectCardTextWhite className="name">{data["name"]}</ProjectCardTextWhite>
                  <div className="line" />
                </div>
                <img src={committeeIcons[data["id"]]} alt={data["name"]} />
              </CommitteeBox>
            )}
          </Row>
        </CommitteeSection>
        <ProjectsSection>
          <SectionHeaderText> Projects/Actions</SectionHeaderText>
          <Row>
            {
              projectsData.sort((a,b)=>a["end_date"]>b["end_date"]?-1:1).map((project)=>{
               return( 
               project["isArchived"]?
               <ArchivedProjectBox onClick={()=>{
                history.push(`/projects/${project.id}`);
              }}>
                    <ProjectCardText isArchived={project["isArchived"]}>{project.name}</ProjectCardText>
                    <div className="line"/>
                    <br/>
                    <SmallestBodyTextWhite><span >Start date:</span>{formatDate(project["start_date"])}</SmallestBodyTextWhite>
                    <SmallestBodyTextWhite><span >End Date: </span> {formatDate(project["end_date"])}</SmallestBodyTextWhite>
                    <br/>
                    <SmallestBodyTextWhite><span>Updates:</span> 22</SmallestBodyTextWhite>
                    <SmallestBodyTextWhite><span>Contributors:</span>{project["contributors"]?.length}</SmallestBodyTextWhite>
              </ArchivedProjectBox>:

               <ProjectBox onClick={()=>{
                  history.push(`/projects/${project.id}`);
                }}>
                      <ProjectCardText>{project.name}</ProjectCardText>
                      <div className="line"/>
                      <br/>
                      <SmallestBodyTextBlack ><span >Start date:</span> {formatDate(project["start_date"])}</SmallestBodyTextBlack>
                      <SmallestBodyTextBlack ><span >Est. Completion:</span>{formatDate(project["end_date"])}</SmallestBodyTextBlack>
                      <br/>
                      <SmallestBodyTextBlack ><span>Updates:</span> {getNumUpdates(project)}</SmallestBodyTextBlack>
                </ProjectBox>
                )
              })
            }
          </Row>
        </ProjectsSection>
      </ContentContainer>
    </RowWrapper>
  )
*/
