
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import Tooltip from "@material-ui/core/Tooltip";
import { committeeIcons, quickLinks } from "data/dummydata";
import {
  LargeBodyText,
  PageSubtitleText,
  PageTitleText,
  ProjectCardText,
  ProjectCardTextWhite,
  SectionHeaderText,
  SmallestBodyTextBlack,
  SmallestBodyTextWhite,
} from "styles/sharedStyles";

/*
TODO add quick links to db and way to parse link
*/





const QuickLinksSection = () =>{
    return (
        <QuickPadding >
         <PageSubtitleText>Quick Links</PageSubtitleText>
        <Row>
          {quickLinks.map((data) => (
            <Tooltip title={data.tip}>
              <a href={data.url} target="_blank">
                <LinkBox>
                  <img src={data.icon} alt={data.title} />
                </LinkBox>
              </a>
            </Tooltip>
          ))}
        </Row>
    </QuickPadding>);
}

export default QuickLinksSection;


const QuickPadding = styled.div`
  padding:20px 0px;
`;


const Row = styled.div`
  display: flex;
  gap: 20px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;



const LinkBox = styled.div`
  height: 60px;
  min-width: 60px;
  img {
    height: 54px;
    width: 60px;
    margin: 3px;
  }
`;
