import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import ControlContext from "../../shared/control-context";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router-dom";
import {
  PageTitleText,
  SectionHeaderText,
  SmallestBodyTextBlack,
} from "styles/sharedStyles";
import ProjectBox from "components/projectBox";
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";
import { EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

export default function ProjectsPage() {
  const ctrctx = useContext(ControlContext);

  let projectsData = ctrctx.getProjectsData();
  projectsData = projectsData ? Object.values(projectsData) : [];

  let history = useHistory();
  const LeftComponent = () => {
    return (
      <LeftStyle>
        <OverviewSection>
          <PageTitleText>Projects</PageTitleText>


        </OverviewSection>
        <ProjectsSection>
          <SectionHeaderText> Active Projects </SectionHeaderText>
          <Row>
            {projectsData
              .filter((v) => !v.isArchived)
              .sort((a, b) => (a["end_date"] > b["end_date"] ? -1 : 1))
              .map((project) => {
                return (
                  <ProjectBox
                    project={project}
                    onClick={() => history.push(`/projects/${project.id}`)}
                  />
                );
              })}
          </Row>
          <SectionHeaderText> Archived Projects </SectionHeaderText>
          <Row>
            {projectsData
              .filter((v) => v.isArchived)
              .sort((a, b) => (a["end_date"] > b["end_date"] ? -1 : 1))
              .map((project) => {
                return (
                  <ProjectBox
                    project={project}
                    onClick={() => history.push(`/past-projects/${project.id}`)}
                  />
                );
              })}
          </Row>
        </ProjectsSection>
      </LeftStyle>
    );
  };
  const RightComponent = () => {
    return (
      <RightStyle>
        <UpdatesSection allowAddUpdate={false} />
      </RightStyle>
    );
  };

  return (
    <ResponsiveSplitScreen
      currentPage={"projects"}
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
}


const editStye = {
  fontFamily: "Helvetica Neue",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "16px",
  color: "#000000"
}
const RightStyle = styled.div`
  height: 100%;
  margin: auto;
`;
const LeftStyle = styled.div`
  height: 100%;
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  overflow: scroll;
  margin-bottom: 20px;
  padding: 5px;
  max-width: 50vw;
`;
const OverviewSection = styled.div`
  margin-bottom: 30px;
`;

const ProjectsSection = styled.div`
  height: 100%;
`;

