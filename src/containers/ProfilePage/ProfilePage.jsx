import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context';
import { EmphasizedSmallBodyText, LargeBodyText, PageSubtitleText, PageTitleText, ProjectCardText, ProjectCardTextWhite, SectionHeaderText, SmallestBodyTextBlack, SmallestBodyTextWhite } from "styles/sharedStyles";
import { useMediaQuery } from 'react-responsive';
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import UpdatesSection from 'components/UpdatesSection/UpdatesSection';
import AtAGlanceModule from "components/AtAGlanceModule";
import ProjectBox from "components/projectBox";
import { useHistory } from "react-router-dom";
import CommitteeBox from "components/committeeBox";
//https://brianmin.tech/react-edit-text/
export default function ProfilePage() {
  const ctrctx = useContext(ControlContext);
  

  let history = useHistory();
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })
 // const committeeData = Object.values(ctrctx.getCommitteesData()).filter((v)=>v.id in data.projects);

  const [profileData, setProfileData] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  const [committeeData, setCommitteeData] = useState([]);

  useEffect(() => {
    const data = ctrctx.getMemberData();//"conreshan@gmail.com"
    let _p = ctrctx.getProjectsData();
    let  _projectsData = (_p && data)?Object.values(_p).filter((v)=>v.id in data.projects):[];
    setProfileData(data);
    const committeeData = (data&& data.committees)?Object.values(ctrctx.getCommitteesData()).filter((v)=>v.id in data.committees):[];
    setProjectsData(_projectsData);
  }, []);


  const LeftComponent = ()=>{
    return (
    <OverviewSection  isMobile={isMobile}>
      <PageSubtitleText>BETTERWORLD</PageSubtitleText>
      <PageTitleText>My Work</PageTitleText>
      <LargeBodyText>{profileData && profileData["notifications"] && `Hi ${ctrctx.user.displayName}! You’ve got ${profileData["notifications"].length} new notification...`}</LargeBodyText>
    <P5/>
    <SectionHeaderText>My Projects</SectionHeaderText>
    <Row>
     {
       projectsData?.sort((a,b)=>a["end_date"]>b["end_date"]?-1:1).map((project)=>{
        return( 
       <ProjectBox
       project={project}
       onClick={()=>history.push(`/projects/${project.id}`)}
       />
         )
       })
     }
   </Row>
    <SectionHeaderText>My Committees</SectionHeaderText>
    <Row>
     {
       committeeData?.sort((a,b)=>a["end_date"]>b["end_date"]?-1:1).map((committee)=>{
        return( 
       <CommitteeBox
        committee={committee}
        onClick={()=>history.push(`/committees/${committee.id}`)}
       />
         )
       })
     }
   </Row>
    </OverviewSection>
    
    )
  }
  const RightComponent = ()=>{
    return ( <div >
              {/* <AtAGlanceModule/> */}
               <UpdatesSection/>
      </div>)
  }


  return (
    <ResponsiveSplitScreen
    currentPage={'profile'}
    LeftComponent={LeftComponent}
    RightComponent={RightComponent}
/>
  )
}


const P5 = styled.div`
height:20px;
`
 const OverviewSection = styled.div`

`

const UpdatesSectionStyle = styled.div`

`


const Row = styled.div`
  display: flex;
  gap: 20px;
  overflow: scroll;
  margin-bottom:20px;
`
