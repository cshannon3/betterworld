
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { committeeIcons } from "data/dummydata";
import {
    ProjectCardTextWhite, 
  } from "styles/sharedStyles";

 const CommitteeBox = ({id, order, name, onClick=()=>{}}) =>{

   return( <CommitteeBoxStyle
        onClick={onClick}
        >
        <div className="contentBox">
            <div className="order">{`0${order}`}</div>
            <ProjectCardTextWhite className="name">
            {name}
            </ProjectCardTextWhite>
            <div className="line" />
        </div>
        <img src={committeeIcons[id]} alt={name} />
        </CommitteeBoxStyle>
        );
}

export default CommitteeBox;


const CommitteeBoxStyle = styled.div`
position: relative;
cursor: pointer;
height: 111px;
min-width: 244px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 3px;
background: #0cc998;
img {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 111px;
  min-width: 244px;
}
.contentBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
  height: 100px;

  .order {
    color: white;
    font-family: "Baloo 2";
    font-weight: normal;
    font-size: 26px;
    line-height: 28px;
  }

  .line {
    background-color: white;
    width: 50px;
    height: 3px;
    margin-top: 5px;
    border-radius: 11px;
  }
}
`;

