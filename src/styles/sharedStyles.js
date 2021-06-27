
import styled from "styled-components"
import "styles/globals.css";


export const PageTitleText = styled.div`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 94px;
  letter-spacing: -0.02em;
  color: #0CC998;
`;

export const ProjectCardText = styled.div`
    font-family: 'Baloo 2';
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 86.2%;
    ${({ isArchived }) =>
      isArchived ? `
      color:#FFFFFF;
      `: `
      color:#0CC998
      `
    }
`;
export const ProjectCardTextWhite = styled(ProjectCardText)`
      color:#FFFFFF;
`;
export const SectionHeaderText = styled.div`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 800;
  font-size: 26px;
  line-height: 41px;
  color: #000000;
`;


export const RegularSidebarText = styled.div`
font-family: 'Baloo 2';
font-style: normal;
font-weight: 800;
font-size: 19px;
line-height: 30px;
text-transform: uppercase;
color: #000000;
`;
export const ActiveSidebarText = styled(RegularSidebarText)`
  font-weight: 800;
`;

export const ComponentBoxTitleText = styled.div`
font-family:'Baloo 2';
font-style: normal;
font-weight: 800;
font-size: 22px;
color: #000000;
`;

export const SmallButtonText = styled.div`
font-family:'Baloo 2';
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 22px;
letter-spacing: 0.05em;
text-transform: uppercase;
color: #000000;

`;

export const LadderTitleText = styled.div`
font-family:'Baloo 2';
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 22px;
letter-spacing: -0.02em;
text-transform: uppercase;
color: #000000;
`;

export const LargeNumberText = styled.div`
font-family:'Baloo 2';
font-style: normal;
font-weight: 600;
font-size: 38px;
line-height: 60px;
color: #000000;
`;

export const LargeLadderText = styled.div`
font-family:'Baloo 2';
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 20px;
letter-spacing: -0.02em;
text-transform: uppercase;
color: #000000;
`;





export const RegularBodyText = styled.p`
font-family: Helvetica Neue;
font-style: normal;
font-weight: normal;
font-size: 16px;
color: #000000;
`;

export const LargeBodyText =  styled(RegularBodyText)`
    font-weight: 200;
    font-size: 22px;
`;
export const EmphasizedRegularBodyText = styled(RegularBodyText)`
  font-weight: bold;
`;
export const SmallestBodyText = styled(RegularBodyText)`
  font-weight: 300;
  font-size: 14px;
  span{
    font-weight: bold;
  }
`;
export const SmallestBodyTextWhite = styled(SmallestBodyText)`
  color:white;
`;
export const SmallestBodyTextBlack = styled(SmallestBodyText)`
  color:black;
`;



export const EmphasizedSmallBodyText = styled(RegularBodyText)`
  font-weight: bold;
  font-size: 14px;
`;

export const TaskText = styled.div`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: #C4C4C4;
`;

export const NotificationsText = styled.div`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #C4C4C4;
`;






export const PageSubtitleText = styled.div`
font-family:'Baloo 2';
font-style: normal;
font-weight: 800;
font-size: 16px;
line-height: 25px;
color: #000000;
`;











export const GreyTitleBar = styled.div`
height:38px;
background: #E3E7EA;
border-radius: 3px 3px 0px 0px;
display: flex;
align-items: center;
font-family:'Baloo 2';
font-style: normal;
font-weight: 800;
font-size: 21px;
line-height: 33px;
letter-spacing: -0.02em;
padding-left:5px;
color: #757575;
`
export const GreenTitleBar = styled.div`
height:38px;
background:#0CC998;
border-radius: 3px 3px 0px 0px;
display: flex;
align-items: center;
font-family:'Baloo 2';
font-style: normal;
font-weight: 800;
font-size: 21px;
line-height: 33px;
letter-spacing: -0.02em;
padding-left:5px;
color: #FFFFFF;
`
const CirclePhoto = styled.div `
width: 52px;
height: 52px;
filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
border-radius: 50%;
background-color: pink;
`
const SmallCirclePhoto = styled.div `
width: 25px;
height: 25px;
filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
border-radius: 50%;
background-color: pink;
`
const GreenButton = styled.div `
  height:100px;
  width:100%;
  font-family:'Baloo 2';
  font-style: normal;
  font-weight: bold;
  display:flex;
  justify-content: flex-end;
  align-items:center;
`

