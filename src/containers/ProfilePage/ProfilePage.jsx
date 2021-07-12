import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import LeftPanel from "components/Panels/LeftPanel"
import ControlContext from '../../shared/control-context';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import {committeeIcons} from "data/dummydata"
import { NavLink } from 'react-router-dom'
import { EmphasizedSmallBodyText, LargeBodyText, PageSubtitleText, PageTitleText, ProjectCardText, ProjectCardTextWhite, SectionHeaderText, SmallestBodyTextBlack, SmallestBodyTextWhite } from "styles/sharedStyles";
import { useMediaQuery } from 'react-responsive';
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import UpdatesSection from 'components/UpdatesSection/UpdatesSection';
import AtAGlanceModule from "components/AtAGlanceModule";


export default function ProfilePage() {
  const ctrctx = useContext(ControlContext);

  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })
  
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const data = ctrctx.getMemberData("conreshan@gmail.com");
    setProfileData(data);
  }, []);

  const LeftComponent = ()=>{
    return (
    <OverviewSection  isMobile={isMobile}>
      <PageSubtitleText>BETTERWORLD</PageSubtitleText>
      <PageTitleText>My Work</PageTitleText>
      <LargeBodyText>{profileData && profileData["notifications"] && `Hi ${ctrctx.user.displayName}! You’ve got ${profileData["notifications"].length} new notification...`}</LargeBodyText>
    <SectionHeaderText>My Projects</SectionHeaderText>
    <div>Project</div>
    <SectionHeaderText>My Committees</SectionHeaderText>
  <div>Committee</div>
    </OverviewSection>)
  }
  const RightComponent = ()=>{
    return ( <div >
              <AtAGlanceModule/>
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


 const OverviewSection = styled.div`

`

const UpdatesSectionStyle = styled.div`

`