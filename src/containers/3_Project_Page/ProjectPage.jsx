import React, { useContext, useState, useEffect, useRef } from "react"
import styled from "styled-components"
import ReactModal from 'react-modal'

import LeftPanel from "containers/Panels/LeftPanel";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import {
    LadderModule,
    ProjectInfoModule,
    AtAGlanceModule,
    UpcomingEventsModule,
    //HelpWantedModule,

} from './Modules/modules'
import ProjectContext from "./ProjectContext";
//import dummyData from './DummyData';
import ControlContext from "../../shared/control-context";
import { updateProject } from "shared/firebase";


export default function ProjectPage() {
    const appCtx = useContext(ControlContext);
    const urlParts = window.location.href.split("/")
    const projectId = urlParts[urlParts.length - 1]
    console.log(projectId);
    const [projectData, setProjectData] = useState(appCtx.getProjectData(projectId));

    console.log(projectData);
    //dummyData["Immigration Justice Zine"]
    return (
        <ProjectContext.Provider
            value={{
                data: projectData,

                updateSection: (sectionData) => {
                    let sections = [...projectData["sections"]];
                    let s = sections.findIndex((sec) => sec.id == sectionData.Id);
                    sections[s] = sectionData;
                    const newData = { ...projectData, "sections": sections };
                    updateProject(newData.id, newData);
                    setProjectData(newData);
                },
            }}
        >
            <Row>
                <LeftPanel />
                {

                    projectData["isArchived"] ?
                        <Con>
                            <h1>{projectData.name} (Archived)</h1>

                            <Flex>
                                <GalleryStyle>
                                    <Slideshow 
                                    images={projectData["artifact_images"]??[]}
                                    />
                                </GalleryStyle>
                                <AtAG>
                                    <h1>Hello</h1>
                                </AtAG>
                            </Flex>
                            <div>
                                <Flex>
                                    <OverviewTextStyle>
                                        <h1>Description</h1>
                                        <p>{projectData["description"]??"No description"}</p>
                                    </OverviewTextStyle>
                                    <OverviewTextStyle>
                                        <h1>Outcome</h1>
                                        <p>{projectData["outcome"]??"No Outcome"}</p>
                                    </OverviewTextStyle>

                                </Flex>

                            </div>

                        </Con>
                        :
                        <ContentContainer>
                            <ProjectInfoModule />
                            <AtAGlanceModule />
                            <LadderModule />
                        </ContentContainer>
                }
            </Row>
        </ProjectContext.Provider>
    )
}

const slideImages = [
    'https://images.unsplash.com/photo-1623141629222-287c9e385a40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format',
    'https://firebasestorage.googleapis.com/v0/b/betterworld2.appspot.com/o/images%2FScreen%20Shot%202021-06-06%20at%2011.30.40%20PM.png?alt=media&token=bc853697-074f-4a2a-ad2d-f8e9060f91d0',
    'https://unsplash.com/photos/lzM4YodDIW8'
];



const Slideshow = ({images}) => {
    const slideRef = useRef();
    return (
        <Slide ref={slideRef} easing="ease" style={{ 'width': "90%" }}>
            {/* <SlideImg src={"https://images.unsplash.com/photo-1623141629222-287c9e385a40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"}/> */}
           {images.map((i)=>{
               return <EachSlide style={{ 'backgroundImage': `url(${i.url})`, 'width': "300px", 'height': "300px" }}>
               <div >
                   <span>Slide 3</span>
               </div>
           </EachSlide>
           })}
           
           
           
            {/* <EachSlide style={{ 'backgroundImage': `url(${slideImages[1]})`, 'width': "300px", 'height': "300px" }}>
                <div >
                    <span>Slide 1</span>
                </div>
            </EachSlide> */}
        </Slide>
    )
};

const Flex = styled.div`
    display:flex;
    width:100%;
    background: green;

`;
const AtAG = styled.div`
    background: pink;
    width:100%;
`;
const GalleryStyle = styled.div`
    background: grey;
    width:50%;
`;

const OverviewTextStyle = styled.div`
    background: orange;
    width:100%;
`;

const Con = styled.div`
    width:90%;
    padding: 5vh 50px 3vh 40px ;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
`;
const EachSlide = styled.div`

height: 250px;
width:200px;
background:pink;
background-size: cover;
 div {
    display: flex;
    background: 'teal'
    align-items: center;
    justify-content: center;
    background-size: cover;
    height: 150px;
  }
  
  span {
    padding: 20px;
    font-size: 20px;
    background: #efefef;
    text-align: center;
  }
`;

