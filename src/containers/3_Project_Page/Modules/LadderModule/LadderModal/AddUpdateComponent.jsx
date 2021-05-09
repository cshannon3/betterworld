
import Modal from 'styled-react-modal'
import { useState } from 'react';
import styled from "styled-components"
import * as styles from '../../sharedStyles';


const StyledModal = Modal.styled`
width: 362px;
height: 236px;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  background-color: white;
`

const AddUpdateButton  = ({
  isModalOpen=false, 
  title="Add Update", 
  onSave=()=>{}, 
  saveText="Save", 
  description=""
}) =>{
  
   const [isOpen, setIsOpen] = useState(isModalOpen);
  function toggleModal(e) {
    setIsOpen(!isOpen)
  }

    return (
      <div>
        <ButtonOne onClick={toggleModal}>{title}</ButtonOne>
        <StyledModal
          isOpen={isOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}>
              <div>
                  <TitleBar>{title}</TitleBar>
              </div>
              <textarea rows="4" cols="50">
              {description}
        </textarea>
          <button onClick={onSave}>{saveText}</button>
        </StyledModal>
      </div>
    )
}

const ButtonOne = styled.button`
    background: #0CC998;
    border-radius: 72.2872px;
    height:35px;
    width:144px;
    margin:10px;
`;
const TitleBar = styled(styles.GreenTitleBar)`
    width:100%;
`


export default AddUpdateButton;