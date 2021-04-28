import { useMemo, useState } from 'react';
//import Modal from 'react-modal';
import styled from "styled-components"
import TeamNotesWidget from "./Notepad/NotepadWidget";
import Modal from 'styled-react-modal'
import * as styles from '../../sharedStyles';


//Modal.setAppElement('#root')
const StyledModal = Modal.styled`
  width: 90vw;
  height: 90vh;
  background-color:white;
`
function LadderModal({ data, isOpen, onRequestClose, modalType, subtitle }) {
    console.log(data, "DATA", isOpen)
    const [currentModalType, setModalType] = useState(modalType)
    function InnerComponent() {
       
        if (currentModalType==="helpRequests") 
            return  (<div>{currentModalType}</div>);
        if (isOpen) return (
            <WidgetContainer>
              <TeamNotesWidget id={data["id"]}/>
            </WidgetContainer>
        );
        return null;
    }
    if(!data) return (null)
    return (
        <StyledModal
            isOpen={isOpen}
            onBackgroundClick={onRequestClose}
            onEscapeKeydown={onRequestClose}>
            <GreenTitleBar>
                <div>{data && data["name"]}</div>
                <div>
                <button>Edit</button>
                    <CloseBox onClick={onRequestClose}>X</CloseBox>
                  
                </div>
                
            </GreenTitleBar>
            <WidgetContainer>
               <InnerComponent/> 
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

    >div{
        display:flex;
    }
`
const WidgetContainer = styled.div`
height: auto;
 min-height: 100% !important;
  width:100%;
`

export default LadderModal;


// if(currentModalType==="helpRequests")
    
    
// return (
//     <StyledModal
//         isOpen={isOpen}
//         onBackgroundClick={onRequestClose}
//         onEscapeKeydown={onRequestClose}>
//         <GreenTitleBar>
//             <div>Help Requests</div>
//             <CloseBox onClick={onRequestClose}>X</CloseBox>
//         </GreenTitleBar>
//         <WidgetContainer>
//         Hello
//         </WidgetContainer>
//     </StyledModal>
// );
// else return (
//     <StyledModal
//         isOpen={isOpen}
//         onBackgroundClick={onRequestClose}
//         onEscapeKeydown={onRequestClose}>
//         <GreenTitleBar>
//             <div>Notes</div>
//             <CloseBox onClick={onRequestClose}>X</CloseBox>
//         </GreenTitleBar>
//         <WidgetContainer>
//         {isOpen&&<TeamNotesWidget id={data["section"]}/>}
//         </WidgetContainer>
//     </StyledModal>
// );