import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"

import LeftPanel from "containers/Panels/LeftPanel"
import {
    LadderModule,
    CommitteeInfoModule,
    AtAGlanceModule,
    BudgetModule,
    CalendarModule,
    UpcomingEventsModule,
    HelpWantedModule,

} from './Modules/modules'
import ProjectContext from "../3_Project_Page/ProjectContext";

//import dummyData from 'dummydata';
//starting dev


export default function CommitteePage() {
    return (
      <Row>
          <LeftPanel />
          <CommitteeInfoModule />
          <BudgetModule />
          <AtAGlanceModule />
          <CalendarModule />
          <div>Import Updates module</div>
      </Row>
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
