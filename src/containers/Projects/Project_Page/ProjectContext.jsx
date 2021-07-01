

import { createContext } from "react";

// create a context with default values
const ProjectContext = createContext({
    data: null,

    updateSection: ()=>{},
    updateStageStatus: () =>{},
    
    addUpdate: ()=>{},
    updateUpdate: ()=>{},

});

export default ProjectContext;

   