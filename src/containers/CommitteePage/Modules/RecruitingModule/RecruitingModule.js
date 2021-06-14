import React from 'react';

import styled from "styled-components";
import * as styles from 'styles/sharedStyles';
//goal of at a glance: people photos, resource # and repsonisbilities


export default function RecruitingModule({committeeData}) {
   return ( <RecruitingBox>
        <styles.GreyTitleBar>Recruiting</styles.GreyTitleBar>
        <div> 
          <div> Income/Expenses</div>
          <div> Recent Activity</div>
        </div>
        <div> 
         
        </div>
    </RecruitingBox>);
}


const RecruitingBox = styled.div`
  display: grid;
  grid-area: 3 / 1 / span 1 / span 2;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`
