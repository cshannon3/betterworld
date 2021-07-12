import React, { useContext, useState, useEffect, useRef } from "react";
import "react-slideshow-image/dist/styles.css";
import { NavLink, useParams } from "react-router-dom";
import {
  LadderModule,
  ProjectInfoModule,
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
import { ResponsiveFullScreen } from "components/ResponsiveSplitScreen";

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

  const MainComponent = () => {
    return (
      <ContentContainer>
        <Flex>
          <ProjectInfoModule
            projectData={projectData}
            // setIsUpdatesModalOpen={openUpdatesModal}
            // setIsEditProjectModalOpen={() => setIsEditProjectModalOpen(true)}
            totalUpdates={totalUpdates}
            helpRequests={helpRequests}
            isUserAdmin={user && user.isAdmin}
          />
          <AtAGlanceModule projectData={projectData} />
        </Flex>
        <LadderModule
          projectData={projectData}
          contributors={contributorsSections}
        />
      </ContentContainer>
    );
  };

  return <ResponsiveFullScreen MainComponent={MainComponent} />;
};

export default ActiveProjectPage;

/* <Breadcrumbs>
            <NavLink to='/'><BreadcrumbText>CMU AGAINST ICE</BreadcrumbText></NavLink>
            <Arrow> &gt; </Arrow>
            <NavLink to='/projects'><BreadcrumbText>Projects</BreadcrumbText></NavLink>
            <Arrow> &gt; </Arrow>
            <NavLink to={`/projects/${projectData.name}`}><BreadcrumbText>{projectData.name}</BreadcrumbText></NavLink>
        </Breadcrumbs> */





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
      width: 50%;
      height: 50vh;
    }
    `}
`;


const ContentContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 5vh 50px 3vh 40px;
`;
