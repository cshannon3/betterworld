import React, { useContext, useState, useEffect } from "react";
import styled, {keyframes} from "styled-components";
import ControlContext from "../../shared/control-context";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory, useParams } from "react-router-dom";
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
import * as fb from "shared/firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

export default function ProjectsPage() {
 // const ctrctx = useContext(ControlContext);
  const params = useParams();

  const [projectsData, setProjectsData] = useState(null);
  const [projectsSnapshot, loadingProject, errorProject] = useCollection(
    fb.getProjects(params.groupId),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  if (!loadingProject && !projectsData) {
    const _data = projectsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setProjectsData(_data);
  }


  let history = useHistory();
  const LeftComponent = () => {
    return (
      <LeftStyle>
        <OverviewSection>
          <PageTitleText>Projects</PageTitleText>


        </OverviewSection>
        <ProjectsSection>
          <SectionHeaderText> Active Projects </SectionHeaderText>
          {!projectsData ? (<Row></Row>):
          (<AnimatedRow>
            {projectsData&&projectsData
              .filter((v) => !v.isArchived)
              .sort((a, b) => (a["end_date"] > b["end_date"] ? -1 : 1))
              .map((project) => {
                return (
                  <ProjectBox
                    project={project}
                    onClick={() => history.push(`/${params.groupId}/projects/${project.id}`)}
                  />
                );
              })}
          </AnimatedRow>)
         }
          <SectionHeaderText> Archived Projects </SectionHeaderText>
          {!projectsData ? (<Row></Row>):
          (<AnimatedRow>
            {
            projectsData
              .filter((v) => v.isArchived)
              .sort((a, b) => (a["end_date"] > b["end_date"] ? -1 : 1))
              .map((project) => {
                return (
                  <ProjectBox
                    project={project}
                    onClick={() => history.push(`/${params.groupId}/past-projects/${project.id}`)}
                  />
                );
              })
              
              }
          </AnimatedRow>)}
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
  height: 200px;
`;


const fadeIn = keyframes`
  0% {
    transform: translateX(50%);
    opacity:0;
   
  }
  100% {
    transform: translateX(0);
    opacity:1;
  }
`;

const AnimatedRow = styled(Row)`
  animation: ${fadeIn} 1s ease;
  animation-iteration-count: 1;
`;
const OverviewSection = styled.div`
  margin-bottom: 30px;
`;

const ProjectsSection = styled.div`
  height: 100%;
`;

