import { useState, useContext } from 'react';
import styled from "styled-components"
import Modal from 'styled-react-modal'
import * as styles from '../../sharedStyles';
import StagesComponent from "./StagesComponent";
import AddUpdateComponent from "./AddUpdateComponent";
import ProjectContext from '../../../ProjectContext';
import ControlContext from 'shared/control-context';
import { SlackSelector, SlackCounter } from '@charkour/react-reactions';
import { cleanUpdateModel } from 'data_models/projectmodel';


const StyledModal = Modal.styled`
  width: 90vw;
  height: 85vh;
  background-color:white;
`
function LadderModal({ data, isOpen, onRequestClose, modalType, subtitle }) {
    const ctrctx = useContext(ControlContext);
    const ctx = useContext(ProjectContext);
    
    function InnerComponent() {
        if (!isOpen || !ctrctx.user) return null;
        const userName = ctrctx.user["displayName"];
        console.log(userName);
        return (
            <WidgetContainer>
                <MainContainer>
                    <div>  
                        <div className="header">
                            <div className="description">
                                Hello
                            </div>
                            <div className="dates">
                                3/4/5
                            </div>
                            
                        </div>
                        <div className="tasks">
                            <StagesComponent data={data["stages"]}/>
                        </div>
                        <div className="buttons">
                            <AddUpdateComponent
                            title={"Offer Help"}
                            saveText={"Offer"}
                            description={"Describe how or where you would like to help"}
                            onSave={({stage, content})=>{
                                const newUpdate = cleanUpdateModel({
                                    "sectionId":"",
                                    "stage":stage,
                                    "type":"offer to help",
                                    "status":"not started",
                                    "author":ctrctx.user.displayName,
                                    "authorId":ctrctx.user.id,
                                    "date":Date.now(),
                                    "content":content,
                                    "reactions":[ ]
                                });
                                ctx.addUpdate(newUpdate, data.id);
                            }}
                            />
                            <AddUpdateComponent
                            title={"Request Help"}
                            saveText={"Request"}
                            description={" Describe the work you need help with for this task..."}
                            onSave={({stage, content})=>{
                                const newUpdate = cleanUpdateModel({
                                    "sectionId":"",
                                    "stage":stage,
                                    "type":"request help",
                                    "status":"not started",
                                    "author":ctrctx.user.displayName,
                                    "authorId":ctrctx.user.id,
                                    "date":Date.now(),
                                    "content":content,
                                    "reactions":[ ]
                                });
                                ctx.addUpdate(newUpdate, data.id);
                            }}
                            />
                        </div>
                    </div>
                </MainContainer>
                <UpdatesContainer>
                    <UpdatesMenu>
                        <div><h3>Updates</h3></div>
                        <div>
                            <button>Filter</button>
                        <AddUpdateComponent />
                        </div>
                    </UpdatesMenu>
                    {data && data["updates"].map((updateData)=>{
                      return   <UpdateBox key={updateData["id"]}>
                        <div className={"topbar"}>
                            <div className={"author"}>{updateData["author"]}
                                <span className={"stage"}> &#8226; {updateData["stage"]}</span>
                            </div>
                            <div className={"date"}>
                                {updateData["date"]}
                            </div>
                        </div>
                        <p>
                        {updateData["content"]}
                        </p>
                        <SlackCounter 
                        user={userName}
                        counters={updateData["reactions"]}
                        />
                        {/* <SlackSelector />  */}
                    </UpdateBox>
                    })}
                </UpdatesContainer>
            </WidgetContainer>
        );
        return null;
    }
    if (!data) return (null)
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
            <InnerComponent />
        </StyledModal>
    );


};




const WidgetContainer = styled.div`
height: 100%;
width:100%;
display:flex;
background-color: white;
`


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
const MainContainer = styled.div`
background-color: white;
flex-grow:1;

>div{
    display:flex;
    flex-direction:column;
    height:100%;
    justify-content: center;
    margin:auto;
}
.header{
    height:33%;
    display:flex;
    justify-content:space-between;
    .description{
        color:blue;
    }
    .date{
        color:green;
    }
}
.tasks{
    height:400px;
    flex-grow:1;
}
.buttons{
    height:100px;
    width:100%;
    
    display:flex;
    justify-content: flex-end;
    align-items:center;
}
`


const TitleBar = styled(styles.GreyTitleBar)`
    display:flex;
    justify-content: space-between;
    padding-right:20px;
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


const LinkBox = styled.div`
    height:50px;
    min-width:50px;
    img{
      height:54px;
      width:60px;
      margin:3px;
    }
`

const UpdatesContainer = styled.div`
background-color:#F8F8F8;
margin: 15px;
width:350px;
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


const ButtonOne = styled.button`
    background: #0CC998;
    border-radius: 72.2872px;
    height:35px;
    width:144px;
    margin:10px;
`;

const TableSection = styled.section`
    table {
        width:100%;
    }
    thead {
        background-color: var(--brand-regular);
        border-radius: 0.4rem;
    }
    th,td {
        grid-column: span 2;
        padding: 1rem;
        text-align: left;
    }
    th {
        font-size: 1.5rem;
    }
    td {
        font-size: 1rem;
    }
    span {
        margin-left: 1rem;
    }
`;
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