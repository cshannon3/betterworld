import React, { useContext } from "react"
import styled, { keyframes } from "styled-components"
import ControlContext from '../../shared/control-context'
import GoogleLogo from '../../assets/google-logo.png'

export default function Splash () {
  const appCtx = useContext(ControlContext);
  
  return (
    <LoginContainer>
      <Title>Better<Blue>World</Blue></Title>
      <Subtitle>Virtual Collaboration Made Easy</Subtitle>
      <FlexRow>
<div>
      <Button id="LoginPage-login-button" onClick={() => appCtx.loginUser()}>
        <Img src={GoogleLogo} />
        Sign In with Google
      </Button>
</div>

     </FlexRow>
    </LoginContainer>
  )
}

const FlexRow = styled.div`
  display:flex;
  margin: 40vh auto 0 auto;
  justify-content:space-evenly
`

const Title = styled.h1`
  font-size: 72px;
  text-align: center;
  font-weight: 300;
  margin-top: 15vh;
`

const fadeIn = keyframes`
  0% {
    opacity:0;
    transform: translateY(0);
  }
  100% {
    opacity:1;
    transform: translateY(-20px);
  }
`

const Subtitle = styled.h4`
  margin-top: 50px;
  font-size: 28px;
  text-align: center;
  font-weight: 300;
  color: #5C677D;
  animation: ${fadeIn} ease 2s;
  transform: translateY(-20px);
`

const Button = styled.button`
  font-size: 18px;
  padding: 20px 20px;

  background: #FFFFFF;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    transition-timing-function: ease-in;
    transition: 0.5s;
    box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.25);
  }
`

const Img = styled.img`
  width: 30px;
  height: auto;
  margin-right: 10px;
`

const LoginContainer = styled.div`
  width: 100%;
`

const Blue = styled.span`
  color: #0466C8;
  font-weight: bold;
`