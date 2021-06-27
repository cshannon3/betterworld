import { useState, useContext, useEffect } from "react";

import ReactModal from "react-modal";
import firebase from "firebase/app";
import "firebase/storage";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import MultiSelect from "react-multi-select-component";
import { allUsers } from "data/users";
import styled from "styled-components";
import Modal from "styled-react-modal";

// TODO update this to actually be able to handle live data
const StyledModal = Modal.styled`
  width: 600px;
  height: 85vh;
  background-color:white;
  border-radius: 10px;
`;
export default function EditProjectInfoModal({
    projectData,
    updateProject = () =>{},
    isOpen, 
    onRequestClose,
}) {


    const storage = firebase.storage();
    const [name, setName] = useState(projectData.name);
    const [description, setDescription] = useState(projectData?.description??"");
    const [outcome, setOutcome] =  useState(projectData?.outcome??"");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [users, setUsers] = useState(projectData?.contributors?? []);
    const [inputList, setInputList] = useState([{ name: "", url: "" }]);
    const [image, setImage] = useState(null);
    const [inputFileList, setInputFileList] = useState([
      { name: "", description: "", file: null },
    ]);
    const [sectionsList, setSectionsList] = useState(projectData.sections??[]);
    const onImageChange = (e, index) => {
      const reader = new FileReader();
      let file = e.target.files[0]; // get the supplied file
      // if there is a file, set image to that file
      if (file) {
        reader.onload = () => {
          if (reader.readyState === 2) {
          //   console.log(file);
          //   setImage(file);
              const list = [...inputFileList];
              list[index]["file"] = e.target.files[0];
              setInputFileList(list);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
        // if there is no file, set image back to null
      } else {
        setImage(null);
      }
    };
  
    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
    const handleSectionChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...sectionsList];
      list[index][name] = value;
      setSectionsList(list);
    };
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { name: "", url: "" }]);
    };
    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
  
    // handle input change
    const handleInputFileChange = (e, index) => {
      const { name, value } = e.target;
  
      const list = [...inputFileList];
      list[index][name] = value;
      setInputFileList(list);
    };
    // handle input change
    const handleFileChange = (e, index) => {
      console.log(e.target.files[0]);
      const list = [...inputFileList];
      list[index]["file"] = e.target.files[0];
      setInputFileList(list);
    };
  
  
  
    // handle click event of the Add button
    const handleAddFileClick = () => {
      setInputFileList([
        ...inputFileList,
        { name: "", description: "", file: null },
      ]);
    };
    // handle click event of the Remove button
    const handleRemoveFileClick = (index) => {
      const list = [...inputFileList];
      list.splice(index, 1);
      setInputFileList(list);
    };

  
    function handleUpload(e) {
      console.log("hello");
      let entryUsers = users.map((u) => u.value);
      let promises = [
        inputFileList.map((fileData) => {
          const ref = storage.ref(`/projects/${name}/${fileData.name}`);
          return new Promise((resolve, reject)=> ref.put(fileData.file).then(()=>{
              ref.getDownloadURL().then((r) => {
                resolve(r);
              });
            })
          );
        }),
      ];
      Promise.all(promises[0]).then((vals) => {
        console.log("done");
        console.log(vals);
        let _files = inputFileList.map((f, i)=>{return ({ 
            "name":f.name,
            "description":f.description,
            "url":vals[i]
        });})
        let f = {
          name: name,
          description: description,
          outcome: outcome,
          end_date: endDate.toUTCString(),
          contributors: entryUsers,
          resources: inputList,
          display_images: _files,
          isArchived:true
        };

        //TODO update project
        //createProject(f, "cmu-against-ice");
      });
     
    }
    return (
        <StyledModal
        isOpen={isOpen}
        onBackgroundClick={onRequestClose}
        onEscapeKeydown={onRequestClose}
      >
          <FormStyle>
            {/* register your input into the hook by invoking the "register" function */}
            <h2>Edit Project</h2>
            <h2>Name</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <h2>Description</h2>
            <textarea
              rows="5"
              cols="60"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
           { projectData.isArchived && 
           <div>
           <h2>Outcome</h2>
            <input
              type="text"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
            />
            </div>
            }
            <h2>Resources</h2>
            <ResourceTab>
              {inputList.map((x, i) => {
                return (
                  <div className="box">
                    <input
                      name="name"
                      placeholder="Enter Resource Name"
                      value={x.name}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <input
                      className="ml10"
                      name="url"
                      placeholder="Enter Url"
                      value={x.url}
                      onChange={(e) => handleInputChange(e, i)}
                    />
  
                    <div className="btn-box">
                      {inputList.length !== 1 && (
                        <button
                          className="mr10"
                          onClick={() => handleRemoveClick(i)}
                        >
                          Remove
                        </button>
                      )}
                      {inputList.length - 1 === i && (
                        <button onClick={handleAddClick}>Add</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </ResourceTab>
            <h2>Sections</h2>
            {sectionsList.map((x, i) => {
                return (
                  <div>
                  <InputBox>
                    <input
                      name="name"
                      placeholder="Enter Resource Name"
                      value={x.name}
                      onChange={(e) => handleSectionChange(e, i)}
                    />
                    <div className="btn-box">
                      {sectionsList.length !== 1 && (
                        <button
                          className="mr10"
                          onClick={() => handleRemoveClick(i)}
                        >
                          Remove
                        </button>
                      )}
                     
                    </div>
                  </InputBox>
                
                  </div>
                   
                );
              })}
            <AddSectionButton onClick={handleAddClick}>Add Section</AddSectionButton>
            <h2>Target Date</h2>
            <h2>Schedule Events</h2>
            <button onClick={handleUpload}>Submit</button>
            {/* <button>upload to firebase</button> */}
          </FormStyle>
        </StyledModal>
    );
  }
  const FormStyle = styled.div`
      padding:20px;
      input{
        width:80%;
      }
`;

  const ResourceTab = styled.div`
    padding-left: 30px;
  `;


  const InputBox = styled.div`
    display:flex;
    padding-left: 30px;
  `;


  const AddSectionButton = styled.button`
  margin-left: 30px;
  `;