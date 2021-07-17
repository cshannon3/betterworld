import { useState, useContext, useEffect } from 'react';
import styled from "styled-components"
import Modal from 'styled-react-modal'
import * as styles from '../../../../styles/sharedStyles';
import StagesComponent from "./StagesComponent";
import ProjectContext from '../../ProjectContext';
import ControlContext from 'shared/control-context';
import { SlackSelector, SlackCounter } from '@charkour/react-reactions';
import { cleanUpdateModel } from 'data_models/updatemodel';
import UpdatesSection from 'components/UpdatesSection/UpdatesSection';
import AddUpdateComponent from 'components/UpdatesSection/AddUpdateComponent';
import * as fb from 'shared/firebase';



const StyledModal = Modal.styled`
  width: 90vw;
  height: 85vh;
  background-color:white;
  border-radius: 30px;
`
const LadderModal = ({ data, setLadderData, isOpen, onRequestClose }) =>{

    const ctrctx = useContext(ControlContext);
    const ctx = useContext(ProjectContext);
  
    const [selectorOpen, setSelectorOpen] = useState(null);
    


    const InnerComponent = () =>{

        if (!isOpen || !ctrctx.user) return null;
        const userName = ctrctx.user["displayName"];
        const stages = data["stages"].map((st)=>st.name);
        const projectId = ctx.projectId;
        const sectionId = data.id;
        // TODO connect to users    
        return (
            <WidgetContainer>
                <MainContainer>
                    <div>
                       <div>
                        <div className="header">
                            <div className="description">
                            <styles.PageSubtitleText>Description</styles.PageSubtitleText>
                             
                            </div>
                            <styles.RegularBodyText >
                                ---
                            </styles.RegularBodyText>

                        </div>
                         <div>
                             <styles.RegularBodyText style={{padding:"20px 20px 20px 0px"}}>  {data["description"]}</styles.RegularBodyText>
                        </div>
                        </div>
                        <div className="tasks">
                            <StagesComponent data={data["stages"].map((dd)=>{ return {...dd, "contributors": [...data["contributors"].filter((c)=>c.projects[ctx.data.id].roles.filter((r)=>r.stageId===dd.id).length)]} })} /> 
                        </div>
                        <div className="buttons" >
                            
                            <AddUpdateComponent
                                type={"request help"}
                                style={{color: "#0595A5"}}
                                stages={stages}
                                user={ctrctx.user}
                                onSave={(newUpdate) => {
                                    const _newUpdate = {...newUpdate, "projectId":projectId, "committeeId":null, "sectionId":sectionId};
                                    // todo add new update to DB
                                    fb.createUpdate(_newUpdate);
                                    const newSectionData = {...data, "updates":[...data["updates"], _newUpdate]}
                                    ctx.updateSection(newSectionData);
                                    setLadderData(newSectionData);
                                }}
                            />
                        </div>
                    </div>
                </MainContainer>
                        <UpdatesSection
                            updates={data["updates"]}
                            stages={stages}
                            user={ctrctx.user}
                            projectId={projectId}
                            sectionId={sectionId}
                            selectorOpen={selectorOpen}
                            updateUpdates={(newUpdates)=>{
                                const newSectionData = {...data,  "updates":newUpdates}
                                ctx.updateSection(newSectionData);
                                setLadderData(newSectionData);
                            }}
                            setSelectorOpen={(id)=>{
                                if(selectorOpen!=id)setSelectorOpen(id);
                                else setSelectorOpen(null);
                               
                            }}
                        >
                        </UpdatesSection>
                    

                {/* </UpdatesContainer> */}
            </WidgetContainer>
        );
        return null;
    }
    if (!data) return (null)
    return (
        <StyledModal
            key={data["id"]}
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
border-radius: 10px;

`

const DescriptionHeader= styled.div`
font-family: 'Baloo 2';
font-size: 21px;
font-style: normal;
font-weight: 600;
line-height: 33px;
letter-spacing: 0em;
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
    border-radius: 10px 10px 0px 0px;
`


const MainContainer = styled.div`
background-color: white;
width:500px;
flex-grow:1;
margin:30px;

.header{
    height:20%;
    display:flex;
    padding-top:15px;
    justify-content:space-between;
    .date{
        color:green;
    }
}

.descriptionText{
    font-size:16px;
    padding: 10px 0px 60px 0px;
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


/* <AddUpdateComponent
                                type={"offer to help"}
                                style={{color: "#0CC998"}}
                                stages={stages}
                                user={ctrctx.user}
                                onSave={(newUpdate) => {
                                    //const newSectionData = {...sectionData, "updates":[...sectionData["updates"], newUpdate]}
                                    
                                    const newSectionData = {...data, "updates":[...data["updates"], newUpdate]}
                                    ctx.updateSection(newSectionData);
                                    setLadderData(newSectionData);
                                    //setSectionData(newSectionData)
                                }}
                            /> */
    //const [sectionData, setSectionData] = useState(data);
   
   
    // useEffect(() => {
    //     if(sectionData ==null){
    //         //console.log("SECT");
    //         setSectionData(data);
    //     }
    //   });
    //  console.log("sectionData");
       // console.log(sectionData);
      

// const UpdatesMenu = styled.div`
//     display:flex;
//     justify-content: space-between;
//     padding:20px 0px;
//     >div{
//         display:flex;
//     }
//     h3{
//         font-family: Baloo 2;
//         font-style: normal;
//         font-weight: 800;
//         font-size: 21px;
//         line-height: 33px;
//         display: flex;
//         align-items: center;
//     }
// `



// const UpdatesContainer = styled.div`
// background-color:#F8F8F8;
// margin: 15px;
// width:350px;
// `

// const UpdatesList = styled.div`
// overflow:scroll;
// height:87%;
// `
/*const TableSection = styled.section`
    table {
        width:100%;
    }
    thead {
        background-color: var(--brand-regular);
        border-radius: 0.4rem;
    }
    th,td {
        grid-column: span 2;
    //    padding: 1rem;
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
*/


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
                    //     {/* <SlackSelector />  */
                    // </UpdateBox>
