import { useMemo, useState } from 'react';
//import Modal from 'react-modal';
import styled from "styled-components"
import TeamNotesWidget from "./Notepad/NotepadWidget";
import Modal from 'styled-react-modal'
import * as styles from '../sharedStyles';


//Modal.setAppElement('#root')
const StyledModal = Modal.styled`
  width: 600px;
  height: 400px;
  background-color:white;
`


function LadderModal({ data, isOpen, onRequestClose, subtitle }) {
    console.log(data, "DATA", isOpen)
    return (
        <StyledModal
            isOpen={isOpen}
            onBackgroundClick={onRequestClose}
            onEscapeKeydown={onRequestClose}>
            <GreenTitleBar>
                <div>Notes</div>
                <CloseBox onClick={onRequestClose}>X</CloseBox>
            </GreenTitleBar>
            <WidgetContainer>
            {isOpen&&<TeamNotesWidget id={data["section"]}/>}
            </WidgetContainer>
        </StyledModal>
    );
};


const CloseBox = styled.div`
    cursor:pointer;
`;
const GreenTitleBar = styled(styles.GreenTitleBar)`
    display:flex;
    justify-content: space-between;
    padding-right:20px;
`


const WidgetContainer = styled.div`
height: auto;
 min-height: 100% !important;
  width:100%;
  color:blue;
`

export default LadderModal;
