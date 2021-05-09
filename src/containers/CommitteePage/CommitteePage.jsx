import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"

import LeftPanel from "containers/Panels/LeftPanel"
import {
    LadderModule,
    ProjectInfoModule,
    AtAGlanceModule,
    UpcomingEventsModule,
    HelpWantedModule,

} from '../3_Project_Page/Modules/modules'
import ProjectContext from "../3_Project_Page/ProjectContext";
//import dummyData from '../3_Project_Page/DummyData';




export default function CommitteePage() {
   // const data =dummyData["Immigration Justice Zine"]
    return (
        // <ProjectContext.Provider
        // value={{
        //     data:data
        // }}
        // >
        <Row>
            <LeftPanel />
            <ContentContainer>
                <ProjectInfoModule/>
                <AtAGlanceModule/>
                {/* <LadderModule data={data["sections"]} /> */}
                <UpcomingEventsModule/>
                <HelpWantedModule/>
            </ContentContainer>
        </Row>
        // </ProjectContext.Provider> 
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

