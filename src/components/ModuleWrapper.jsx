
import React from 'react';
import styled from "styled-components";
import * as styles from 'styles/sharedStyles';
//goal of at a glance: people photos, resource # and repsonisbilities

export default function ModuleWrapper({Component, name}) {
   return ( <Wrapper>
        <styles.GreyTitleBar>{name}</styles.GreyTitleBar>
      <Padding>
       {Component}
       </Padding>
    </Wrapper>);
}

const Wrapper = styled.div`
  margin-right:30px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  height:100%;
  
`
const Padding = styled.div`
padding:10px;
`