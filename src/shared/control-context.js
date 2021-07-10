
import { createContext } from "react";

// create a context with default values
const ControlContext = createContext({
  projectId:null,
  committeeId:null,
  sectionId:null,

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
  getCommitteesData:()=>{},


  membersData:null,
  getMemberData: (email)=>{},
 


});
  
export default ControlContext;
  


