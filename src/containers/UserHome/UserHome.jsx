import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import {
  LargeBodyText,
  PageSubtitleText,
  PageTitleText,
} from "styles/sharedStyles";
import * as styles from "styles/sharedStyles";
import * as fb from "shared/firebase";
import { useHistory, useParams } from "react-router-dom";
import ControlContext from "shared/control-context";

// TODO create user home page
export default function UserHome() {
  const params = useParams();
  let history = useHistory();
  const ctrctx = useContext(ControlContext);

  let _user = JSON.parse(window.localStorage.getItem("user"));
  console.log(_user);
  const [groupsData, setGroupsData] = useState(null);
  const [groupsSnapshot, loadingGroups, errorGroups] = useDocument(
    fb.getGroups(_user),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  if (!loadingGroups && !groupsData) {
    const _data = groupsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(_data);
    setGroupsData(_data);
  }
  const LeftComponent = () => {
    return (
      <div>
        {groupsData &&
          groupsData.map((d) => (
            <div
              onClick={() => {
                ctrctx.groupName = d.name;
                history.push(`/${d.id}`);
              }}
            >
              {d.name}
            </div>
          ))}
      </div>
    );
  };

  return (
    <LeftComponent/>
  );
}
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const CommitteeSection = styled.div`
  width: 100%;
  height: 95%;
`;

 // <ResponsiveSplitScreen
    //   currentPage={"home"}
    //   LeftComponent={LeftComponent}
    //   RightComponent={LeftComponent}
    // />