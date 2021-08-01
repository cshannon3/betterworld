// import React, { useContext, useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import LeftPanel from "components/Panels/LeftPanel";
// import { Slide } from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";
// import { useMediaQuery } from "react-responsive";
// import { Link, NavLink , useParams} from "react-router-dom";
// import {
//   LadderModule,
//   ProjectInfoModule,
//   AtAGlanceModule,
// } from "./Modules/modules";
// import {
//   HelpRequestsModal,
//   LadderModal,
//   EditProjectInfoModal,
// } from "./Modals/index";

// import ProjectContext from "./ProjectContext";
// import ControlContext from "shared/control-context";
// import { updateProject } from "shared/firebase";
// import {
//   PageTitleText,
//   PageSubtitleText,
//   RegularBodyText,
//   EmphasizedSmallBodyText,
//   Breadcrumbs,
//   BreadcrumbText,
//   Arrow
// } from "styles/sharedStyles";

// export default function ProjectPage() {
 
//   const  { projectId } = useParams();

//   const appCtx = useContext(ControlContext);
//   const urlParts = window.location.href.split("/");


//   console.log(urlParts);
//   const [projectData, setProjectData] = useState(
//     appCtx.getProjectData(projectId)
//   );
//   return (
//     <ProjectContext.Provider
//       value={{
//         projectId: projectId,
//         data: projectData,
//         updateSection: (sectionData) => {
//           let sections = [...projectData["sections"]];
//           let s = sections.findIndex((sec) => sec.id == sectionData.id);
//           sections[s] = sectionData;
//           const newData = { ...projectData, sections: sections };
//           updateProject(newData.id, newData);
//           setProjectData(newData);
//         },
//       }}
//     >
//       <Row>
//         <LeftPanel />
//         {projectData["isArchived"] ? (
//           <ArchivedProjectPage projectData={projectData} user={appCtx.user} />
//         ) : (
//           <ActiveProjectPage projectData={projectData} user={appCtx.user} />
//         )}
//       </Row>
//     </ProjectContext.Provider>
//   );
// }              


// const ActiveProjectPage = ({ projectData, user }) => {
//   // const [isLadderModalOpen, setIsLadderModalOpen] = useState(false);
//   // const [isUpdatesModalOpen, setIsUpdatesModalOpen] = useState(false);
//   // const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
//   // const [ladderModalData, setLadderModalData] = useState(null);
//   // const [isOnlyHelpUpdates, setIsOnlyHelpUpdates] = useState(false);

//   let helpRequests = [];
//   let totalUpdates = [];

//   projectData["sections"]?.forEach((section) => {
//     if (section["updates"])
//       section["updates"].forEach((update) => {
//         totalUpdates.push({ ...update, section_name: section.name });
//         if (update && update["type"] == "request help") {
//           helpRequests.push({ ...update, section_name: section.name });
//         }
//       });
//   });
//   let contributorsSections = {};

//   projectData["sections"]?.forEach((section) => {
//     let names = [];
//     projectData["contributors"]?.forEach((contr) => {
//       if (
//         contr.projects[projectData.id].roles.filter(
//           (role) => role.sectionId == section.id
//         ).length
//       ) {
//         names.push(contr);
//       }
//     });
//     contributorsSections[section["id"]] = [...names];
//   });

 
//   return (
//     <ContentContainer>
//       <Breadcrumbs>
//           <NavLink to='/'><BreadcrumbText>CMU AGAINST ICE</BreadcrumbText></NavLink>
//           <Arrow> &gt; </Arrow>
//           <NavLink to='/projects'><BreadcrumbText>Projects</BreadcrumbText></NavLink>
//           <Arrow> &gt; </Arrow>
//           <NavLink to={`/projects/${projectData.name}`}><BreadcrumbText>{projectData.name}</BreadcrumbText></NavLink>
//       </Breadcrumbs>
//       <Flex>
//         <ProjectInfoModule
//           projectData={projectData}
//           // setIsUpdatesModalOpen={openUpdatesModal}
//           // setIsEditProjectModalOpen={() => setIsEditProjectModalOpen(true)}
//           totalUpdates={totalUpdates}
//           helpRequests={helpRequests}
//           isUserAdmin={user && user.isAdmin}
//         />
//         <AtAGlanceModule projectData={projectData} />
//       </Flex>
//       <LadderModule
//         projectData={projectData}
//         openLadderModal={openLadderModal}
//         contributors={contributorsSections}
//       />
//     </ContentContainer>
//   );
// };

// const ArchivedProjectPage = ({ projectData, user }) => {
//   const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

//   let contributorsText = projectData["contributors"] && projectData["contributors"]
//     .map((data) => data.name)
//     .join(", ");

//   return (
//     <Con>
//       <div>
//       <Breadcrumbs>
//           <NavLink to='/'><BreadcrumbText>CMU AGAINST ICE</BreadcrumbText></NavLink>
//           <Arrow> &gt; </Arrow>
//           <NavLink to='/projects'><BreadcrumbText>Projects</BreadcrumbText></NavLink>
//           <Arrow> &gt; </Arrow>
//           <NavLink to={`/projects/${projectData.name}`}><BreadcrumbText>{projectData.name}</BreadcrumbText></NavLink>
//       </Breadcrumbs>
//         <PageTitleText>{projectData.name} (Archived)</PageTitleText>
//       </div>
//       <Flex isMobile={isMobile}>
//         <div className={"GalleryStyle"}>
//           <Slideshow
//             images={
//               projectData["display_images"] ??
//               projectData["artifact_images"] ??
//               []
//             }
//           />
//         </div>
//         <AtAG>
//           <PageSubtitleText>Timespan</PageSubtitleText>
//           <EmphasizedSmallBodyText>March 2020</EmphasizedSmallBodyText>
//           <PageSubtitleText>Contributors</PageSubtitleText>

