
import chatIcon from "assets/Landing/Committees/chat 1.png"
import moneyIcon from "assets/Landing/Committees/money-bag 1.png"
import bookIcon from "assets/Landing/Committees/open-book 1.png"
import actionIcon from "assets/Landing/Committees/runner 1.png"

import JitsiIcon from "assets/Landing/jitsi.png";
import DriveIcon from "assets/Landing/google-drive.png";
import DocIcon from "assets/Landing/google-docs.png";
import InstaIcon from "assets/Landing/insta.png";
import FBIcon from "assets/Landing/fb.png";
import TwitterIcon from "./assets/Landing/twitter.png";

const users = {
    "darya":{
        "name":"darya",
        "id":"darya",
        "image_url":"https://ca.slack-edge.com/T017C8TU9S8-U01763PF0KU-f0948675b623-512"
    },
    "bonnie":{
        "name":"bonnie",
        "id":"bonnie"
    },
    "juju":{
        "name":"juju",
        "id":"juju"
    },
    "renee":{
        "name":"renee",
        "id":"renee"
    },
    "kevin":{
        "name":"kevin",
        "id":"kevin",
        "image_url":"https://ca.slack-edge.com/T017C8TU9S8-U016RAYFM9D-8bca120afe38-512"
    },
    "cat":{
        "name":"cat",
        "id":"cat"
    },
    "connor":{
        "name":"connor",
        "id":"connor"
    },
    "sarah":{
        "name":"sarah",
        "id":"sarah"
    },
    "kai":{
        "name":"kai",
        "id":"kai"
    },
}




const projects = {
    "immigrationjustice":{
        "id":"immigrationjustice",
        "name": "Immigration Justice Zine",
        "start_date":"3/7/2021",
        "expected_end_date":"6/15/2021",
        "description": "Student guide serving as an \"alternative\" orientation to CMU; nudge towards holding CMU accountable and working toward real change. We believe that creating this will valuable since it will connect us more to the CMU community and spread the word.",
        "target date": "June 15th",
        "sections":[
            {
                "id":"immigration-history",
                "name":"Immigration history and connection to xenophobia",
                "contributors":["bonnie","cat"],
                "status":"Research",
                "resources":[
                    {
                        "name": "Predict and Surveil",
                        "type": "pdf",
                        "pinned":false,
                        "createdDate": "2/2/2",
                        "description": "Book that’s a deep dive into how LAPD uses palantir and other surveillance tech"
                    },
                    
                ],
                "help_requests":[
                    {
                        "content": "Feedback on page 10 graphic"
                    },
                    {
                        "content": "Research into CMU Policing History"
                    },
            
                ],
                "stages":[
                    {
                        "id":"immigrationhistoryresearch",
                        "sectionId":"immigration-history",
                        "name": "Research",
                        "type":"Research",
                        "status":"in progress",
                        "contributors":["bonnie", "cat"],
                        "active_doc":{
                            "name": "Background Research",
                                "type": "googleDoc",
                                "createdDate": "2/2/2",
                                "description": "Document for our research"
                        },
                        "resources":[
                            {
                                "name": "Immigration Dis O 2021",
                                "type": "googleDoc",
                                "createdDate": "2/2/2",
                                "description": "Notes from Dis O immigration Section"
                            },
                        ],
                    },
                    {
                        "id":"immigrationhistorywriting",
                        "sectionId":"immigration-history",
                        "name": "Writing",
                        "type":"Writing",
                        "status":"not started",
                        "contributors":["bonnie", "cat"],
                        "active_doc":{
                            "name": "Immigration History Section",
                                "type": "googleDoc",
                                "createdDate": "2/2/2",
                                "description": "Document for our research"
                        },
                        "resources":[
                        ],
                    },
                    {
                        "id":"immigrationhistorydesign",
                        "sectionId":"immigration-history",
                        "name": "Design",
                        "type":"Design",
                        "status":"not started",
                        "contributors":["cat"],
                        "active_doc":{
                            "name": "Canva",
                                "type": "canva",
                                "createdDate": "2/2/2",
                                "description": "Immigration History Zine"
                        },
                        "resources":[
                        ],
                    },
                    {
                        "id":"immigrationhistoryediting",
                        "sectionId":"immigration-history",
                        "name": "Design",
                        "type":"Design",
                        "status":"not started",
                        "contributors":["cat"],
                        "active_doc":{
                                "name": "Immigration History Section",
                                "type": "googleDoc",
                                "createdDate": "2/2/2",
                                "description": "Document for our research"
                        },
                        "resources":[
                        ],
                       
                    },
                ]
            },
        ],
        "tasks":[
            
        ],
        "updates": [
            {
                "id":"u1",
                "taskid":"immigrationhistoryediting",
                "sectionId":"immigration-history",
                "author":"bonnie",
                "date":"3/27/21",
                "documentID":"path to document",
           
            }
        ],

    },
    // "disO-2020":{},
    // "disO-2021":{},
    // "drivingPAForward":{},
}






