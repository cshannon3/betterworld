import { useState, useContext, useEffect } from 'react';
import styled from "styled-components"
import Modal from 'styled-react-modal'
import * as styles from 'styles/sharedStyles';
import StagesComponent from "./Modals/LadderModal/StagesComponent";
import ProjectContext from "./ProjectContext";
import ControlContext from 'shared/control-context';
import { SlackSelector, SlackCounter } from '@charkour/react-reactions';
import { cleanUpdateModel } from 'data_models/updatemodel';
import UpdatesSection from 'components/UpdatesSection/UpdatesSection';
import AddUpdateComponent from 'components/UpdatesSection/AddUpdateComponent';
import * as fb from 'shared/firebase';
import { useMediaQuery } from "react-responsive";
import LeftPanel from "components/Panels/LeftPanel";
import { Link, NavLink , useParams} from "react-router-dom";


const ProjectSectionPage = () =>{

    const ctrctx = useContext(ControlContext);
 
    
    const urlParts = window.location.href.split("/");
    const projectId = urlParts[urlParts.length - 2];
    const sectionId = urlParts[urlParts.length - 1];
    console.log(projectId);
    const [projectData, setProjectData] = useState(
      ctrctx.getProjectData(projectId)
    );
    const [selectorOpen, setSelectorOpen] = useState(null);
    

    const data = projectData["sections"]?.filter((s)=>s.id==sectionId)[0];

    const InnerComponent = () =>{

        if (!ctrctx.user) return null;
        const userName = ctrctx.user["displayName"];
       
        const stages = data["stages"].map((st)=>st.name);
        //const projectId = ctx.projectId;

       // const sectionId = data.id;
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
                            <StagesComponent data={data["stages"].map((dd)=>{ return {...dd, "contributors": [...data["contributors"].filter((c)=>c.projects[projectId].roles.filter((r)=>r.stageId===dd.id).length)]} })} /> 
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
                                   // ctx.updateSection(newSectionData);
                                   // setLadderData(newSectionData);
                                }}
                            />
                        </div>
                    </div>
                </MainContainer>
                <UpdatesStyle>
                        <UpdatesSection
                            updates={data["updates"]}
                            stages={stages}
                            user={ctrctx.user}
                            projectId={projectId}
                            sectionId={sectionId}
                            selectorOpen={selectorOpen}
                            updateUpdates={(newUpdates)=>{
                                const newSectionData = {...data,  "updates":newUpdates}
                               // ctx.updateSection(newSectionData);
                                //setLadderData(newSectionData);
                            }}
                            setSelectorOpen={(id)=>{
                                if(selectorOpen!=id)setSelectorOpen(id);
                                else setSelectorOpen(null);
                               
                            }}
                        >
                        </UpdatesSection>
                  </UpdatesStyle>

                {/* </UpdatesContainer> */}
            </WidgetContainer>
        );
        return null;
    }
    if (!data) return (null)
    return (
        <ProjectContext.Provider
        value={{
          projectId: projectId,
          data: projectData,
          updateSection: (sectionData) => {
            let sections = [...projectData["sections"]];
            let s = sections.findIndex((sec) => sec.id == sectionData.id);
            sections[s] = sectionData;
            const newData = { ...projectData, sections: sections };
            fb.updateProject(newData.id, newData);
            setProjectData(newData);
          },
        }}
      >
        <Row>
          <LeftPanel />
          <Con>
          <styles.Breadcrumbs>
          <NavLink to='/'><styles.BreadcrumbText>CMU AGAINST ICE</styles.BreadcrumbText></NavLink>
          <styles.Arrow> &gt; </styles.Arrow>
          <NavLink to='/projects'><styles.BreadcrumbText>Projects</styles.BreadcrumbText></NavLink>
          <styles.Arrow> &gt; </styles.Arrow>
          <NavLink to={`/projects/${projectData.id}`}><styles.BreadcrumbText>{projectData.name}</styles.BreadcrumbText></NavLink>
          <styles.Arrow> &gt; </styles.Arrow>
          <NavLink to={`/projects/${projectData.id}/${sectionId}`}><styles.BreadcrumbText>{data.name}</styles.BreadcrumbText></NavLink>
     
      </styles.Breadcrumbs>
          
                <div>{data && data["name"]}</div>
                
            <InnerComponent />
    </Con>
        </Row>
      </ProjectContext.Provider>
    );

};


const Con = styled.div`
  width: 90%;
  padding: 5vh 50px 0vh 40px;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  width: 100%;
`;

const UpdatesStyle= styled.div`
  width:50vw;
`;
const WidgetContainer = styled.div`
width:100%;
display:flex;
`

const DescriptionHeader= styled.div`
font-family: 'Baloo 2';
font-size: 21px;
font-style: normal;
font-weight: 600;
line-height: 33px;
letter-spacing: 0em;
`



const MainContainer = styled.div`

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


export default ProjectSectionPage;


// const CloseBox = styled.div`
//     cursor:pointer;
// `;
// const GreenTitleBar = styled(styles.GreenTitleBar)`
//     display:flex;
//     justify-content: space-between;
//     padding-right:20px;
//     >div{
//         display:flex;
//     }
//     border-radius: 10px 10px 0px 0px;
// `