// import Modal from 'styled-react-modal'
// import { useState } from 'react';
// import styled from "styled-components"
// import * as styles from '../../styles/sharedStyles';
// import { MyEditor2 } from "../MyEditor/MyEditor";
// import {cleanUpdateModel} from "data_models/updatemodel";


// //TODO remove this

// const StyledModal = Modal.styled`
// width: 362px;
// height: 236px;
// border-radius: 10px;
// background-color: white;
// `
// const updateTypeInfo = {
//   "default": {
//     "title": "Add Update",
//     "saveText": "Save",
//     "description": "",
//   },
//   "request help": {
//     "title":"Request Help",
//     "saveText":"Request",
//     "description":"Describe the work you need help with for this task..."
//   },
//   "offer to help": {
//     "title":"Offer Help",
//     "saveText":"Offer",
//     "description":"Describe how or where you would like to help"
//   }
// }



// const AddUpdateComponent = ({
//   isModalOpen = false,
//   type="default",
//   onSave = () => { },
//   user = null,
//   stages = null
// }) => {

//   const buttonData = (type in updateTypeInfo) ? updateTypeInfo[type]: updateTypeInfo["default"];
//   const [isOpen, setIsOpen] = useState(isModalOpen);
//   const [content, setContent] = useState(buttonData.description);
//   const [selectedStage, setSelectedStage] = useState(stages?stages[0]:null);



//   function toggleModal(e) {
//     setIsOpen(!isOpen)
//   }

//   return (
//     <div>
//       <ButtonOne onClick={toggleModal}>{buttonData.title}</ButtonOne>
//       <StyledModal
//         isOpen={isOpen}
//         onBackgroundClick={toggleModal}
//         onEscapeKeydown={toggleModal}>
        
//       <div>
//           <TitleBar>{buttonData.title}</TitleBar>
//           <Wrapper>
//         <MenuLine>
//           <span  class="displayName">{user&&user.displayName}</span>
//           {stages &&
//             <div class="dropdown">
//               <select name="stages" id="stages" onChange={() => {
//                 var x = document.getElementById("stages").value;
//                 setSelectedStage(x);
//               }
//               }>
//                 {stages.map((m) => (
//                   <option value={m}
//                   >{m}</option>))}
//               </select>
//             </div>
//           }
//         </MenuLine>

//         <MyEditor2
//           content={content}
//           onSave={
//             (val) => {
//               let data = {
//                 "content":val,
//                 "type": type,
//                 "author": user&&user.displayName,
//                 "authorId": user&&user.id,
//                 "content": val,
//                }
//                if(stages ){
//                  data["stage"]=selectedStage;
//                }
//                const newUpdate = cleanUpdateModel(data);
               
//                onSave(newUpdate);
//                toggleModal();
//             }
//           }
//           onCancel={() => {
//             toggleModal();
//             console.log("oncancel");
//            }}
//           changeHandler={(value) => setContent(value)}
//         />
//     </Wrapper>
//     </div>
//       </StyledModal>
//     </div>
//   )
// }


// const Wrapper = styled.div`
//     margin:10px;
// `;

// const ButtonOne = styled.button`
//     background: #0CC998;
//     border-radius: 72.2872px;
//     font-family: Baloo 2;
//     font-style: normal;
//     font-weight: bold;
//     color: white;
//     height:35px;
//     width:144px;
//     margin:10px;
//     cursor: pointer;
// `;
// const TitleBar = styled(styles.GreenTitleBar)`
//     width:100%;
// `
// const MenuLine = styled.div`
//   display:flex;
//   justify-content:space-between;
//   height:30px;
//   font-family: Baloo 2;
//   font-style: normal;
//   font-weight: bold;
//   font-size:14px;
// `;

// export default AddUpdateComponent;
