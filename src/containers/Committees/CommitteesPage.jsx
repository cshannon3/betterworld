import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import ControlContext from "../../shared/control-context";
import { useHistory , useParams } from "react-router-dom";
import { LargeBodyText, PageTitleText } from "styles/sharedStyles";
import CommitteeBox from "components/committeeBox";
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";
import QuickLinksSection from "components/QuickLinks";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import * as fb from "shared/firebase";


export default function CommitteesPage() {
 // const ctrctx = useContext(ControlContext);
  //const committeeData = Object.values(ctrctx.getCommitteesData());
  const params = useParams();
  const [committeesData, setCommitteesData] = useState(null);
  const [committeesSnapshot, loadingCommittees, errorCommittees] = useDocument(
    fb.getCommittees(params.groupId),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  if (!loadingCommittees && !committeesData ) {
    setCommitteesData(committeesSnapshot.docs.map((v)=>{return{...v.data(), id:v.id}}))
  }
  let history = useHistory();
  const LeftComponent = () => {
    return (
     !committeesData? <div>  </div> :
      <OverviewSection>
        <div>
          <PageTitleText> Committees</PageTitleText>
          <LargeBodyText>
            Here you’ll find all our committees and what they do.....
          </LargeBodyText>
          <QuickLinksSection />
        </div>

        <CommitteeSection>
          <Row>
            {committeesData.map((data) => (
              <CommitteeBox
                id={data.id}
                name={data.name}
                order={data.order}
                onClick={() => history.push(`/${params.groupId}/committees/${data.id}`)}
              />
            ))}
          </Row>
        </CommitteeSection>
      </OverviewSection>
    );
  };
  const RightComponent = () => {
    return ( <div> <UpdatesSection /> </div>);
  };
  return (
    <ResponsiveSplitScreen
      currentPage={"committees"}
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
}

const Row = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const OverviewSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const CommitteeSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
`;
