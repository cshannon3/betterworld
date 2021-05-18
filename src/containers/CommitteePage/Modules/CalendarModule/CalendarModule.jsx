import CommitteeContext from '../../CommitteeContext';

import {useContext} from 'react';
import styled from "styled-components";
import * as styles from 'styles/sharedStyles';
//goal of at a glance: people photos, resource # and repsonisbilities

export default function CalendarModule() {
   return ( <CalendarBox>
        <styles.GreyTitleBar>Calendar</styles.GreyTitleBar>
        <DatesRow>

        
        <div>
          <p>Mon</p>
          <p>1</p>
        </div>
        <div>
          <p>Tues</p>
          <p>2</p>
        </div>
        <div>
          <p>Wed</p>
          <p>3</p>
        </div>
        <div>
          <p>Thurs</p>
          <p>4</p>
        </div>
        <div>
          <p>Fri</p>
          <p>5</p>
        </div>
        <div>
          <p>Sat</p>
          <p>6</p>
        </div>
        <div>
          <p>Sun</p>
          <p>7</p>
        </div>
        </DatesRow>
        <h3>Next event: Committee Meeting 5/2 @ 6pm</h3>
    </CalendarBox>);
}

const DatesRow = styled.div`
  display:flex;
`;
const CalendarBox = styled.div`
  display: grid;
  grid-area: 2 / 3 / span 1 / span 2;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`
