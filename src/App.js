

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom"
import {
  provider,
  getUserData,
  createNewUser,
  updateUserData,
  getProjects
} from 'shared/firebase';
//import dummydata from 'shared/dummydata';
import firebase from "firebase/app";
import ControlContext from "shared/control-context";

//Screens
import Splash from 'containers/1_Splash/Splash'
import Landing from 'containers/2_Landing/Landing'
import ProjectPage from 'containers/3_Project_Page/ProjectPage'
import CommitteePage from 'containers/CommitteePage/CommitteePage'
import { ModalProvider } from 'styled-react-modal'
import data from "dummydata";



let userListener, projectsListener;

const App = () => {
  const [user, setUser] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  //const [currentProjectID, setCurrentProjectID] = useState(null);

  window.onload = function () {
    console.log("ON LOAD");
    let _user = JSON.parse(window.localStorage.getItem("user"));
    let _projectsData = JSON.parse(window.localStorage.getItem("projects"));
    //let _project = window.localStorage.getItem("currentProjectId");
    if (_user) {
      setUser(_user);
      if (_projectsData) {
        setProjectsData(_projectsData);
      }
      else {
        projectsListener = getProjects().onSnapshot(function (querySnapshot) {

          _projectsData = {};
          querySnapshot.forEach(function (doc) {
            _projectsData[doc.id] = { ...doc.data(), "id": doc.id };
          });
          console.log(_projectsData);
         
          setProjectsData(_projectsData);
        });
      }
    }

  }

  return (
    <Router>
      <React.Fragment>
        <ControlContext.Provider
          value={{
            data: data,
            user, // ID of current user
            projectsData:projectsData,
            loginUser: async () => {
              // Authenticate and get User Info
              let result = await firebase.auth().signInWithPopup(provider);
              console.log(result);
              let userId = result.user.uid;
              let userData = await getUserData(userId);
              //let data;
              if (!userData) userData = await createNewUser(result);
              else userData = { id: userId, ...userData, }

              projectsListener = getProjects().onSnapshot(function (querySnapshot) {
                let _projectsData = {};
                querySnapshot.forEach(function (doc) {
                  _projectsData[doc.id] = { ...doc.data(), "id": doc.id };
                });
                setProjectsData(_projectsData);
                window.localStorage.setItem("projects", JSON.stringify(_projectsData));
              });
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
              
            }
          }}>
          <ModalProvider>
            <div className="App__container">
              <Switch>
                <Route path="/project/:projectId" component={ProjectPage} />
                <Route path="/committee" component={CommitteePage} />
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