const GallaryBox = styled.div`
  display: grid;
  grid-area: 1 / 1 / span 2 / span 2;
  padding: 0px 50px 0px 0px;
  &:nth-child(1) > div{
      display:flex;
      justify-content: space-between;
  }

 `



const Row = styled.div`
  display: flex;
  width: 100%;
`
const ContentContainer = styled.div`
  display: grid;
  width: 100%;
  height:100%;
  padding: 5vh 50px 3vh 40px ;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 10px;
  
`


    // useEffect(() => {
    //     if(projectData ==null){
    //         let da = appCtx.getProjectData(projectId);
    //        if(da!=null){
    //            console.log("Set")
    //            setProjectData(da);
    //        }
    //     }
    // });
// addSectionToProject: () =>{},
            // editSection:()=>{},
            // removeSectionFromProject:()=>{},
            // addMemberToSection: () =>{},
            // removeMemberFromSection: () =>{},
            // getStageData: ()=>{},

            // addMemberToStage: ()=>{},
            // removeMemberFromStage: ()=>{ },

            // addHelpRequestToStage:()=>{},
            // handleHelpRequest:()=>{},

            // addResourceToStage: ()=>{},
            // updateStageStatus: () =>{},

  // addUpdate: (updateData, sectionId)=>  {

            //     let sections = [...projectData["sections"]];
            //     let s = sections.findIndex((sec)=>sec.id==sectionId);
            //     sections[s] = {...sections[s],  "updates":[...sections[s]["updates"], updateData]}
            //     console.log(s);
            //     const newData = {...projectData, "sections":sections};
            //     updateProject(newData.id, newData);
            //     setProjectData(newData);
            // },
            // updateUpdate: (updateData, sectionId)=>  {
            //     let sections = [...projectData["sections"]];
            //     let s = sections.findIndex((sec)=>sec.id==sectionId);
            //     let newUpdates = sections[s]["updates"];
            //     let u = newUpdates.findIndex((up)=>up.id==updateData.id);
            //     newUpdates[u]=updateData;
            //     sections[s] = {...sections[s],  "updates":newUpdates}
            //     const newData = {...projectData, "sections":sections};
            //     updateProject(newData.id, newData);
            //     setProjectData(newData);
            // },

            // deleteUpdate: (updateData, sectionId)=>  {
            //     let sections = [...projectData["sections"]];
            //     let s = sections.findIndex((sec)=>sec.id==sectionId);
            //     console.log(sections[s]);
            //     if(sections[s]["updates"].find(v=>v.id==updateData.id).authorId==appCtx.user.id){
            //         sections[s] = {...sections[s],  "updates":sections[s]["updates"].filter(u=>u.id!=updateData.id)}
            //         const newData = {...projectData, "sections":sections};
            //         updateProject(newData.id, newData);
            //         setProjectData(newData);
            //     }
            // },

            // const MethodsExample = () => {
            //     const slideRef = useRef();

            //     const style = {
            //       textAlign: "center",
            //       background: "teal",
            //       padding: "200px 0",
            //       fontSize: "30px"
            //     };

            //     const properties = {
            //       autoplay: false,
            //       arrows: false
            //     };

            //     const back = () => {
            //       slideRef.current.goBack();
            //     }

            //     const next = () => {
            //       slideRef.current.goNext();
            //     }

            //     const goto = ({ target }) => {
            //       slideRef.current.goTo(parseInt(target.value, 10));
            //     }

            //     return (
            //       <div>
            //         <div>
            //           <Slide ref={slideRef} {...properties} style={{'width':"300px"}}>
            //             <div style={style}>
            //               First Slide
            //             </div>
            //             <div style={style}>
            //               Second Slide
            //             </div>
            //             <div style={style}>
            //               Third Slide
            //             </div>
            //           </Slide>
            //         </div>

            //         <div className="autoplay-buttons">
            //           <button type="button" onClick={back}>Back</button>
            //           <button type="button" onClick={next}>Next</button>
            //           <select onChange={goto}>
            //             <option>--Select--</option>
            //             <option value="0">First</option>
            //             <option value="1">Second</option>
            //             <option value="2">Third</option>
            //           </select>
            //         </div>
            //       </div>
            //     );
            //   };
