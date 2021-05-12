import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"

import ReactModal from 'react-modal'

import LeftPanel from "containers/Panels/LeftPanel"
import {
    LadderModule,
    ProjectInfoModule,
    AtAGlanceModule,
    UpcomingEventsModule,
    //HelpWantedModule,

} from './Modules/modules'
import ProjectContext from "./ProjectContext";
//import dummyData from './DummyData';
import ControlContext from "../../shared/control-context";
import {updateProject} from "shared/firebase";


export default function ProjectPage() {
    const appCtx = useContext(ControlContext);
    const urlParts = window.location.href.split("/")
    const projectId = urlParts[urlParts.length-1]
    const [projectData, setProjectData] = useState(appCtx.getProjectData(projectId));
    //dummyData["Immigration Justice Zine"]
    return (
        <ProjectContext.Provider
        value={{
            data:projectData,
            addSectionToProject: () =>{},
            editSection:()=>{},
            removeSectionFromProject:()=>{},
            addMemberToSection: () =>{},
            removeMemberFromSection: () =>{},
            getStageData: ()=>{},
            
            addMemberToStage: ()=>{},
            removeMemberFromStage: ()=>{ },

            addHelpRequestToStage:()=>{},
            handleHelpRequest:()=>{},

            addResourceToStage: ()=>{},
            updateStageStatus: () =>{},
            updateSection: (sectionData) =>{
                let sections = [...projectData["sections"]];
                let s = sections.findIndex((sec)=>sec.id==sectionData.Id);
                sections[s] = sectionData;
                const newData = {...projectData, "sections":sections};
                updateProject(newData.id, newData);
                setProjectData(newData);
            },



          
        }}
        >
        <Row>
            <LeftPanel />
            <ContentContainer>
                <ProjectInfoModule/>
                <AtAGlanceModule/>
                <LadderModule/>
                {/* <UpcomingEventsModule/>
                <HelpWantedModule/> */}
            </ContentContainer>
        </Row>
        </ProjectContext.Provider> 
    )
}




const Row = styled.div`
  display: flex;
  width: 100%;
`
const ContentContainer = styled.div`
  display: grid;
  width: 100%;
  height:100vh;
  padding: 5vh 50px 3vh 40px ;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 10px;
  
`



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