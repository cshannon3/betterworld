

import { createContext } from "react";

// create a context with default values
const ProjectContext = createContext({
    projectId:null,
    data: null,

    updateSection: ()=>{},
    updateStageStatus: () =>{},
    
    addUpdate: ()=>{},
    updateUpdate: ()=>{},

});

export default ProjectContext;

   