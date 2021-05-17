
import { createContext } from "react";

// create a context with default values
const ControlContext = createContext({
  
  loginUser:   () => {},
  logoutUser:  () => {},
  user:        null,
  setUser:     ()=>{},
  data:        null,
  projectsData: null,
  committeesData:null,
  currentProjectID: null,
  setCurrentProjectID: ()=>{},
  getProjectData: ()=>{},
  getProjectsData:()=>{}
});
  
export default ControlContext;
  