const data = {
    "projects":projects,
    "committees":[
    {
        "name": "Money",
        "order":1,
        "icon":moneyIcon
    },
    {
        "name": "Recruiting",
        "order":1,
        "icon":chatIcon
    },
    {
        "name": "Art/Education",
        "order":1,
        "icon":bookIcon
    },
    {
        "name": "Actions",
        "order":1,
        "icon":actionIcon
    },
],
"quick_links":[
    {
        "tip":"Meeting Link",
        "url":"https://meet.jit.si/CMU_Against_ICE_Meetings",
        "icon":JitsiIcon,
        "title":"Jitsi"
    },
    {
        "tip":"Group Drive",
        "url":"https://drive.google.com/drive/folders/10lF9_JXDtbrik86Jx03NFv0610ybc_Bh?usp=sharing",
        "icon":DriveIcon,
        "title":"drive"
    },
    {
        "tip":"All Notes",
        "url":"https://docs.google.com/document/d/1WYUrZpa72Xm0Hst9uSq1jqlMnVdCZ5ALn9tHW2-sOo0/edit?usp=sharing",
        "icon":DocIcon,
        "title":"All Notes"
    },
    {
        "tip":"IG Page",
        "url":"https://www.instagram.com/cmuwontbuildit/",
        "icon":InstaIcon,
        "title":"Insta"
    },
    {
        "tip":"FB Page",
        "url":"https://www.instagram.com/cmuwontbuildit/",
        "icon":FBIcon,
        "title":"FB Page"
    },
    {
        "tip":"Twitter Page",
        "url":"https://www.instagram.com/cmuwontbuildit/",
        "icon":TwitterIcon,
        "title":"Twitter Page"
    },

]

}
export default data;


