import styled from "styled-components"

export const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  font-size: 36px;
  line-height: 49px;
`

export const Breadcrumbs = styled.div`
  font-size: 14px; 
  margin-bottom: 10px;
  display: flex;
`

export const ContentContainer = styled.div`
  width: 100%;
  padding: 5vh 5% 0 5%;
`

export const Input = styled.input`
  width: 375px;
  border-radius: 5px;
  border: 2px solid #5C677D;
  font-size: 18px;
  padding: 5px 15px;
`

export const FilterButton = styled.button`
  width: 150px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid #5C677D;
  background-color: white;
  margin-left: 15px;
  font-size: 18px;
  color: #5C677D;
`

export const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const TrashIcon = styled.img`
  position: absolute;
  top: 0px;
  right: 10px;
  height: 25px;
  width: 25px;
  cursor: pointer;
`

export const PinIcon = styled.img`
  position: absolute;
  top: 0px;
  left: 15px;
  height: 25px;
  width: 25px;
  cursor: pointer;
`

export const SectionName = styled.div`
  font-family: Open Sans;
  font-weight: bold;
  font-size: 18px;
  color: #9B9B9B;
  margin-top: 40px;
`