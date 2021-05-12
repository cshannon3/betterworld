

import { createContext } from "react";

// create a context with default values
const ProjectContext = createContext({
    data: null,
    addSectionToProject: () =>{},
    editSection:()=>{},
    removeSectionFromProject:()=>{},
    getSectionData: ()=>{},
    addMemberToSection: () =>{},
    removeMemberFromSection: () =>{},
    getStageData: ()=>{},
    
    addMemberToStage: ()=>{},
    removeMemberFromStage: ()=>{ },

    addHelpRequestToStage:()=>{},
    handleHelpRequest:()=>{},

    addResourceToStage: ()=>{},
    removeResourceFromStage: ()=>{},

    updateSection: ()=>{},
    updateStageStatus: () =>{},
    
    addUpdate: ()=>{},
    updateUpdate: ()=>{},

});

export default ProjectContext;
