// import CommitteeContext from '../../CommitteeContext';

// import {useContext} from 'react';
import styled from "styled-components";
import AddUpdateComponent from "components/UpdatesSection/AddUpdateComponent";
import {
    Breadcrumbs,
    BreadcrumbText,
    Arrow
  } from "styles/sharedStyles";
import { Link, NavLink } from "react-router-dom";
export default function CommitteeInfoModule({ committeeData, user, onSave }) {
  return (
    <CommitteeTitleBox>
      <div>
        <Breadcrumbs>
          <NavLink to="/">
            <BreadcrumbText>CMU AGAINST ICE</BreadcrumbText>
          </NavLink>
          <Arrow> &gt; </Arrow>
          <NavLink to="/committees">
            <BreadcrumbText>Committees</BreadcrumbText>
          </NavLink>
          <Arrow> &gt; </Arrow>
          <NavLink to={`/committees/${committeeData.name}`}>
            <BreadcrumbText>{committeeData.name}</BreadcrumbText>
          </NavLink>
        </Breadcrumbs>
        <CommitteesTitle>{committeeData.name}</CommitteesTitle>

        <DescriptionText>{committeeData.description}</DescriptionText>
      </div>

      <div className="bottomBar">
        <div>
          <CommitteesSubtitle>
            Point Person: {committeeData.pointPerson.displayName}
          </CommitteesSubtitle>
        </div>
        <div>
          <CommitteesSubtitle>Interested in this Committee?</CommitteesSubtitle>
          <AddUpdateComponent
            type={"offer to help"}
            user={user}
            onSave={(newUpdate) => {
              onSave(newUpdate);
            }}
          />
        </div>
      </div>
    </CommitteeTitleBox>
  );
}

const CommitteesSubtitle = styled.h2`
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: #000000;
`;
const DescriptionText = styled.p`
  font-family: "Helvetica";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  padding-top: 50px;
`;

const CommitteesTitle = styled.h2`
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 70px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #0cc998;
`;

const CommitteeTitleBox = styled.div`
  //display: grid;
  //grid-area: 1 / 1 / span 2 / span 2;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 50px 0px 0px;
  .bottomBar {
    display: flex;
    justify-content: space-between;
    height: 90px;
  }
`;


//   &:nth-child(1) > div{
//       display:flex;
//       justify-content: space-between;
//   }
// const newSectionData = {...sectionData, "updates":[...sectionData["updates"], newUpdate]}
// ctx.updateSection(newSectionData);
// setSectionData(newSectionData)
