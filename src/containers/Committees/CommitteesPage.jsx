import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import LeftPanel from "components/Panels/LeftPanel";
import ControlContext from "../../shared/control-context";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router-dom";
import { committeeIcons } from "data/dummydata";
import { NavLink } from "react-router-dom";
import {
  EmphasizedSmallBodyText,
  LargeBodyText,
  PageSubtitleText,
  PageTitleText,
  ProjectCardText,
  ProjectCardTextWhite,
  SectionHeaderText,
  SmallestBodyTextBlack,
  SmallestBodyTextWhite,
} from "styles/sharedStyles";
import CommitteeBox from "components/committeeBox";
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";

export default function CommitteesPage() {
  const ctrctx = useContext(ControlContext);
  let projectsData = ctrctx.getProjectsData();
  projectsData = projectsData ? Object.values(projectsData) : [];

  const committeeData = Object.values(ctrctx.getCommitteesData());

  let history = useHistory();
const LeftComponent = ()=>{
  return (<div>
  <OverviewSection>
      <PageTitleText> Committees</PageTitleText>
  </OverviewSection>
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
  </div>)
}
const RightComponent = ()=>{
  return ( <div>

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
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const OverviewSection = styled.div``;

const CommitteeSection = styled.div`
  width: 100%;
`;

