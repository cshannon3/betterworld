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
            setLink(_link);
          }}
          addLink={(url, name)=>{
            fb.updateGroup(url,name);
          }}
        />
        <ModuleWrapper
        Component={<div>
          Hello
        </div>}
           name={"New? Start Here!"}
        />
      </LeftWrapper>
    );
  };
  const RightComponent = () => {
    if (link)
      return (
        <div style={{ height: "100%" }}>
          <button onClick={() => setLink(null)}>X</button>
          <a href={link} target="_blank">
            go to
          </a>
          <iframe
            width="100%"
            height="100%"
            src={link}
            allowFullScreen
          ></iframe>
        </div>
      );
    return (
      <CommitteeSection>
        <AtAGlanceModule 
        TopComponent={<div>
          <styles.EmphasizedRegularBodyText>Upcoming Meetings</styles.EmphasizedRegularBodyText>
          <styles.RegularBodyText> Sunday, July 25th at 8pm: General Meeting(<a href="">Notes</a> / <a href="">Link</a>)</styles.RegularBodyText>
          <styles.RegularBodyText>  Tuesday, July 27th at 7pm: Dis-O Open 2021 Meeting((<a href="">Notes</a> / <a href="">Link</a>)</styles.RegularBodyText> 
        </div> 
        }
        BottomComponent={<div>
          <styles.EmphasizedRegularBodyText>Recent Meetings</styles.EmphasizedRegularBodyText>
          <styles.RegularBodyText> Sunday, July 25th at 8pm: General Meeting(<a href="">Notes</a>)</styles.RegularBodyText>
          <styles.RegularBodyText>  Tuesday, July 27th at 7pm: Dis-O Open 2021 Meeting(<a href="">Notes</a>)</styles.RegularBodyText> 
        </div> 
        }
        />
        <UpdatesSection/>
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
`;