//           {projectData["contributors"] && (
//             <UserText>{contributorsText}</UserText>
//           )}

//           <PageSubtitleText>Artifacts</PageSubtitleText>
//           <ResourceBox>
//             {projectData["resources"] &&
//               projectData["resources"].map((data) => (
//                 <ArtifactLink>
//                   <a href={data.url} target="_blank">
//                     {data.name}
//                   </a>
//                 </ArtifactLink>
//               ))}
//           </ResourceBox>
//         </AtAG>
//       </Flex>
//       <div>
//         <Flex isMobile={isMobile}>
//           <OverviewTextStyle>
//             <PageSubtitleText>Description</PageSubtitleText>
//             <RegularBodyText>
//               {projectData["description"] ?? "No description"}
//             </RegularBodyText>
//           </OverviewTextStyle>
//           <OverviewTextStyle>
//             <PageSubtitleText>Outcome</PageSubtitleText>
//             <RegularBodyText>
//               {projectData["outcome"] ?? "No Outcome"}
//             </RegularBodyText>
//           </OverviewTextStyle>
//         </Flex>
//       </div>
//     </Con>
//   );
// };

// const Slideshow = ({ images }) => {
//   const slideRef = useRef();
//   return (
//     <Slide
//       ref={slideRef}
//       easing="ease"
//       style={{ width: "100%", paddingTop: "50px" }}
//     >
//       {/* <SlideImg src={"https://images.unsplash.com/photo-1623141629222-287c9e385a40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"}/> */}
//       {images.map((i) => {
//         return (
//           <EachSlide
//             style={{
//               backgroundImage: `url(${i.url})`,
//               width: "400px",
//               height: "300px",
//               margin: "auto",
//             }}
//           ></EachSlide>
//         );
//       })}
//     </Slide>
//   );
// };


  
// const UserText = styled.div`
//   padding-bottom: 20px;
//   font-size: 16px;
// `;
// const Flex = styled.div`
//   display: flex;
//   width: 100%;

//   ${({ isMobile }) =>
//     isMobile
//       ? `
//   flex-direction: column;

// `
//       : `height:47%;
//       .GalleryStyle{
//         width: 50%;
//         height: 50vh;
//       }
//       `}
// `;

// const AtAG = styled.div`
//   padding-left: 10px;
//   padding-top: 40px;
//   width: 100%;
// `;

// const ResourceBox = styled.div`
//   padding-left: 20px;
// `;
// const GalleryStyle = styled.div`
//   width: 50%;
//   height: 50vh;
// `;

// const ArtifactLink = styled(RegularBodyText)`
//   align-items: center;
// `;

// const Contibutors = styled.p`
//   font-family: "Helvetica";
//   font-style: normal;
//   font-weight: bold;
//   font-size: 11.3495px;
//   line-height: 15px;
// `;

// const ContributorBox = styled.div`
//   height: 60px;
//   background: grey;
//   margin-bottom: 20px;
// `;

// const OverviewTextStyle = styled.div`
//   width: 100%;
//   padding: 20px;
// `;

// const Con = styled.div`
//   width: 90%;
//   padding: 5vh 50px 3vh 40px;
//   display: flex;
//   flex-direction: column;
// `;
// const EachSlide = styled.div`
//   height: 250px;
//   width: 200px;
//   background-size: cover;
//   div {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-size: cover;
//     height: 150px;
//   }

//   span {
//     padding: 20px;
//     font-size: 20px;
//     background: #efefef;
//     text-align: center;
//   }
// `;


// const Row = styled.div`
//   display: flex;
//   width: 100%;
// `;
// const ContentContainer = styled.div`
//   width: 100%;
//   height: 100vh;
//   padding: 5vh 50px 3vh 40px;
// `;


//  // function openLadderModal(row) {
//   //   setIsUpdatesModalOpen(false);
//   //   setIsLadderModalOpen(true);
//   //   setLadderModalData({ ...row, contributors: contributorsSections[row.id] });
//   // }

//   // function closeLadderModal() {
//   //   //window.location = window.location.toString().split("#")[0]; // add it as a hash to the URL.
//   //   var uri = window.location.toString();
//   //   if (uri.indexOf("#") > 0) {
//   //     var clean_uri = uri.substring(0, uri.indexOf("#"));
//   //     window.history.replaceState({}, document.title, clean_uri); // This might be a problem
//   //   }
//   //   setLadderModalData(null);
//   //   setIsLadderModalOpen(false);
//   // }

//   // function openUpdatesModal() {
//   //   setIsLadderModalOpen(false);
//   //   setIsUpdatesModalOpen(true);
//   // }
//   // function closeUpdatesModal() {
//   //   setIsUpdatesModalOpen(false);
//   // }
//   // function closeEditProjectModal() {
//   //   setIsEditProjectModalOpen(false);
//   // }

// /* <LadderModal
//         data={ladderModalData}
//         isOpen={isLadderModalOpen}
//         setLadderData={(newData) => {
//           setLadderModalData(newData);
//         }}
//         onRequestClose={closeLadderModal}
//       ></LadderModal>
//       <HelpRequestsModal
//         data={projectData}
//         isOpen={isUpdatesModalOpen}
//         onRequestClose={closeUpdatesModal}
//         helpRequests={helpRequests}
//         isOnlyHelpUpdates={isOnlyHelpUpdates}
//       ></HelpRequestsModal>
//       <EditProjectInfoModal
//         projectData={projectData}
//         isOpen={isEditProjectModalOpen}
//         onRequestClose={closeEditProjectModal}
//       ></EditProjectInfoModal>
//  */