import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import * as styles from "styles/sharedStyles";
//import ProjectContext from '../../../ProjectContext';
import ControlContext from "shared/control-context";
import { SlackSelector, SlackCounter } from "@charkour/react-reactions";
import { cleanUpdateModel } from "data_models/updatemodel";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";
import UpdateBox from "components/UpdatesSection/UpdateBox";
import AddUpdateComponent from "components/UpdatesSection/AddUpdateComponent";

const StyledModal = Modal.styled`
  width: 90vw;
  height: 85vh;
  background-color:white;
`;

function HelpRequestsModal({ data, isOpen, onRequestClose, helpRequests }) {
  const ctrctx = useContext(ControlContext);
  const [selectorOpen, setSelectorOpen] = useState(null);
  const [sectionData, setSectionData] = useState(data);
  //const ctx = useContext(ProjectContext);
  const sections = data["sections"];
  const sectionList = sections.map((s) => s.name);

  console.log(sectionList);
  // const [sectionData, setSectionData] = useState(data);
  useEffect(() => {
    //if(sectionData ==null){setSectionData(data); }
  });

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={onRequestClose}
      onEscapeKeydown={onRequestClose}
    >
      <GreenTitleBar>
        <div>{"All Help Requests"}</div>
        <div>
          <CloseBox onClick={onRequestClose}>X</CloseBox>
        </div>
      </GreenTitleBar>

      <WidgetContainer>
        {helpRequests &&
          sections.map((sectionData) => {
            return (
              <div>
                <SectionTitle> 
                <h2>{sectionData.name}</h2>
                <p>Status: tbd</p>
                </SectionTitle>
                <HelpUpdatesList
                  updates={helpRequests.filter((hr)=>hr["section_name"]===sectionData.name)}
                  stages={["Research"]}
                  user={ctrctx.user}
                  selectorOpen={selectorOpen}
                  updateUpdates={(newUpdates) => {
                    //let newSectionData = {...sectionData,  "updates":newUpdates}
                    //ctx.updateSection(newSectionData);
                    //setSectionData(newSectionData);
                  }}
                  setSelectorOpen={(id) => {
                    //if(selectorOpen!=id)setSelectorOpen(id);
                    // else setSelectorOpen(null);
                    // console.log("setting selector");
                  }}
                ></HelpUpdatesList>
              </div>
            );
          })}
      </WidgetContainer>
    </StyledModal>
  );
}

const HelpUpdatesList = ({
  updates = [],
  selectorOpen,
  updateUpdates = (newUpdates) => {},
  setSelectorOpen = (updateId) => {},
}) => {
  return (
    <UpdatesList>
      {updates &&
        updates
          .sort((a, b) => b.date - a.date)
          .map((updateData) => {
            return (
              <UpdateBox
                id={updateData.id}
                updateData={updateData}
                isSelector={selectorOpen == updateData.id}
                updateUpdate={(newUpdateData) => {
                  let newUpdates = updates;
                  let u = newUpdates.findIndex(
                    (up) => up.id == newUpdateData.id
                  );
                  newUpdates[u] = newUpdateData;
                  updateUpdates(newUpdates);
                }}
                setSelectorOpen={(updateData) => setSelectorOpen(updateData.id)}
                deleteUpdate={(updateData) => {
                  if (
                    window.confirm(
                      "Are you sure? This action cannot be reversed"
                    )
                  ) {
                    let newUpdates = updates.filter(
                      (u) => u.id != updateData.id
                    );
                    updateUpdates(newUpdates);
                  } else {
                    return;
                  }
                }}
              />
            );
          })}
    </UpdatesList>
  );
};

const WidgetContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  overflow: scroll;
`;
const CloseBox = styled.div`
  cursor: pointer;
`;
const GreenTitleBar = styled(styles.GreenTitleBar)`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  > div {
    display: flex;
  }
`;
const UpdatesList = styled.div`
    padding: 0px 20px;
  width: 100%;
`;
const SectionTitle = styled.div`
  width: 100%;
  display:flex;
  padding: 20px 20px;
  justify-content: space-between;

`;

  // overflow:scroll;
  // height:87%;


export default HelpRequestsModal;
