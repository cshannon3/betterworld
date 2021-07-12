
import React from 'react';
import styled from "styled-components";
import * as styles from 'styles/sharedStyles';
//goal of at a glance: people photos, resource # and repsonisbilities

export default function ModuleWrapper({Component}) {
   return ( <BudgetBox>
        <styles.GreyTitleBar>Module</styles.GreyTitleBar>
        <div> {/*Left side of budget box*/}
          <div> Income/Expenses</div>
       
          <div> Recent Activity</div>
        </div>
        <div> {/*right side of budget box*/}
         
        </div>
    </BudgetBox>);
}

const BudgetBox = styled.div`
  margin-right:30px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`


