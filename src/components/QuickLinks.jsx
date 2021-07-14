
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
import JitsiIcon from "assets/Landing/jitsi.png";
import DriveIcon from "assets/Landing/google-drive.png";
import DocIcon from "assets/Landing/google-docs.png";
import InstaIcon from "assets/Landing/insta.png";
import FBIcon from "assets/Landing/fb.png";
import TwitterIcon from "assets/Landing/twitter.png";
import FigmaIcon from "assets/Landing/figma.png";
import GeneralLinkIcon from "assets/Landing/link.png";


import ReactModal from 'react-modal'

/*
TODO add quick links to db and way to parse link
*/



const getIconType = url => {

  if(url.includes("meet.jit.si")) return JitsiIcon;
  if(url.includes("drive.google.com")) return DriveIcon;
  if(url.includes("docs.google.com")) return DocIcon;
  if(url.includes("www.instagram.com")) return InstaIcon;
  if(url.includes("www.facebook.com")) return FBIcon;
  if(url.includes("www.twitter.com")) return TwitterIcon;
  else return GeneralLinkIcon;
  // if (type === "googleSheet") return sheet;
  // if (type === "googleSlides") return slides;
  // if (type === "drive") return drive;
  // if (type === "figma") return figma;
  // if (type === "resource") return link;
}




const QuickLinksSection = () =>{

  const [fileModalOpen, setFileModalOpen] = useState(false);

    return (
        <QuickPadding >
         <PageSubtitleText>Quick Links</PageSubtitleText>
        <Row>
        <AddCard onClick={() => setFileModalOpen(true)}>
            
                  <AddText style={{ fontSize: '40px' }}>+</AddText>
              
              </AddCard>

          {quickLinks.map((data) => (
            <Tooltip title={data.tip}>
              <a href={data.url} target="_blank">
                <LinkBox>
                  <img src={getIconType(data.url)} alt={data.title} />
                </LinkBox>
              </a>
            </Tooltip>
          ))}
        </Row>
        <ReactModal isOpen={fileModalOpen} className="Modal" >
          <AddFileModal 
            setModalOpen={setFileModalOpen} 
          />
        </ReactModal>

    </QuickPadding>);
}

export default QuickLinksSection;


function AddFileModal ({ setModalOpen, labelName, submitName }) {
  //const { createLink } = useContext(ControlContext);
  const [name, setName] = useState("")
  const [webUrl, setWebUrl] = useState("")
  const [fileType, setFileType] = useState("googleDoc")

  const handleSubmit = (event) => {
    event.preventDefault();
    //createLink(fileType, name, webUrl)
    setModalOpen(false)
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <X onClick={() => setModalOpen(false)}>X</X>
        <Title>Add a New File</Title>
        <Label>
          <SectionTitle>Name:</SectionTitle>
          <Input 
            type="text" 
            name="Name" 
            placeholder="New File Name"
            onChange={event => setName(event.target.value)} 
          />
        </Label>

       <div>
            <SectionTitle>URL:</SectionTitle>
            <Label>
              <Input 
                type="text" 
                placeholder="Website URL"
                name="URL" 
                onChange={event => setWebUrl(event.target.value)} 
              />
            </Label>
          </div>
        <BtnRow>
          <CancelBtn onClick={() => setModalOpen(false)}>Cancel</CancelBtn>
          <SubmitBtn type="submit" value='Create' />
        </BtnRow>
      </form>
    </div>
  )
}

const CancelBtn = styled.button`
  border: 1px solid black;
  background white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 20px;
  width: 35%;
  color: #BE83FF;
  border: 1px solid #BE83FF;
`

const SubmitBtn = styled.input`
  border: 1px solid black; 
  border-radius: 5px;
  padding: 5px 10px;
  background: #BE83FF;
  color: white;
  width: 60%;
  border: none;
`

const BtnRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const IconRow = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const IconContainer = styled.div`
  width: 16%;
  height: auto;
  padding: 10px 25px;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  border: ${props => props.selected ? '1px solid #BE83FF' : 'none'};
  cursor: pointer;
`

const Icon = styled.img`
  width: 50px;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`

const X = styled.p`
  float: right;
  font-weight: bold;
  margin-left: 40px;
  cursor: pointer;
`

const Input = styled.input`
  width: 100%;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid #5C677D;
  padding: 10px 10px;
  margin-bottom: 15px;
`

const SectionTitle = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: #9B9B9B;
`

const Label = styled.label`
  width: 100%;
`


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
  height: 50px;
  min-width: 50px;
  img {
    height: 44px;
    width: 50px;
    margin: 3px;
  }
`;



const AddCard = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid #0CC998;
  border-radius: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
`

const AddText = styled.p`
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  color:#0CC998;
  text-align: center;
`
// Link Attributes
//  -- created Date
//  -- projectId
//  -- sectionId
//  -- committeeId
//  