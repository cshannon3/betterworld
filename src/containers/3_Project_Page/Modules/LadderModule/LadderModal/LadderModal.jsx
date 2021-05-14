import { useState, useContext, useEffect } from 'react';
import styled from "styled-components"
import Modal from 'styled-react-modal'
import * as styles from '../../sharedStyles';
import StagesComponent from "./StagesComponent";
import AddUpdateComponent from "./AddUpdateComponent";
import ProjectContext from '../../../ProjectContext';
import ControlContext from 'shared/control-context';
import { SlackSelector, SlackCounter } from '@charkour/react-reactions';
import { cleanUpdateModel } from 'data_models/projectmodel';
import UpdateBox from './UpdateBox';

const StyledModal = Modal.styled`
  width: 90vw;
  height: 85vh;
  background-color:white;
`
function LadderModal({ data, isOpen, onRequestClose, modalType, subtitle }) {
    const ctrctx = useContext(ControlContext);
    const ctx = useContext(ProjectContext);

    const [selectorOpen, setSelectorOpen] = useState(null);
    const [sectionData, setSectionData] = useState(data);
    useEffect(() => {
        if(sectionData ==null){
            setSectionData(data);
        }
      });

    function InnerComponent() {

        if (!isOpen || !ctrctx.user) return null;
        const userName = ctrctx.user["displayName"];
        console.log(data);
        const stages = data["stages"].map((st)=>st.name);
       
        console.log(userName);
        return (
            <WidgetContainer>
                <MainContainer>
                    <div>
                        <div className="header">
                            <div className="description">
                            <DescriptionHeader>Description</DescriptionHeader>
                                Hello
                            </div>
                            <div className="dates">
                                3/4/5
                            </div>

                        </div>
                        <div className="tasks">
                            <StagesComponent data={data && data["stages"]} />
                        </div>
                        <div className="buttons">
                            <AddUpdateComponent
                                title={"Offer Help"}
                                saveText={"Offer"}
                                stages={stages}
                                userName={userName}
                                description={"Describe how or where you would like to help"}
                                onSave={({ stage, content }) => {
                                    const newUpdate = cleanUpdateModel({
                                        "sectionId": "",
                                        "stage": stage,
                                        "type": "offer to help",
                                        "status": "not started",
                                        "author": ctrctx.user.displayName,
                                        "authorId": ctrctx.user.id,
                                        "date": Date.now(),
                                        "content": content,
                                        "reactions": []
                                    });
                                    const newSectionData = {...sectionData, "updates":[...sectionData["updates"], newUpdate]}
                                 
                                    ctx.updateSection(newSectionData);
                                    setSectionData(newSectionData)
                                }}
                            />
                            <AddUpdateComponent
                                title={"Request Help"}
                                saveText={"Request"}
                                userName={userName}
                                stages={stages}
                                description={" Describe the work you need help with for this task..."}
                                onSave={({ stage, content }) => {
                                    const newUpdate = cleanUpdateModel({
                                        "sectionId": "",
                                        "stage": stage,
                                        "type": "request help",
                                        "status": "not started",
                                        "author": ctrctx.user.displayName,
                                        "authorId": ctrctx.user.id,
                                        "date": Date.now(),
                                        "content": content,
                                        "reactions": [
                                        ]
                                    });
                                    const newSectionData = {...sectionData, "updates":[...sectionData["updates"], newUpdate]}
                                    ctx.updateSection(newSectionData);
                                    setSectionData(newSectionData)
                                    //ctx.addUpdate(newUpdate, sectionData.id);
                                }}
                            />
                        </div>
                    </div>
                </MainContainer>
                <UpdatesContainer>
                    <UpdatesMenu>
                        <div><h3>Updates</h3></div>
                        <div>
                            {/* <button>Filter</button> */}
                            <AddUpdateComponent 
                            title={"Add Update"}
                            saveText={"Save"}
                            userName={userName}
                            stages={stages}
                            description={"Add Update...."}
                            onSave={({ stage, content }) => {
                                const newUpdate = cleanUpdateModel({
                                    "sectionId": "",
                                    "stage": stage,
                                    "type": "default",
                                    "status": "not started",
                                    "author": ctrctx.user.displayName,
                                    "authorId": ctrctx.user.id,
                                    "date": Date.now(),
                                    "content": content,
                                    "reactions": [
                                    ]
                                });
                               
                                const newSectionData = {...sectionData, "updates":[...sectionData["updates"], newUpdate]}
                                ctx.updateSection(newSectionData);
                                setSectionData(newSectionData)
                                //ctx.addUpdate(newUpdate, sectionData.id);
                            }}
                            />
                        </div>
                    </UpdatesMenu>
                    <UpdatesList>
                        {sectionData && ("updates" in sectionData) && sectionData["updates"].sort((a,b)=>b.date-a.date).map((updateData) => {
                            return <UpdateBox
                                id={updateData.id}
                                updateData={updateData}
                                userName={userName}
                                isSelector={selectorOpen==updateData.id}
                                updateUpdate={(newUpdateData)=>{
                                    let newUpdates = sectionData["updates"];
                                    let u = newUpdates.findIndex((up)=>up.id==newUpdateData.id);
                                    newUpdates[u]=newUpdateData;
                                    let newSectionData = {...sectionData,  "updates":newUpdates}
                                
                                    ctx.updateSection(newSectionData);
                                    setSectionData(newSectionData);
                                    //ctx.updateUpdate(newUpdateData, sectionData.id)

                                }}
                                setSelectorOpen={(updateData)=>{
                                     console.log(updateData);
                                    if(updateData.id==selectorOpen)setSelectorOpen(null);
                                    else setSelectorOpen(updateData.id);
                                } }
                                deleteUpdate={(updateData)=>{
                                    if (window.confirm("Are you sure? This action cannot be reversed")) {
                                        console.log(updateData);
                                        //if(sectionData["updates"].find(v=>v.id==updateData.id).authorId==ctrctx.user.id){
                                           // console.log("good")
                                            let newSectionData = {...sectionData,  "updates":sectionData["updates"].filter(u=>u.id!=updateData.id)}
                                            console.log(newSectionData);
                                            ctx.updateSection(newSectionData);
                                            setSectionData(newSectionData);
                                       // }
                                        
                                       // ctx.deleteUpdate(updateData, sectionData.id);
                                    }else{
                                        return;
                                    }
                                }}
                            />

                        })}
                    </UpdatesList>
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

const DescriptionHeader= styled.div`
font-family: Baloo 2;
font-size: 21px;
font-style: normal;
font-weight: 400;
line-height: 33px;
letter-spacing: 0em;
text-align: center;

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
    padding:50px;
    justify-content:space-between;

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



const UpdatesContainer = styled.div`
background-color:#F8F8F8;
margin: 15px;
width:350px;
`

const UpdatesList = styled.div`
overflow:scroll;
height:87%;
`



// const TableSection = styled.section`
//     table {
//         width:100%;
//     }
//     thead {
//         background-color: var(--brand-regular);
//         border-radius: 0.4rem;
//     }
//     th,td {
//         grid-column: span 2;
//         padding: 1rem;
//         text-align: left;
//     }
//     th {
//         font-size: 1.5rem;
//     }
//     td {
//         font-size: 1rem;
//     }
//     span {
//         margin-left: 1rem;
//     }
// `;
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

 //    <UpdateBox key={updateData["id"]}>
                    //     <div className={"topbar"}>
                    //         <div className={"author"}>{updateData["author"]}
                    //             <span className={"stage"}> &#8226; {updateData["stage"]}</span>
                    //         </div>
                    //         <div className={"date"}>
                    //             {updateData["date"]}
                    //         </div>
                    //     </div>
                    //     <p>
                    //     {updateData["content"]}
                    //     </p>
                    //     <SlackCounter 
                    //     user={userName}
                    //     counters={updateData["reactions"]}
                    //     />
                    //     {/* <SlackSelector />  */}
                    // </UpdateBox>