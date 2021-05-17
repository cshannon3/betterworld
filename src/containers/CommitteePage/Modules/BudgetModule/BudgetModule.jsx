import ProjectContext from '../../CommitteeContext';
import {useContext} from 'react';
import styled from "styled-components";
import * as styles from '../sharedStyles';
//goal of at a glance: people photos, resource # and repsonisbilities

export default function BudgetModule() {
   return ( <BudgetBox>
        <styles.GreyTitleBar>Budget</styles.GreyTitleBar>
        <div> {/*Left side of budget box*/}
          <div> Income/Expenses</div>
          <div> Graph</div>
          <div> Recent Activity</div>
        </div>
        <div> {/*right side of budget box*/}
          <p>Distribution of spending</p>
          <div>pie chart</div>
          <ul>
            <li>category</li>
            <li>category</li>
            <li>category</li>
            <li>category</li>
          </ul>
        </div>
    </BudgetBox>);
}

const BudgetBox = styled.div`
  {/*display: grid;
  grid-area: 1 / 3 / span 1 / span 2;*/}
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`
