
import { createContext } from "react";

// create a context with default values
const ControlContext = createContext({
  
  loginUser:   () => {},
  logoutUser:  () => {},
  user:        null,
  setUser:     ()=>{},
  data:        null,
  projectsData: null,
  isMobile: ()=>{},
  isLandscape:false,
  currentProjectID: null,
  setCurrentProjectID: ()=>{},
  getProjectData: ()=>{},
  getProjectsData:()=>{},

  committeesData:null,
  getCommitteeData: ()=>{},
  getCommitteesData:()=>{}



});
  
export default ControlContext;
  


