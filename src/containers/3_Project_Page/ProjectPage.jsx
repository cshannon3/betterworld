import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"

import ReactModal from 'react-modal'

import LeftPanel from "containers/Panels/LeftPanel"
import {
    LadderModule,
    ProjectInfoModule,
    AtAGlanceModule,
    UpcomingEventsModule,
    HelpWantedModule,

} from './Modules/modules'
import ProjectContext from "./ProjectContext";
import dummyData from './DummyData';




export default function ProjectPage() {
    const data =dummyData["Immigration Justice Zine"]
    return (
        <ProjectContext.Provider
        value={{
            data:data
        }}
        >
        <Row>
            <LeftPanel />
            <ContentContainer>
                <ProjectInfoModule/>
                <AtAGlanceModule/>
                <LadderModule data={data["sections"]} />
                <UpcomingEventsModule/>
                <HelpWantedModule/>
            </ContentContainer>
        </Row>
        </ProjectContext.Provider> 
    )
}




const Row = styled.div`
  display: flex;
  width: 100%;
`

const ContentContainer = styled.div`
  display: grid;
  width: 100%;
  padding: 5vh 50px 3vh 40px ;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 20px 10px;
  
`