/*
[
    {
        "name": "Immigration Justice Zine",
        "startDate": "1/2/21",
        "estCompletion":"12/2/21",
        "target date": "June 15th",
        "description": "Student guide serving as an \"alternative\" orientation to CMU; nudge towards holding CMU accountable and working toward real change. We believe that creating this will valuable since it will connect us more to the CMU community and spread the word.",
        "members": [

        ],
        "requests": [
            {
                "content": "Feedback on page 10 graphic"
            },
            {
                "content": "Research into CMU Policing History"
            },
        ],
        "events": [
            {
                "name": "First Meeting",
                "date": "03/26",
            },
            {
                "name": "First Meeting",
                "date": "03/26",
            },
            {
                "name": "First Meeting",
                "date": "03/26",
            },
            {
                "name": "Dis-Orientation Guide Add to Archives ",
                "date": "03/26",
            },
        ],
        "sections": [
            {
                "order": 1,
                "section": "Immigration history and connection to xenophobia",
                "researcher": "Connor",
                "author": "Darya",
                "artist": "Darya",
                "editor": "Bonnie",
                "resources": [
                ],
            },
            {
                "order": 2,
                "section": "ICE and tech",
                "researcher": "Connor",
                "author": "Darya",
                "artist": "Darya",
                "editor": "Bonnie",
                "resources": [
                    {
                        "name": "Predict and Surveil",
                        "type": "pdf",
                        "createdDate": "2/2/2",
                        "description": "Book that’s a deep dive into how LAPD uses palantir and other surveillance tech"
                    }
                ]
            },
            {
                "order": 3,
                "section": "ICE and campuses + int’l student experience",
                "researcher": "Connor",
                "author": "Darya",
                "artist": "Darya",
                "editor": "Bonnie"

            },
            {
                "order": 4,
                "section": "Personal stories / testimonies",
                "researcher": "Connor",
                "author": "Darya",
                "artist": "Darya",
                "editor": "Bonnie"
            },
        ]
    },
    {
        "name": "Driving PA Forward",
        "startDate": "1/2/21",
        "estCompletion":"12/2/21",
        "target date": "June 15th",
        "status":"active",
        "description": "Student guide serving as an \"alternative\" orientation to CMU; nudge towards holding CMU accountable and working toward real change. We believe that creating this will valuable since it will connect us more to the CMU community and spread the word.",
        "members": [

        ],
        "requests": [
            {
                "content": "Feedback on page 10 graphic"
            },
            {
                "content": "Research into CMU Policing History"
            },
        ],
        "events": [
            {
                "name": "First Meeting",
                "date": "03/26",
            },
            {
                "name": "First Meeting",
                "date": "03/26",
            },
        ],
        "sections": [
        ]
    },
    {
        "name": "DisO 2021",
        "startDate": "1/2/21",
        "estCompletion":"12/2/21",
        "target date": "June 15th",
        "status":"active",
        "description": "Student guide serving as an \"alternative\" orientation to CMU; nudge towards holding CMU accountable and working toward real change. We believe that creating this will valuable since it will connect us more to the CMU community and spread the word.",
        "members": [
        ],
        "requests": [
            {
                "content": "Feedback on page 10 graphic"
            },
            {
                "content": "Research into CMU Policing History"
            },
        ],
        "events": [
            {
                "name": "First Meeting",
                "date": "03/26",
            },
            {
                "name": "First Meeting",
                "date": "03/26",
            },
        ],
        "sections": [
        ]
    },
    {
        "name": "Teach Ins",
        "startDate": "1/2/21",
        "estCompletion":"12/2/21",
        "target date": "June 15th",
        "status":"active",
        "description": "Student guide serving as an \"alternative\" orientation to CMU; nudge towards holding CMU accountable and working toward real change. We believe that creating this will valuable since it will connect us more to the CMU community and spread the word.",
        "members": [
        ],
        "requests": [
            {
                "content": "Feedback on page 10 graphic"
            },
            {
                "content": "Research into CMU Policing History"
            },
        ],
        "events": [
            {
                "name": "First Meeting",
                "date": "03/26",
            },
            {
                "name": "First Meeting",
                "date": "03/26",
            },
        ],
        "sections": [
        ]
    },
    {
        "name": "DisO 2020",
        "startDate": "1/2/21",
        "estCompletion":"12/2/21",
        "target date": "June 15th",
        "status":"active",
        "description": "Student guide serving as an \"alternative\" orientation to CMU; nudge towards holding CMU accountable and working toward real change. We believe that creating this will valuable since it will connect us more to the CMU community and spread the word.",
        "members": [
        ],
        "requests": [
            {
                "content": "Feedback on page 10 graphic"
            },
            {
                "content": "Research into CMU Policing History"
            },
        ],
        "events": [
            {
                "name": "First Meeting",
                "date": "03/26",
            },
            {
                "name": "First Meeting",
                "date": "03/26",
            },
        ],
        "sections": [
        ]
    },
],
*/