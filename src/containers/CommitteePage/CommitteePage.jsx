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
import ControlContext from 'shared/control-context';
import {updateCommittee} from "shared/firebase";
import UpdatesSection from 'components/UpdatesSection/UpdatesSection'
//import dummyData from 'dummydata';
//starting dev


export default function CommitteePage() {
    const ctrctx = useContext(ControlContext);
    const urlParts = window.location.href.split("/")
    const committeeId = urlParts[urlParts.length-1]
    
    const [committeeData, setCommitteeData] = useState(ctrctx.getCommitteeData(committeeId));
    const [selectorOpen, setSelectorOpen] = useState(null);
    console.log(committeeData);
    return (
      <Row>
          <LeftPanel />
          <ContentContainer>
            <CommitteeInfoModule />
            <BudgetModule />
          
            <AtAGlanceModule />
            <CalendarModule />
            <div> 
              <UpdatesSection
                            updates={"updates" in committeeData? committeeData.updates : []}
                            user={ctrctx.user}
                            selectorOpen={selectorOpen}
                            updateUpdates={(newUpdates)=>{
                                let newCommitteeData = {...committeeData,  "updates":newUpdates}
                                updateCommittee(committeeId, newCommitteeData)
                                setCommitteeData(newCommitteeData);
                            }}
                            setSelectorOpen={(id)=>{
                                if(selectorOpen!=id)setSelectorOpen(id);
                                else setSelectorOpen(null);
                                console.log("setting selector");
                            }}
                        >
                            
                        </UpdatesSection>
                </div>
          </ContentContainer>
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
