import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import LeftPanel from "containers/Panels/LeftPanel";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Tooltip from "@material-ui/core/Tooltip";
import { useMediaQuery } from 'react-responsive';
 

import {
  LadderModule,
  ProjectInfoModule,
  AtAGlanceModule,
} from "./Modules/modules";
import {
  HelpRequestsModal,
  LadderModal,
  EditProjectInfoModal
} from "./Modals/index"


import ProjectContext from "./ProjectContext";
import ControlContext from "../../shared/control-context";
import { updateProject } from "shared/firebase";
import { PageTitleText,PageSubtitleText, RegularBodyText, EmphasizedSmallBodyText } from "styles/sharedStyles";

export default function ProjectPage() {
  const appCtx = useContext(ControlContext);
  const urlParts = window.location.href.split("/");
  const projectId = urlParts[urlParts.length - 1];

  const [projectData, setProjectData] = useState(
    appCtx.getProjectData(projectId)
  );

  
  return (
    <ProjectContext.Provider
      value={{
        data: projectData,
        updateSection: (sectionData) => {
          let sections = [...projectData["sections"]];
          let s = sections.findIndex((sec) => sec.id == sectionData.id);

          sections[s] = sectionData;
          const newData = { ...projectData, sections: sections };
          updateProject(newData.id, newData);
          setProjectData(newData);

        },
      }}
    >

      <Row>
        <LeftPanel />
        {projectData["isArchived"] ? (
          <ArchivedProjectPage projectData={projectData} user={appCtx.user}/>
        ) : (
         <ActiveProjectPage projectData={projectData} user={appCtx.user}/>
        )}
      </Row>
    </ProjectContext.Provider>
  );
}


const ActiveProjectPage = ({projectData, user}) => {


  const [isLadderModalOpen,setIsLadderModalOpen] =useState(false);
  const [isUpdatesModalOpen,setIsUpdatesModalOpen] =useState(false);
  const [isEditProjectModalOpen,setIsEditProjectModalOpen] =useState(false);
  const [ladderModalData,setLadderModalData] =useState(null);
  const [isOnlyHelpUpdates,setIsOnlyHelpUpdates] =useState(false);


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

  projectData["sections"]?.forEach((section)=>{
         
        let names = [];
        console.log(projectData["contributors"]);
        projectData["contributors"]?.forEach((contr)=>{
            if(contr.projects[projectData.id].roles.filter((role)=>role.sectionId==section.id).length){
                names.push(contr);
            }
        });
        contributorsSections[section["id"]]=[...names]
  });




  function openLadderModal(row) {
      setIsUpdatesModalOpen(false);
      setIsLadderModalOpen(true);
      setLadderModalData({...row, contributors: contributorsSections[row.id]});
  }

  function closeLadderModal(){
    //window.location = window.location.toString().split("#")[0]; // add it as a hash to the URL.
    var uri = window.location.toString();
    if (uri.indexOf("#") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("#"));
        window.history.replaceState({}, document.title, clean_uri);// This might be a problem
    }
    setLadderModalData(null);
    setIsLadderModalOpen(false);
  }

  function openUpdatesModal() {  setIsLadderModalOpen(false); setIsUpdatesModalOpen(true);}
  function closeUpdatesModal() {setIsUpdatesModalOpen(false);}
  function closeEditProjectModal() {setIsEditProjectModalOpen(false);}

  return (
    <ContentContainer>
        <LadderModal
          data={ladderModalData}
          isOpen={isLadderModalOpen}
          setLadderData={(newData)=>{setLadderModalData(newData)}}
          onRequestClose={closeLadderModal} >
      </LadderModal>
      <HelpRequestsModal
          data={projectData}
          isOpen={isUpdatesModalOpen}
          onRequestClose={closeUpdatesModal}
          helpRequests={helpRequests}
          isOnlyHelpUpdates={isOnlyHelpUpdates} >
      </HelpRequestsModal>
      <EditProjectInfoModal
          projectData={projectData}
          isOpen={isEditProjectModalOpen}
          onRequestClose={closeEditProjectModal}>
      </EditProjectInfoModal>

    <Flex>
      <ProjectInfoModule
          projectData={projectData}
          setIsUpdatesModalOpen={openUpdatesModal}
          setIsEditProjectModalOpen={()=>setIsEditProjectModalOpen(true)}
          totalUpdates={totalUpdates}
          helpRequests={helpRequests}
          isUserAdmin={user && user.isAdmin}
      />
      <AtAGlanceModule projectData={projectData} />
    </Flex>
    <LadderModule
        projectData={projectData}
        openLadderModal={openLadderModal}
        contributors={contributorsSections}
    />
  </ContentContainer>
  );
}

