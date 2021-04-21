

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom"
import {
  provider,
  getUserData,
  createNewUser,
  updateUserData
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



let userListener, teamsListener;

const App = () => {
  const [user, setUser] = useState(null);

  window.onload = function () {
    console.log("ON LOAD");
    let _user = JSON.parse(window.localStorage.getItem("user"));
    if (_user) { setUser(_user); }
  }

  return (
    <Router>
      <React.Fragment>
        <ControlContext.Provider
          value={{
            user, // ID of current user
            loginUser: async () => {
              // Authenticate and get User Info
              let result = await firebase.auth().signInWithPopup(provider);
              console.log(result);
              let userId = result.user.uid;
              let userData = await getUserData(userId);
              //let data;
              if (!userData) userData = await createNewUser(result);
              else userData = { id: userId, ...userData, }
              setUser(userData); window.localStorage.setItem("user", JSON.stringify(userData));
            },

            logoutUser: () => {
              firebase.auth().signOut().then(function () {
                if (userListener) userListener();
                window.localStorage.setItem("user", null);

                window.location.replace("/");
              }).catch(function (error) { console.log(error) });
            },
            data: data
          }}>
          <ModalProvider>
            <div className="App__container">
              <Switch>

                <Route path="/project" component={ProjectPage} />
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







