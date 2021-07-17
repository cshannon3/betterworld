
import { createContext } from "react";

// create a context with default values
const ControlContext = createContext({
  editMode:false,
  groupName:null,
  projectId:null,
  committeeId:null,
  sectionId:null,
  //getGroupData: ()=>{},
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
  getProjectName: (projectId, sectionId)=>{},
  getProjectsData:()=>{},



  committeesData:null,
  getCommitteeData: ()=>{},
  getCommitteesData:()=>{},
  getCommitteeName:()=>{},



  membersData:null,
  getMemberData: (email)=>{},
 


});
  
export default ControlContext;
  


