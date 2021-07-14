import React, { useContext, useState, useEffect, useRef } from "react";
import "react-slideshow-image/dist/styles.css";
import { NavLink, useParams } from "react-router-dom";
import {
  LadderModule,
  AtAGlanceModule,
} from "../../old/ProjectPage/Modules/modules";
import styled from "styled-components";

import ControlContext from "shared/control-context";
import {
  PageTitleText,
  PageSubtitleText,
  RegularBodyText,
  EmphasizedSmallBodyText,
} from "styles/sharedStyles";

import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";


const ActiveProjectPage = () => {
  const { projectId } = useParams();

  const appCtx = useContext(ControlContext);
  const urlParts = window.location.href.split("/");
  console.log(urlParts);
  const [projectData, setProjectData] = useState(
    appCtx.getProjectData(projectId)
  );
  const user = appCtx.user;

  let helpRequests = [];
  let totalUpdates = [];

  projectData["sections"]?.forEach((section) => {
    if (section["updates"])
      section["updates"].forEach((update) => {
        totalUpdates.push({ ...update, section_name: section.name });
        if (update && update["type"] == "request help") {
          helpRequests.push({ ...update, section_name: section.name });
        }
      });
  });
  let contributorsSections = {};

  projectData["sections"]?.forEach((section) => {
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

  const LeftComponent = () => {
    return (
      <ContentContainer>
        <Flex>
          <ProjectInfoContainer>
               <div>
                 <div>
                   <ProjectsTitle>{projectData["name"]}</ProjectsTitle>
                 </div>
               
               <PointPerson>{`Point Person: ${projectData["point_person"]["name"]}`}</PointPerson>
               <DescriptionText>{projectData["description"]}</DescriptionText>
               </div>
           
             </ProjectInfoContainer>
        </Flex>
        <LadderModule
          projectData={projectData}
          contributors={contributorsSections}
        />
      </ContentContainer>
    );
  };


  const RightComponent = () => {
    return (
      <RightStyle>
          <AtAGlanceModule projectData={projectData} />
          <UpdatesSection/>
      </RightStyle> 
    );
  };
  return <ResponsiveSplitScreen 
    LeftComponent={LeftComponent} 
    RightComponent={RightComponent}
  />;
};

export default ActiveProjectPage;


const RightStyle= styled.div`
  height:100%

`
const LeftStyle= styled.div`
  height:100%
`
const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
`;
 
const ProjectInfoContainer = styled.div`
  height:100%;
  padding: 0px 50px 0px 0px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;


const ProjectsTitle = styled.h2`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 70px;
  display: flex;
  align-items: center;
  color: #0cc998;
`;

const ProjectsSubtitle = styled.p`
  font-family: 'Baloo 2';
  font-weight: 800;
  font-size: 16px;
  color: #000000;
  span {
    color: #0cc998;
  }
  white-space: pre-wrap;
  padding-bottom: 15px;
`;
const PointPerson = styled(ProjectsSubtitle)`
  padding-top: 15px;
`;

const DescriptionText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
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
      width: 50%;
      height: 50vh;
    }
    `}
`;



/* <Breadcrumbs>
            <NavLink to='/'><BreadcrumbText>CMU AGAINST ICE</BreadcrumbText></NavLink>
            <Arrow> &gt; </Arrow>
            <NavLink to='/projects'><BreadcrumbText>Projects</BreadcrumbText></NavLink>
            <Arrow> &gt; </Arrow>
            <NavLink to={`/projects/${projectData.name}`}><BreadcrumbText>{projectData.name}</BreadcrumbText></NavLink>
        </Breadcrumbs> */

