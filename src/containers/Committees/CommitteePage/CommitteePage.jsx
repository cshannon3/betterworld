import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import * as styles from 'styles/sharedStyles';
import {
  BudgetModule,
  RecruitingModule,
} from "./Modules/modules";
import ControlContext from "shared/control-context";
import { updateCommittee } from "shared/firebase";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import ModuleWrapper from "components/ModuleWrapper";
import QuickLinksSection from "components/QuickLinks";
import AtAGlanceModule from "components/AtAGlanceModule";

export default function CommitteePage() {
  const ctrctx = useContext(ControlContext);
  const urlParts = window.location.href.split("/");
  const committeeId = urlParts[urlParts.length - 1];
  const [committeeData, setCommitteeData] = useState(
    ctrctx.getCommitteeData(committeeId)
  );

  const CustomModule = () => {
    if (committeeId == "art-edu") {
      return <RecruitingModule committeeData={committeeData} />;
    }
    if (committeeId == "actions") {
      return <RecruitingModule committeeData={committeeData} />;
    }
    if (committeeId == "money") {
      return <BudgetModule committeeData={committeeData} />;
    }
    if (committeeId == "recruiting") {
      return <RecruitingModule committeeData={committeeData} />;
    }
  };

  const LeftComponent = ()=>{
    return (  
      <LeftWrapper>
      <CommitteeTitleBox>
      <div>
        <CommitteesTitle>{committeeData.name}</CommitteesTitle>

        <DescriptionText>{committeeData.description}</DescriptionText>
      </div>

      <div className="bottomBar">
        <div>
          <CommitteesSubtitle>
            Point Person: {committeeData.pointPerson.displayName}
          </CommitteesSubtitle>
        </div>
        <div>
          <CommitteesSubtitle>Interested in this Committee?</CommitteesSubtitle>
        </div>
      </div>
      <QuickLinksSection
          resources={[]}
          clickLink={(_link) => { }}
          addLink={(url, name)=>{ }}
        />
    </CommitteeTitleBox>
      <ModuleWrapper
        name={committeeData.name}
        Component={<div>Hey</div>}
      />
    </LeftWrapper>)
  }


  const RightComponent = ()=>{
    return (   
     <div>
      {/* <AtAGlanceModule committeeData={committeeData} /> */}
      {/* <CalendarModule /> */}
      <AtAGlanceModule
      TopComponent={  <div>
        <styles.EmphasizedRegularBodyText>Committee Responsibilities</styles.EmphasizedRegularBodyText>
        <ul>
          {committeeData["responsibilities"] &&
            committeeData["responsibilities"].map((data) => (
              <li>{data}</li>
            ))}
        </ul>
      </div>}
      />
      <UpdateDiv>
        <UpdatesSection/>
      </UpdateDiv>
    </div>)
  }
  return (
    <ResponsiveSplitScreen
            currentPage={"projects"}
            LeftComponent={LeftComponent}
            RightComponent={RightComponent}
        />
  );
}


const UpdateDiv = styled.div`
  height: 60%;
  padding: 5px;
`;

const LeftWrapper = styled.div`
display: flex;
  flex-direction:column;
  height:100%;
`;


const CommitteesSubtitle = styled.h2`
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: #000000;
`;
const DescriptionText = styled.p`
  font-family: "Helvetica";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  padding-top: 50px;
`;

const CommitteesTitle = styled.h2`
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 70px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #0cc998;
`;

const CommitteeTitleBox = styled.div`
  //display: grid;
  //grid-area: 1 / 1 / span 2 / span 2;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 50px 0px 0px;
  .bottomBar {
    display: flex;
    justify-content: space-between;
    height: 90px;
  }
`;


// function CommitteeInfoModule({ committeeData, user, onSave }) {
//   return (
    
//   );
// }
// <CommitteeInfoModule
// committeeData={committeeData}
// user={ctrctx.user}
// onSave={(newUpdate) => {
//   let newCommitteeData = {
//     ...committeeData,
//     updates: [...committeeData.updates, newUpdate],
//   };
//   updateCommittee(committeeId, newCommitteeData);
//   setCommitteeData(newCommitteeData);
// }}
// />
