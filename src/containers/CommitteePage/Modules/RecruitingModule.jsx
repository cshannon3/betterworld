import React from 'react';

import styled from "styled-components";
import * as styles from 'styles/sharedStyles';
//goal of at a glance: people photos, resource # and repsonisbilities


export default function RecruitingModule({committeeData}) {
   return ( <RecruitingBox>
        <styles.GreyTitleBar>New Members</styles.GreyTitleBar>
        <div> 
          {/*TODO styling for new member*/}
          <div> Member 1</div>
          <div> Recent Activity</div>
        </div>
        <div> 
         
        </div>
    </RecruitingBox>);
}


const RecruitingBox = styled.div`
  height:50%;
  margin-right:30px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`