const ArchivedProjectPage = ({projectData , user}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })

  let contributorsText = projectData["contributors"].map((data) => (data.name)).join(", ");

return (<Con>
            <div>
              <PageSubtitleText>CMU AGAINST ICE</PageSubtitleText>
              <PageTitleText>{projectData.name} (Archived)</PageTitleText>
            </div>
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
              <AtAG>
                <PageSubtitleText>Timespan</PageSubtitleText>
                <EmphasizedSmallBodyText>March 2020</EmphasizedSmallBodyText>
                <PageSubtitleText>Contributors</PageSubtitleText>

                {projectData["contributors"] &&  <UserText>{contributorsText}</UserText>}

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
            </Flex>
            <div>
              <Flex isMobile={isMobile}>
                <OverviewTextStyle>
                  <PageSubtitleText>Description</PageSubtitleText>
                  <RegularBodyText>
                    {projectData["description"] ?? "No description"}
                  </RegularBodyText>
                </OverviewTextStyle>
                <OverviewTextStyle>
                  <PageSubtitleText>Outcome</PageSubtitleText>
                  <RegularBodyText>{projectData["outcome"] ?? "No Outcome"}</RegularBodyText>
                </OverviewTextStyle>
              </Flex>
            </div>
          </Con>);
}



const Slideshow = ({ images }) => {
  const slideRef = useRef();
  return (
    <Slide
      ref={slideRef}
      easing="ease"
      style={{ width: "100%", paddingTop: "50px" }}
    >
      {/* <SlideImg src={"https://images.unsplash.com/photo-1623141629222-287c9e385a40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"}/> */}
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
      :`height:50%;
      .GalleryStyle{
        width: 50%;
        height: 50vh;
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
const GalleryStyle = styled.div`
  width: 50%;
  height: 50vh;
`;

const ArtifactLink = styled(RegularBodyText)`
  align-items: center;
`;


const Contibutors = styled.p`
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: bold;
  font-size: 11.3495px;
  line-height: 15px;
`;

const ContributorBox = styled.div`
  height: 60px;
  background: grey;
  margin-bottom: 20px;
`;

const OverviewTextStyle = styled.div`
  width: 100%;
  padding: 20px;
`;

const Con = styled.div`
  width: 90%;
  padding: 5vh 50px 3vh 40px;
  display: flex;
  flex-direction: column;
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


// const TitleText = styled.h1`
//   font-family: 'Baloo 2';
//   font-style: normal;
//   font-weight: bold;
//   font-size: 60px;
//   line-height: 70px;

//   color: #0cc998;
// `;

// const TextBody = styled.p`
//   font-family: 'Helvetica';
//   font-style: normal;
//   font-weight: normal;
//   font-size: 18px;
//   line-height: 24px;
//   color: #000000;
// `;

const Row = styled.div`
  display: flex;
  width: 100%;
`;
const ContentContainer = styled.div`

  width: 100%;
  height: 100vh;
  padding: 5vh 50px 3vh 40px;

`;

// const TextSubtitle = styled.div`
//   font-family: 'Baloo 2';
//   font-style: normal;
//   font-weight: 800;
//   font-size: 26px;
//   line-height: 41px;
//   display: flex;
//   align-items: center;
//   letter-spacing: -0.02em;
//   color: #000000;
// `;


  // let helpRequests = [];
  // if(!projectData["isArchived"]){
  //   projectData["sections"].forEach((section)=>{
  //     if(section["updates"]) section["updates"].forEach((update)=>{
  //       if(update && update["type"]=="request help"){
  //         helpRequests.push({...update, "name":section.name})
  //       }
  //     });
  //   });
  // }

  //const [modalType,setModalType] =useState(null);


  // console.log(helpRequests);
  //dummyData["Immigration Justice Zine"]
// const slideImages = [
//     "https://images.unsplash.com/photo-1623141629222-287c9e385a40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format",
//     "https://firebasestorage.googleapis.com/v0/b/betterworld2.appspot.com/o/images%2FScreen%20Shot%202021-06-06%20at%2011.30.40%20PM.png?alt=media&token=bc853697-074f-4a2a-ad2d-f8e9060f91d0",
//     "https://unsplash.com/photos/lzM4YodDIW8",
//   ];

// useEffect(() => {
//     if(projectData ==null){
//         let da = appCtx.getProjectData(projectId);
//        if(da!=null){
//            console.log("Set")
//            setProjectData(da);
//        }
//     }
// });
// addSectionToProject: () =>{},
// editSection:()=>{},
// removeSectionFromProject:()=>{},
// addMemberToSection: () =>{},
// removeMemberFromSection: () =>{},
// getStageData: ()=>{},

// addMemberToStage: ()=>{},
// removeMemberFromStage: ()=>{ },

// addHelpRequestToStage:()=>{},
// handleHelpRequest:()=>{},

// addResourceToStage: ()=>{},
// updateStageStatus: () =>{},

// addUpdate: (updateData, sectionId)=>  {

//     let sections = [...projectData["sections"]];
//     let s = sections.findIndex((sec)=>sec.id==sectionId);
//     sections[s] = {...sections[s],  "updates":[...sections[s]["updates"], updateData]}
//     console.log(s);
//     const newData = {...projectData, "sections":sections};
//     updateProject(newData.id, newData);
//     setProjectData(newData);
// },
// updateUpdate: (updateData, sectionId)=>  {
//     let sections = [...projectData["sections"]];
//     let s = sections.findIndex((sec)=>sec.id==sectionId);
//     let newUpdates = sections[s]["updates"];
//     let u = newUpdates.findIndex((up)=>up.id==updateData.id);
//     newUpdates[u]=updateData;
//     sections[s] = {...sections[s],  "updates":newUpdates}
//     const newData = {...projectData, "sections":sections};
//     updateProject(newData.id, newData);
//     setProjectData(newData);
// },

// deleteUpdate: (updateData, sectionId)=>  {
//     let sections = [...projectData["sections"]];
//     let s = sections.findIndex((sec)=>sec.id==sectionId);
//     console.log(sections[s]);
//     if(sections[s]["updates"].find(v=>v.id==updateData.id).authorId==appCtx.user.id){
//         sections[s] = {...sections[s],  "updates":sections[s]["updates"].filter(u=>u.id!=updateData.id)}
//         const newData = {...projectData, "sections":sections};
//         updateProject(newData.id, newData);
//         setProjectData(newData);
//     }
// },

// const MethodsExample = () => {
//     const slideRef = useRef();

//     const style = {
//       textAlign: "center",
//       background: "teal",
//       padding: "200px 0",
//       fontSize: "30px"
//     };

//     const properties = {
//       autoplay: false,
//       arrows: false
//     };

//     const back = () => {
//       slideRef.current.goBack();
//     }

//     const next = () => {
//       slideRef.current.goNext();
//     }

//     const goto = ({ target }) => {
//       slideRef.current.goTo(parseInt(target.value, 10));
//     }

//     return (
//       <div>
//         <div>
//           <Slide ref={slideRef} {...properties} style={{'width':"300px"}}>
//             <div style={style}>
//               First Slide
//             </div>
//             <div style={style}>
//               Second Slide
//             </div>
//             <div style={style}>
//               Third Slide
//             </div>
//           </Slide>
//         </div>

//         <div className="autoplay-buttons">
//           <button type="button" onClick={back}>Back</button>
//           <button type="button" onClick={next}>Next</button>
//           <select onChange={goto}>
//             <option>--Select--</option>
//             <option value="0">First</option>
//             <option value="1">Second</option>
//             <option value="2">Third</option>
//           </select>
//         </div>
//       </div>
//     );
//   };
