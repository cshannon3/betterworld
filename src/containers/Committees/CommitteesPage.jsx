import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import LeftPanel from "components/Panels/LeftPanel";
import ControlContext from "../../shared/control-context";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router-dom";
import {
  LargeBodyText,
  PageTitleText,
} from "styles/sharedStyles";
import CommitteeBox from "components/committeeBox";
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";

import QuickLinksSection from "components/QuickLinks";
import AtAGlanceModule from "components/AtAGlanceModule";


export default function CommitteesPage() {
  const ctrctx = useContext(ControlContext);
  let projectsData = ctrctx.getProjectsData();
  projectsData = projectsData ? Object.values(projectsData) : [];
  const committeeData = Object.values(ctrctx.getCommitteesData());

  let history = useHistory();
const LeftComponent = ()=>{
  return (<OverviewSection>
  <div>
      <PageTitleText> Committees</PageTitleText>
      <LargeBodyText>
      Here you’ll find all our committees and what they do.....
</LargeBodyText>
      <QuickLinksSection/>
      
  </div>

  <CommitteeSection>
  
    <Row>
      {committeeData.map((data) => (
        <CommitteeBox 
          id={data.id}
          name={data.name}
          order={data.order}
          onClick={()=>history.push(`/committees/${data.id}`)}
        />
      ))}
    </Row>
  </CommitteeSection>
  </OverviewSection>)
}
const RightComponent = ()=>{
  return ( <div>
      {/* <AtAGlanceModule/> */}
      <UpdatesSection/>
  </div>)
}
  return (
   <ResponsiveSplitScreen
        currentPage={'committees'}
        LeftComponent={LeftComponent}
        RightComponent={RightComponent}
   />
  );
}


const Row = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-content:center;
  justify-content:space-evenly;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const OverviewSection = styled.div`
 width: 100%;
  height:100%;
  display: flex;
  justify-content: space-between;
  flex-direction:column;
  `;

const CommitteeSection = styled.div`
  width: 100%;
  height:100%;
  display:flex;
  align-content:center;
  justify-content:center;
`;


