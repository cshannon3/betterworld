import ProjectContext from "../../ProjectContext";

import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import HelpRequestsModal from "./HelpRequestsModal";
//need to put in SmallCirclePhoto or CirclePhoto

export default function ProjectInfoModule() {
  const ctx = useContext(ProjectContext);
  const projectData = ctx.data;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  // const [modalType,setModalType] =useState(null);

  function openModal(cell, type) {
    setModalData(cell.row.original);

    setIsOpen(true);
  }

  function closeModal() {
    //window.location = window.location.toString().split("#")[0]; // add it as a hash to the URL.
    // var uri = window.location.toString();
    // if (uri.indexOf("#") > 0) {
    //     var clean_uri = uri.substring(0, uri.indexOf("#"));
    //     window.history.replaceState({}, document.title, clean_uri);
    // }
    setIsOpen(false);
  }
  let helpRequests = [];
  let totalUpdates = [];

  projectData["sections"].forEach((section) => {
    if (section["updates"])
      section["updates"].forEach((update) => {
        totalUpdates.push({ ...update, section_name: section.name });
        if (update && update["type"] == "request help") {
          helpRequests.push({ ...update, section_name: section.name });
        }
      });
  });


  return (
    <ProjectInfoContainer>
      <HelpRequestsModal
        data={projectData}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        helpRequests={helpRequests}
      ></HelpRequestsModal>
      <div>
        <div>
          <ProjectsSubtitle>
            CMU AGAINST ICE<span> PROJECTS</span>
          </ProjectsSubtitle>
          <ProjectsTitle>{projectData["name"]}</ProjectsTitle>
        </div>
      
      <ProjectsSubtitle>{`Point Person: ${projectData["point_person"]["name"]}`}</ProjectsSubtitle>
      <DescriptionText>{ctx.data["description"]}</DescriptionText>
      </div>
      <UpdatesRow >
        <UpdatesText>{`${totalUpdates.length} Total Updates `}</UpdatesText>
        <UpdatesText
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {`${helpRequests.length} Open Help Requests`}{" "}
        </UpdatesText>
      </UpdatesRow >
    </ProjectInfoContainer>
  );
}


const ProjectInfoContainer = styled.div`
  height:100%;
  width:50%;
  padding: 0px 50px 0px 0px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;


const ProjectsTitle = styled.h2`
  font-family: Baloo 2;
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 70px;
  display: flex;
  align-items: center;
  color: #0cc998;
`;

const ProjectsSubtitle = styled.p`
  font-family: Baloo 2;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  color: #000000;
  span {
    color: #0cc998;
  }
  white-space: pre-wrap;
`;


const UpdatesRow = styled.div`
    display: flex;
    justify-content: space-between;
`;
const UpdatesText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
  cursor: pointer;
  text-decoration: underline;
  
`;
const DescriptionText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
`;





// const DateTitle = styled.h2`
//   font-family: Baloo 2;
//   font-style: normal;
//   font-weight: bold;
//   font-size: 40px;
//   line-height: 70px;
//   display: flex;
//   align-items: center;
//   letter-spacing: -0.02em;
//   color: black;
// `;