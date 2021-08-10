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
        <div>
          <PageTitleText style={{paddingBottom: '20px'}}>CMU Against ICE</PageTitleText>
          <PageSubtitleText>Mission Statement/Who We Are</PageSubtitleText>
          {loading && <span>Document: Loading...</span>}
          {groupData && <LargeBodyText>{groupData.description}</LargeBodyText>}
        </div>
        <QuickLinksSection
          title={"Quick Links"}
          spacing={-20}
          position = "right center"
          items={groupData && groupData.resources}
          maxLength={11}
          clickLink={(_link) => {
            window.open(_link, '_blank');
          }}
          onAddLink={(url, name)=>{
            fb.updateGroup(url,name);
          }}
        />

        <ModuleWrapper
        Component={
        <div>
        <div>
          <styles.EmphasizedRegularBodyText style={{padding: '10px 0px'}}>Upcoming Meetings</styles.EmphasizedRegularBodyText>
          <styles.SmallestBodyTextBlack> - Sunday, July 25th at 8pm: General Meeting(<a href="">Notes</a> / <a href="">Link</a>)</styles.SmallestBodyTextBlack>
          <styles.SmallestBodyTextBlack> - Tuesday, July 27th at 7pm: Dis-O Open 2021 Meeting((<a href="">Notes</a> / <a href="">Link</a>)</styles.SmallestBodyTextBlack>
        </div>
        <div>
          <styles.EmphasizedRegularBodyText style={{padding: '10px 0px'}}>Recent Meetings</styles.EmphasizedRegularBodyText>
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

  return (
    <ResponsiveSplitScreen
      currentPage={"home"}
      LeftComponent={LeftComponent}
      RightComponent={ ()=><UpdatesSection
        allowAddUpdate={false}
      />}
    />
  );
}
const LeftWrapper = styled.div`
display: flex;
  flex-direction:column;
  height:100%;
`;
const CommitteeSection = styled.div`
  width: 100%;
  height:95%;
`;
