

import { createContext } from "react";

// create a context with default values
const CommitteeContext = createContext({
    data: null,

    getSectionData: ()=>{},

    addUpdate: ()=>{},
    updateUpdates: ()=>{},

});

export default CommitteeContext;
