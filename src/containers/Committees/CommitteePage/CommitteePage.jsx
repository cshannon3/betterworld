import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import * as styles from 'styles/sharedStyles';
import ControlContext from "shared/control-context";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import ModuleWrapper from "components/ModuleWrapper";
import QuickLinksSection from "components/QuickLinks";
import { useHistory, useParams } from "react-router-dom";
import * as fb from "shared/firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";


export default function CommitteePage() {
 // const ctrctx = useContext(ControlContext);
  //const urlParts = window.location.href.split("/");
  //const committeeId = urlParts[urlParts.length - 1];
  // const [committeeData, setCommitteeData] = useState(
  //   ctrctx.getCommitteeData(committeeId)
  // );
  const params = useParams();
  const [committeeData, setCommitteeData] = useState(null);
  const [committeeSnapshot, loadingCommittee, errorCommittee] = useDocument(
    fb.getCommitteeRef (params.committeeId, params.groupId),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  if (!loadingCommittee && !committeeData ) {
    setCommitteeData({...committeeSnapshot.data(), id:committeeSnapshot.id});
  }

  const LeftComponent = ()=>{
    console.log(committeeData)
    return (  
      !committeeData? <LeftWrapper></LeftWrapper>:
      <LeftWrapper>
      <CommitteeTitleBox>
      <div>
        <CommitteesTitle>{committeeData.name}</CommitteesTitle>
        <DescriptionText>{committeeData.description}</DescriptionText>
      </div>

      <div className="bottomBar">
        <div>
          <CommitteesSubtitle>
            Point Person: { committeeData.pointPerson.displayName??"Null"}
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
      name={"Information"}
      Component={  <div>
        <styles.EmphasizedRegularBodyText>Committee Responsibilities</styles.EmphasizedRegularBodyText>
       <H10/>
        <ul>
          {committeeData["responsibilities"] &&
            committeeData["responsibilities"].map((data) => (
              <styles.SmallestBodyTextBlack>- {data}</styles.SmallestBodyTextBlack>
            ))}
        </ul>
      </div>}
      />
    </LeftWrapper>)
  }


  const RightComponent = ()=>{
    return (   
     <div>
     
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

const H10 = styled.div`
  height: 10px;
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


