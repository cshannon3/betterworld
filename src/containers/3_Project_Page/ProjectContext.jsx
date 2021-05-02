

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
    
    getTaskData: ()=>{},
    
    addMemberToTask: ()=>{},
    removeMemberFromTask: ()=>{ },

    addHelpRequestToTask:()=>{},
    handleHelpRequest:()=>{},

    addResourceToTask: ()=>{},
    removeResourceFromTask: ()=>{},

    updateTaskStatus: () =>{},

    addUpdateToTask: ()=>{},

    
});

export default ProjectContext;
