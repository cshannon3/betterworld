//https://stackoverflow.com/questions/43768019/react-js-firebase-and-firepad-component
//https://github.com/FirebaseExtended/firepad


import React, { useContext,useState, useEffect, useRef } from "react"
import styled from "styled-components"
//import ControlContext from "shared/control-context";

import firebase from "firebase/app";
import "firebase/database";
import 'firebase/storage';
//import AceEditor from "react-ace";
//import * as ace from 'brace';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import './firepad-userlist.css';
import Firepad from 'firepad';

//global.ace = ace;
var CodeMirror = global.CodeMirror;
var ace = global.ace;


export default function TeamNotesWidget({isOpen, id}) {
    // const context = useContext(ControlContext);
    // const {
    //     user,
    //     teamsData,
    //     currentTeamId,
    //     updateTeam
    // } = context;
    const [databaseId, setDatabaseId] = useState(null);
    let  codeMirror, firepad, firepadRef;

   // if (teamsData && currentTeamId) { teamData = teamsData[currentTeamId]; }

    // useEffect(() => {
    //     if (teamsData && currentTeamId) { teamData = teamsData[currentTeamId];  }
    // }, [teamsData, currentTeamId, ]);

    useEffect(() => {
        if (!codeMirror && !firepad) {
            // firepadRef = getExampleRef();
           // if (teamData) {
                if(!databaseId){
                    firepadRef = firebase.database().ref(id);
                    
                    setDatabaseId(firepadRef.key);
                    //updateTeam(currentTeamId,{databaseId:firepadRef.key});
                }else{
                    console.log(databaseId );
                    firepadRef = firebase.database().ref(databaseId);
                }
           // }
            if (firepadRef!==undefined  && firepadRef && firepadRef.key!=null) {
                window.location = window.location.toString().split("#")[0] + '#' + firepadRef.key; // add it as a hash to the URL.
                console.log('Firebase data: ', firepadRef.toString());

                codeMirror = CodeMirror(document.getElementById('firepad-container'), { lineWrapping: true });

                try {
                    firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
                        { richTextShortcuts: true, richTextToolbar: false, userId:"001"});

                } catch (error) {
                    console.log(error);
                }
            }
        }
    }, []);

    return (
          isOpen ? 
        <div></div> :
        <div>
            <FirePadBox id="firepad-container" ></FirePadBox>
        </div> 
    )
}
const FirePadBox = styled.div`
  width: 100%;
  height: 50vh;
  display:flex;
`

