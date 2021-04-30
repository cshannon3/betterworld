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
//  <TeamNotesWidget id={data["id"]}/>
function LadderModal({ data, isOpen, onRequestClose, modalType, subtitle }) {
    console.log(data, "DATA", isOpen)
    const [currentModalType, setModalType] = useState(modalType)
    function InnerComponent() {
        if (currentModalType==="helpRequests") 
            return  (<div>{currentModalType}</div>);
        if (isOpen) return (
            <WidgetContainer>
                <MainContainer>Hi</MainContainer>
                <UpdatesContainer>
                    <UpdatesMenu>
                       <div><h3>Updates</h3></div>
                       <div>
                          <button>Filter</button>
                          <button>Add</button>
                        </div>
                        </UpdatesMenu>
                    
                    <UpdateBox>
                    <div className={"topbar"}>
                        <div className={"author"}>Darya
                            <span className={"stage"}> &#8226; Research</span>
                        </div>
                        <div className={"date"}>
                        4/18/21
                        </div>
                    </div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui.
                    </UpdateBox>
                    <UpdateBox>HEY</UpdateBox>
                    <UpdateBox>HEY</UpdateBox>
                </UpdatesContainer>
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
               <InnerComponent/> 
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
const UpdatesMenu = styled.div`
    display:flex;
    justify-content: space-between;
    padding:20px 0px;
    >div{
        display:flex;
    }
    h3{
        font-family: Baloo 2;
        font-style: normal;
        font-weight: 800;
        font-size: 21px;
        line-height: 33px;
        display: flex;
        align-items: center;
    }
`
const WidgetContainer = styled.div`
height: auto;
 min-height: 100% !important;
width:100%;
display:grid;
grid-template-columns: 1fr 350px;
`

const UpdatesContainer = styled.div`
background-color:#F8F8F8;
margin: 15px;
`
const MainContainer = styled.div`

background-color:red;
`
const UpdatesList = styled.div`

`
const UpdateBox = styled.div`
background-color: #FFFFFF;
border: 1px solid #EEEEEE;
box-sizing: border-box;
height:120px;
width:100%;
margin:auto;
.topbar{
    display:flex;
    justify-content: space-between;
    align-items:center;
    padding:5px;
}
.author{
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: #0CC998;
}
.stage{
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #5B5B5B;
}
.date{
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 19px;
    text-align: right;
    letter-spacing: -0.02em;

    color: #0CC998;
}

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