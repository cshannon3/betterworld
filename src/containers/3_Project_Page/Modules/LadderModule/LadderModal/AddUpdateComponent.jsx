import Modal from 'styled-react-modal'
import { useState } from 'react';
import styled from "styled-components"
import * as styles from 'styles/sharedStyles';
import {MyEditor} from "../RichTextEditor/RichTextEditor";

const StyledModal = Modal.styled`
width: 362px;
height: 236px;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  background-color: white;
`

const AddUpdateButton = ({
  isModalOpen = false,
  title = "Add Update",
  onSave = () => { },
  saveText = "Save",
  userName = "",
  description = "",
  stages=[]
}) => {

  const [isOpen, setIsOpen] = useState(isModalOpen);
  const [content, setContent] = useState(description);
  const [selectedStage, setSelectedStage] = useState(stages[0]);
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
        <MenuLine>
          <span>{userName}</span>
          <div class="dropdown">
            <select name="stages" id="stages" onChange={()=>
              {
                var x = document.getElementById("stages").value;
                console.log(x);
                setSelectedStage(x);
              }
              }>
              {stages.map((m)=>(
              <option value={m}
              >{m}</option>))}
            </select>
          </div>
        </MenuLine>

        <MyEditor
          content={content}
          onSave={
            (val)=>{
              onSave({ stage: selectedStage, content: val})
              //setContent(value)
            }
          }
          onCancel={
            ()=>{}
          }

          changeHandler={(value) => setContent(value)}
        />
        {/* <textarea rows="4" cols="50">
              {description}
        </textarea> */}
        {/* <button onClick={
          () => onSave({ stage: selectedStage, content: content })
        }>{saveText}</button> */}
      </StyledModal>
    </div>
  )
}

const ButtonOne = styled.button`
    background: pink;
    border-radius: 72.2872px;
    height:35px;
    width:144px;
    margin:10px;
`;
const TitleBar = styled(styles.GreenTitleBar)`
    width:100%;
`

const MenuLine = styled.div`
display:flex;

`;

export default AddUpdateButton;