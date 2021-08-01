import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useDocument } from "react-firebase-hooks/firestore";
import ControlContext from "shared/control-context";
import {
  LargeBodyText,
  PageSubtitleText,
  PageTitleText,
} from "styles/sharedStyles";

import * as styles from "styles/sharedStyles";

import * as fb from "shared/firebase";

import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import QuickLinksSection from "components/QuickLinks";
import AtAGlanceModule from "components/AtAGlanceModule";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";
import ModuleWrapper from "components/ModuleWrapper";

export default function Landing() {
  const ctrctx = useContext(ControlContext);
  const [value, loading, error] = useDocument(fb.getGroupRef(), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [link, setLink] = useState(null);
  let projectsData = ctrctx.getProjectsData();
  projectsData = projectsData ? Object.values(projectsData) : [];

  const LeftComponent = () => {
    const groupData = loading ? null : value && value.data();
    return (
      <LeftWrapper>
        <OverviewSection>
          <PageTitleText>CMU Against ICE</PageTitleText>
          <P10 />
          <PageSubtitleText>Mission Statement/Who We Are</PageSubtitleText>
          {loading && <span>Document: Loading...</span>}
          {groupData && <LargeBodyText>{groupData.description}</LargeBodyText>}
        </OverviewSection>
        <QuickLinksSection
          resources={groupData && groupData.resources}
          clickLink={(_link) => {
            window.open(_link, '_blank');
            //setLink(_link);
          }}
          addLink={(url, name)=>{
            fb.updateGroup(url,name);
          }}
        />
       
        <ModuleWrapper
        Component={
        <div>
        <div>
          <styles.EmphasizedRegularBodyText>Upcoming Meetings</styles.EmphasizedRegularBodyText>
          <H10/>
          <styles.SmallestBodyTextBlack> - Sunday, July 25th at 8pm: General Meeting(<a href="">Notes</a> / <a href="">Link</a>)</styles.SmallestBodyTextBlack>
          <styles.SmallestBodyTextBlack> - Tuesday, July 27th at 7pm: Dis-O Open 2021 Meeting((<a href="">Notes</a> / <a href="">Link</a>)</styles.SmallestBodyTextBlack> 
        </div> 
        <div>
         
          <styles.EmphasizedRegularBodyText>Recent Meetings</styles.EmphasizedRegularBodyText>
          <H10/>
         <styles.SmallestBodyTextBlack> - Sunday, July 25th at 8pm: General Meeting(<a href="">Notes</a>)</styles.SmallestBodyTextBlack>
          <styles.SmallestBodyTextBlack> - Tuesday, July 27th at 7pm: Dis-O Open 2021 Meeting(<a href="">Notes</a>)</styles.SmallestBodyTextBlack> 
         
        </div> 
        </div>
        
      }
           name={"Announcements"}
        />
      </LeftWrapper>
    );
  };
  const RightComponent = () => {
    return (
      <CommitteeSection>
        <UpdatesSection
          allowAddUpdate={false}
        />
      </CommitteeSection>
    );
  };

  return (
    <ResponsiveSplitScreen
      currentPage={"home"}
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
}

const P10 = styled.div`
  padding-top: 20px;
`;

const H10 = styled.div`
  height: 10px;
`;
const Row = styled.div`
  display: flex;
  gap: 20px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LeftWrapper = styled.div`
display: flex;
  flex-direction:column;
  height:100%;
`;
const OverviewSection = styled.div``;
// const QuickLinksSection = styled.div`
//   width: 100%;
// `;
const CommitteeSection = styled.div`
  width: 100%;
  height:95%;
`;
