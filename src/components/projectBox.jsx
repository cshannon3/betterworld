import React from "react";
import styled from "styled-components";
import * as styles from 'styles/sharedStyles';


const ProjectBox = ({ project, onClick = () => {} }) => {
  const formatDate = (d) => {
    return d.substring(0, d.length - 13);
  };
  const getNumUpdates = (projectData) => {
    let numUpdates = 0;
    if (projectData["updates"]) numUpdates = projectData["updates"].length;
    return numUpdates;
  };

  return project["isArchived"] ? (
    <ArchivedProjectBox onClick={onClick}>
      <styles.ProjectCardText isArchived={project["isArchived"]}>
        {project.name}
      </styles.ProjectCardText>
      <div className="line" />
      <br />
      <styles.SmallestBodyTextWhite>
        <span>Start date:</span>
        {formatDate(project["start_date"])}
      </styles.SmallestBodyTextWhite>
      <styles.SmallestBodyTextWhite>
        <span>End Date: </span> {formatDate(project["end_date"])}
      </styles.SmallestBodyTextWhite>
      <br />
      <styles.SmallestBodyTextWhite>
        <span>Updates:</span> 22
      </styles.SmallestBodyTextWhite>
      <styles.SmallestBodyTextWhite>
        <span>Contributors:</span>
        {project["contributors"]?.length}
      </styles.SmallestBodyTextWhite>
    </ArchivedProjectBox>
  ) : (
    <ProjectBoxStyle onClick={onClick}>
      <styles.ProjectCardText>{project.name}</styles.ProjectCardText>
      <div className="line" />
      <br />
      <styles.SmallestBodyTextBlack>
        <span>Start date:</span> {formatDate(project["start_date"])}
      </styles.SmallestBodyTextBlack>
      <styles.SmallestBodyTextBlack>
        <span>Est. Completion:</span>
        {formatDate(project["end_date"])}
      </styles.SmallestBodyTextBlack>
      <br />
      <styles.SmallestBodyTextBlack>
        <span>Updates:</span> {getNumUpdates(project)}
      </styles.SmallestBodyTextBlack>
    </ProjectBoxStyle>
  );
};

export default ProjectBox;

const ProjectBoxStyle = styled.a`
  height: 194px;
  min-width: 244px;
  width: 244px;
  cursor: pointer;
  text-decoration: none;
  background: #fafafa;
  border: 1px solid #0cc998;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 20px 15px;
`;

const ArchivedProjectBox = styled.a`
  height: 194px;
  min-width: 244px;
  width: 244px;
  cursor: pointer;
  text-decoration: none;
  background: #b6b6b6;
  border: 1px solid #0cc998;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 20px 15px;
`;
