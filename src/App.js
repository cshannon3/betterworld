

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useHistory } from "react-router-dom"
import {
  provider,
  getUserData,
  createNewUser,
  getProjects,
  getCommittees
} from 'shared/firebase';
//import dummydata from 'shared/dummydata';
import firebase from "firebase/app";
import ControlContext from "shared/control-context";

//Screens
import Splash from 'containers/1_Splash/Splash'
import Landing from 'containers/2_Landing/Landing'
import ProjectPage from 'containers/3_Project_Page/ProjectPage'
import CommitteePage from 'containers/CommitteePage/CommitteePage'
import AddItemPage from 'containers/Add_Item_Page/AddItemPage'
import { ModalProvider } from 'styled-react-modal';
import data from "dummydata";
import { useMediaQuery } from 'react-responsive';
 

let userListener, projectsListener, committeesListener;

const App = () => {
  const [user, setUser] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [committeesData, setCommitteesData] = useState(null)

  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
  //const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

  function setupProjectListener(){
    projectsListener = getProjects({groupID:"cmu-against-ice"}).onSnapshot(function (querySnapshot) {
    let  _projectsData = {};
      querySnapshot.forEach(function (doc) {
        _projectsData[doc.id] = { ...doc.data(), "id": doc.id };
      });
      //console.log(_projectsData);
      setProjectsData(_projectsData);
      window.localStorage.setItem("projects", JSON.stringify(_projectsData));
    });
  }
function setupCommitteeListener(){
  committeesListener = getCommittees({groupID:"cmu-against-ice"}).onSnapshot(function (querySnapshot) {
   let  _committeesData = {};
    querySnapshot.forEach(function (doc) {
      _committeesData[doc.id] = { ...doc.data(), "id": doc.id };
    });
    console.log( _committeesData);
    setCommitteesData(_committeesData);
    window.localStorage.setItem("committees", JSON.stringify(_committeesData));
  });
}

  window.onload = function () {
    console.log("ON LOAD");
    let _user = JSON.parse(window.localStorage.getItem("user"));
    let _projectsData = JSON.parse(window.localStorage.getItem("projects"));
    let _committeesData = JSON.parse(window.localStorage.getItem("committees"));
    if (_user) {
      setUser(_user);
      if(!projectsListener) setupProjectListener();
      else if (_projectsData)  setProjectsData(_projectsData);
      if(!committeesListener) setupCommitteeListener();
      else if (_committeesData)  setCommitteesData(_committeesData);
    }
  }

  useEffect(()=>{
    if(!user){
      let _user = JSON.parse(window.localStorage.getItem("user"));
      if(_user)setUser(_user);
    }
    if(!projectsListener) setupProjectListener();
    if(!committeesListener) setupCommitteeListener();
    
   });

  return (
    <Router >
      <React.Fragment>
        <ControlContext.Provider
          value={{
            //isMobile:()=>{return useMediaQuery({ query: '(max-width: 1224px)' })},
            data: data,
            user, // ID of current user
            projectsData:projectsData,
            committeesData:committeesData,
            loginUser: async () => {
              // Authenticate and get User Info
              let result = await firebase.auth().signInWithPopup(provider);
              console.log(result);
              let userId = result.user.uid;
              let userData = await getUserData(userId);
              //let data;
              if (!userData) userData = await createNewUser(result);
              else userData = { id: userId, ...userData, }
              setupProjectListener();
              setUser(userData); window.localStorage.setItem("user", JSON.stringify(userData));
              
            },
            logoutUser: () => {
              firebase.auth().signOut().then(function () {
                if (userListener) userListener();
                window.localStorage.setItem("user", null);

                window.location.replace("/");
              }).catch(function (error) { console.log(error) });
            },

            // getProjectData: (currentID)=>{if(currentID!==null&& data!=null) return data["projects"][currentID] }
            getProjectData: (currentID) => {
              if (projectsData && currentID !== null && currentID in projectsData) {
                return projectsData[currentID];
              }
              else {
                let _user = JSON.parse(window.localStorage.getItem("user"));
                let _projectsData = JSON.parse(window.localStorage.getItem("projects"));
                console.log(_projectsData);
                setUser(_user);
                setProjectsData(_projectsData);
                return _projectsData[currentID];
              }
            },
            getProjectsData: ()=>{
              if(projectsData) return projectsData;
              let _projectsData = JSON.parse(window.localStorage.getItem("projects"));
               if(_projectsData){
                 setProjectsData(_projectsData);
                 return _projectsData;
               } 
               return false;
            },
            getCommitteeData: (currentID) => {
              if (committeesData && currentID !== null && currentID in committeesData) {
                return committeesData[currentID];
              }
              else {
                let _user = JSON.parse(window.localStorage.getItem("user"));
                let _committeesData = JSON.parse(window.localStorage.getItem("committees"));
                console.log(_committeesData);
                setUser(_user);
                setCommitteesData(_committeesData);
                return _committeesData[currentID];
              }
              return false;
            },
            getCommitteesData: ()=>{
              if(committeesData) return committeesData;
              let _committeesData = JSON.parse(window.localStorage.getItem("committees"));
               if(_committeesData){
                 setCommitteesData(_committeesData);
                 return _committeesData;
               } 
               return false;
            }
          }}>
          <ModalProvider>
            <div className="App__container">
              <Switch>
              <Route path="/addItem" component={AddItemPage} />
                <Route path="/project/:projectId" component={ProjectPage} />
                <Route path="/committee/:committeeId" component={CommitteePage} />
                <Route path="/:groupId" component={Landing}/>
                
                <Route exact path="/">
                  {/*Conditional rendering based on whether user logged in*/}
                  {user ? <Landing /> : <Splash />}
                </Route>
                

              </Switch>
            </div>
          </ModalProvider>
        </ControlContext.Provider>
      </React.Fragment>
    </Router>
  );
}
export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;







