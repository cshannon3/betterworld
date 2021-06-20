
import React from 'react';
import { Line } from 'react-chartjs-2';

import styled from "styled-components";
import * as styles from 'styles/sharedStyles';
//goal of at a glance: people photos, resource # and repsonisbilities

//TODO Get actual data
const data = {
  labels: ['1', '2','3','4','1', '2','3','4','1', '2','3','4'],
  datasets: [
    {
      label: '$',
      data: [5300, 5284, 5384, 5372, 4872, 4842, 4790,5035,4922,4862, 12354.84,5354.84,    ],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};


export default function BudgetModule({committeeData}) {
   return ( <BudgetBox>
        <styles.GreyTitleBar>Budget</styles.GreyTitleBar>
        <div> {/*Left side of budget box*/}
          <div> Income/Expenses</div>
          <LineChart/>
          <div> Recent Activity</div>
        </div>
        <div> {/*right side of budget box*/}
         
        </div>
    </BudgetBox>);
}

const BudgetBox = styled.div`
 // display: grid;
  //grid-area: 3 / 1 / span 1 / span 2;
  margin-right:30px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`



const LineChart = () => (
  <>
    <div className='header'>
      <h1 className='title'>Current Balance: $2,217.84 </h1>
      
    </div>
    <Line data={data} options={options} />
  </>
);


 /* <p>Distribution of spending</p>
          <div>pie chart</div>
          <ul>
            <li>category</li>
            <li>category</li>
            <li>category</li>
            <li>category</li>
          </ul> */