import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"

import ReactModal from 'react-modal'

import LeftPanel from "containers/Panels/LeftPanel"
import LadderComponent from './LadderComponent'

const ladderData = {
    "Immigration Justice Zine": {
        "sections": [
            {
                "order": 1,
                "section": "Immigration history and connection to xenophobia",
                "researcher": "Connor",
                "author": "Darya",
                "artist": "Darya",
                "editor": "Bonnie",
                "resources": [
                ]
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
            {
                "order": 5,
                "section": "The future of ICE and Oppressive Tech",
                "researcher": "Connor",
                "author": "Darya",
                "artist": "Darya",
                "editor": "Bonnie"
            },
        ]
    }
}




export default function ProjectPage() {
    return (
        <Row>
            <LeftPanel />
            <ContentContainer>
                <ProjectTitleBox><h2>Project Title Box</h2></ProjectTitleBox>
                <AtAGlanceBox>
                    <GreenTitleBar>At A Glance Box</GreenTitleBar>
                    <div></div>
                </AtAGlanceBox>
                <LadderComponent data={ladderData["Immigration Justice Zine"]["sections"]} />
                <UpcomingEventsBox>
                    <GreyTitleBar> Upcoming Events</GreyTitleBar>
                    <div></div>
                </UpcomingEventsBox>
                <HelpWantedBox>
                    <GreenTitleBar> Help Wanted</GreenTitleBar>
                    <div></div>
                </HelpWantedBox>
            </ContentContainer>
        </Row>
    )
}



// const LadderComponent = ({})=>{

//     return (
//         <TaskOverviewBox>
//           <GreyTitleBar> Task Overview</GreyTitleBar>
//           <div></div>
//         </TaskOverviewBox>
//     );
// }


// const LadderRow = ()=>{

//     return (
//         <TaskOverviewBox>
//           <GreyTitleBar> Task Overview</GreyTitleBar>
//           <div></div>
//         </TaskOverviewBox>
//     );
// }


const Row = styled.div`
  display: flex;
  width: 100%;
`

const ContentContainer = styled.div`
  display: grid;
  width: 100%;
  padding: 3vh 40px 3vh 40px ;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 20px 10px;
  
`
const ProjectTitleBox = styled.div`
  display: grid;
  grid-area: 1 / 1 / span 2 / span 2;
`
const AtAGlanceBox = styled.div`
  display: grid;
  grid-area: 1 / 3 / span 1 / span 2;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`

const UpcomingEventsBox = styled.div`
  display: grid;
  grid-area: 3 / 1 / span 1 / span 1;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`

const HelpWantedBox = styled.div`
  display: grid;
  grid-area: 3 / 2 / span 1 / span 1;
  background: #E6FAF5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`
const GreyTitleBar = styled.div`
  height:38px;
  background: #E3E7EA;
  border-radius: 3px 3px 0px 0px;
  display: flex;
  align-items: center;
  font-family: Baloo 2;
  font-style: normal;
  font-weight: 800;
  font-size: 21px;
  line-height: 33px;
  letter-spacing: -0.02em;
  padding-left:5px;
  color: #757575;
`
const GreenTitleBar = styled.div`
  height:38px;
  background: #0CC998;
  border-radius: 3px 3px 0px 0px;
  display: flex;
  align-items: center;
  font-family: Baloo 2;
  font-style: normal;
  font-weight: 800;
  font-size: 21px;
  line-height: 33px;
  letter-spacing: -0.02em;
  padding-left:5px;
  color: #FFFFFF;
`

