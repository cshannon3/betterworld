import React, { useContext, useState} from "react";
import styled from "styled-components";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
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
import { useHistory, useParams } from "react-router-dom";

export default function Landing() {
  const params = useParams();
  //const ctrctx = useContext(ControlContext);
  const [value, loading, error] = useDocument(fb.getGroupRef(), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [projectsData, setProjectsData] = useState(null);
  const [projectsSnapshot, loadingProject, errorProject] = useCollection(
    fb.getProjects(params.groupId),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  if (!loadingProject && !projectsData) {
    const _data = projectsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setProjectsData(_data);
  }


  const LeftComponent = () => {
    const groupData = loading ? null : value && value.data();
    return (
      <LeftWrapper>
        <div>
          <PageTitleText style={{paddingBottom: '20px'}}>{"Activist Org"/*groupData &&groupData.name*/}</PageTitleText>
          <PageSubtitleText>Mission Statement/Who We Are</PageSubtitleText>
          {loading && <span>Document: Loading...</span>}
          {groupData && <LargeBodyText>{`We are a college activist group focused on mobilizing students and calling for change in our university and our city.`
          }</LargeBodyText>}
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
