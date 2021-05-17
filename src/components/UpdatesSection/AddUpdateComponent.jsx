import Modal from 'styled-react-modal'
import { useState } from 'react';
import styled from "styled-components"
import * as styles from '../../containers/3_Project_Page/Modules/sharedStyles';
import { MyEditor } from "../../containers/3_Project_Page/Modules/LadderModule/RichTextEditor/RichTextEditor";
import {cleanUpdateModel} from "data_models/updatemodel";


const StyledModal = Modal.styled`
width: 362px;
height: 236px;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  background-color: white;
`
const updateTypeInfo = {
  "default": {
    "title": "Add Update",
    "saveText": "Save",
    "description": "",
  },
  "request help": {
    "title":"Request Help",
    "saveText":"Request",
    "description":"Describe the work you need help with for this task..."                  
  },
  "offer to help": {
    "title":"Offer Help",
    "saveText":"Offer",
    "description":"Describe how or where you would like to help"                  
  }
}



const AddUpdateButton = ({
  isModalOpen = false,
  type="default",
  //title = "Add Update",
  onSave = () => { },
  //saveText = "Save",
  //userName = "",
  user = null,
  //description = "",
  stages = null
}) => {

  const buttonData = (type in updateTypeInfo) ? updateTypeInfo[type]: updateTypeInfo["default"];
  const [isOpen, setIsOpen] = useState(isModalOpen);
  const [content, setContent] = useState(buttonData.description);
  const [selectedStage, setSelectedStage] = useState(stages[0]);
  
  
  
  function toggleModal(e) {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <ButtonOne onClick={toggleModal}>{buttonData.title}</ButtonOne>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}>
        <div>
          <TitleBar>{buttonData.title}</TitleBar>
        </div>
        <MenuLine>
          <span>{user.displayName}</span>
          {stages &&
            <div class="dropdown">
              <select name="stages" id="stages" onChange={() => {
                var x = document.getElementById("stages").value;
                setSelectedStage(x);
              }
              }>
                {stages.map((m) => (
                  <option value={m}
                  >{m}</option>))}
              </select>
            </div>
          }
        </MenuLine>

        <MyEditor
          content={content}
          onSave={
            (val) => {
              let data = {
                "content":val,
                "type": type,
                "author": user.displayName,
                "authorId": user.id,
                "content": val,
               }
               if(stages ){
                 data["stage"]=selectedStage;
               }
               const newUpdate = cleanUpdateModel(data);
               return onSave(newUpdate);
              //onSave({ stage: selectedStage, content: val })
              //setContent(value)
            }
          }
          onCancel={() => { }}
          changeHandler={(value) => setContent(value)}
        />

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

const MenuLine = styled.div`
display:flex;
    
`;

export default AddUpdateButton;

/* <textarea rows="4" cols="50">
            {description}
      </textarea> */
/* <button onClick={
  () => onSave({ stage: selectedStage, content: content })
}>{saveText}</button> */