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
    RecruitingModule

} from './Modules/modules'
import ControlContext from 'shared/control-context';
import {updateCommittee} from "shared/firebase";
import UpdatesSection from 'components/UpdatesSection/UpdatesSection'
import { useWindowWidth,} from '@react-hook/window-size';

//import dummyData from 'dummydata';
//starting dev


export default function CommitteePage() {
    const ctrctx = useContext(ControlContext);
    const urlParts = window.location.href.split("/")
    const committeeId = urlParts[urlParts.length-1]
    
    const [committeeData, setCommitteeData] = useState(ctrctx.getCommitteeData(committeeId));
    const [selectorOpen, setSelectorOpen] = useState(null);
    const windowWidth = useWindowWidth()
    // if(windowWidth<1200) return (<div>
    //   Window too small...we didn't make responsive yet
    //   </div>)
    const CustomModule = () => {
      if (committeeId=="art-edu"){
        return( <RecruitingModule 
          committeeData={committeeData}
        />);
      }
      if(committeeId=="actions"){
        return( <RecruitingModule 
          committeeData={committeeData}
        />);
      }
      if(committeeId=="money"){
       return( <BudgetModule 
        committeeData={committeeData}
      />);
      }
      if(committeeId=="recruiting"){
        return( <RecruitingModule 
          committeeData={committeeData}
        />);
      }
    }
    
    
    return (
      <Row>
          <LeftPanel />
          <ContentContainer>
            
            <Column>
            <CommitteeInfoModule 
              committeeData={committeeData}
              user={ctrctx.user}
              onSave={(newUpdate)=>{

                let newCommitteeData = {...committeeData,  "updates":[...committeeData.updates, newUpdate]}
                updateCommittee(committeeId, newCommitteeData)
                setCommitteeData(newCommitteeData);
              }}
             />
           
           
            <CustomModule />
            </Column>
            <Column>
            <AtAGlanceModule committeeData={committeeData} />
            {/* <CalendarModule /> */}
            <UpdateDiv> 
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
                </UpdateDiv>
                </Column>
          </ContentContainer>
      </Row>
                          
    )
}


const Row = styled.div`
  display: flex;
  width: 100%;
  height:100vh;
`

const ContentContainer = styled.div`
  //display: grid;
  width: 100%;
  height:100%;
  padding: 5vh 50px 3vh 40px ;
  display: flex;
  //grid-template-columns: 1fr 1fr 1fr 1fr;
 // grid-template-rows: 1fr 1fr 1fr;
 // grid-gap: 20px 10px;

`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
  width:100%;

`
const UpdateDiv = styled.div`
  height:60%;
  padding:5px;
`;
