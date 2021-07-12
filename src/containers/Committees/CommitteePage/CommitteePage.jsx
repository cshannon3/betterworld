import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import {
  CommitteeInfoModule,
  AtAGlanceModule,
  BudgetModule,
  RecruitingModule,
} from "./Modules/modules";
import ControlContext from "shared/control-context";
import { updateCommittee } from "shared/firebase";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";


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
      <div>
      <CommitteeInfoModule
        committeeData={committeeData}
        user={ctrctx.user}
        onSave={(newUpdate) => {
          let newCommitteeData = {
            ...committeeData,
            updates: [...committeeData.updates, newUpdate],
          };
          updateCommittee(committeeId, newCommitteeData);
          setCommitteeData(newCommitteeData);
        }}
      />
      <CustomModule />
    </div>)
  }


  const RightComponent = ()=>{
    return (   
     <div>
      <AtAGlanceModule committeeData={committeeData} />
      {/* <CalendarModule /> */}
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



