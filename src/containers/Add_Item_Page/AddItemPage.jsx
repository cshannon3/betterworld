import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import ReactModal from "react-modal";

import LeftPanel from "containers/Panels/LeftPanel";

import ControlContext from "../../shared/control-context";
import ImageUploader from "react-images-upload";

import firebase from "firebase/app";
import "firebase/storage";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import MultiSelect from "react-multi-select-component";
import { allUsers } from "./users";
import { createProject } from "shared/firebase";

//https://github.com/femioladeji/react-slideshow
//reactjs.org/docs/create-a-new-react-app.html
//https://jakehartnell.github.io/react-images-upload/
//https://www.cluemediator.com/add-or-remove-input-fields-dynamically-with-reactjs
//https://react-slideshow.herokuapp.com/api

export default function AddItemPage() {
  const storage = firebase.storage();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [outcome, setOutcome] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [inputList, setInputList] = useState([{ name: "", url: "" }]);
  const [image, setImage] = useState(null);
  const [inputFileList, setInputFileList] = useState([
    { name: "", description: "", file: null },
  ]);
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

  const uploadToFirebase = () => {
    //1.
    if (image) {
      //2.
      const storageRef = storage.ref();
      //3.
      const imageRef = storageRef.child(image.name);
      //4.
      imageRef
        .put(image)
        //5.
        .then(() => {
          alert("Image uploaded successfully to Firebase.");
        });
    } else {
      alert("Please upload an image first.");
    }
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
    //console.log(promises[0][0]);
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
        start_date: startDate.toUTCString(),
        end_date: endDate.toUTCString(),
        contributors: entryUsers,
        resources: inputList,
        display_images: _files,
        isArchived:true
      };
      console.log(f);
      createProject(f, "cmu-against-ice");
    });
   
  }
  return (
    <Row>
      <LeftPanel />
      <ContentContainer>
        <div>
          {/* register your input into the hook by invoking the "register" function */}
          <h2>New Archived Project</h2>
          <h2>Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h2>Description</h2>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h2>Outcome</h2>
          <input
            type="text"
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
          />
          <h2>Start Date</h2>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <h2>End Date</h2>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
          <h2>Members</h2>
          <MultiSelect
            options={allUsers.map((v) => {
              return { label: v.name, value: v };
            })}
            value={users}
            onChange={setUsers}
            labelledBy="Select"
          />
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
          <h2>Images</h2>
          <ResourceTab>
            {inputFileList.map((x, i) => {
              return (
                <div className="box" key={i}>
                  <input
                    name="name"
                    placeholder="Enter Resource Name"
                    value={x.name}
                    onChange={(e) => handleInputFileChange(e, i)}
                  />
                  <input
                    className="ml10"
                    name="description"
                    placeholder="Enter Url"
                    value={x.description}
                    onChange={(e) => handleInputFileChange(e, i)}
                  />
                  <input
                    type="file"
                    accept="image/x-png,image/jpeg"
                    onChange={(e) => {
                      onImageChange(e, i);
                    }}
                  />
                  <div className="btn-box">
                    {inputFileList.length !== 1 && (
                      <button
                        className="mr10"
                        onClick={() => handleRemoveFileClick(i)}
                      >
                        Remove
                      </button>
                    )}
                    {inputFileList.length - 1 === i && (
                      <button onClick={handleAddFileClick}>Add</button>
                    )}
                  </div>
                </div>
              );
            })}
          </ResourceTab>

          <button onClick={handleUpload}>Submit</button>
          {/* <button>upload to firebase</button> */}
        </div>
      </ContentContainer>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  width: 100%;
`;
const ContentContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  padding: 5vh 50px 3vh 40px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 10px;
`;

const ResourceTab = styled.div`
  padding-left: 30px;
`;

// const cleanReplyModel = (replyData) => {
//     let d = replyData !== null && replyData !== undefined ? replyData : {};
//     return {
//         replyId: "replyId" in d ? d.replyId : uuidv4(),
//         author: "author" in d ? d.author : "",
//         authorId: "authorId" in d ? d.authorId : "",
//         replyContent: "replyContent" in d ? d.replyContent : "",
//         tags: "tags" in d ? d.tags : [],
//         answer: "answer" in d ? d.answer : false,
//         question: "question" in d ? d.question : false,
//         timestamp: "timestamp" in d ? d.timestamp : new Date().getTime(),
//         anchor: "anchor" in d ? d.anchor : null,
//     }
// }
// export default cleanReplyModel;

// const [pictures, setPictures] = useState([]);
// const [file, setFile] = useState(null);
// const [url, setURL] = useState("");
// const onDrop = (picture) => {
//     console.log(picture);
//     setPictures([...pictures, picture])
// this.setState({
//     pictures: this.state.pictures.concat(picture),
// });
//}
// return (
//     <div>
//       <form onSubmit={handleUpload}>
//         <input type="file" onChange={handleChange} />
//         <button disabled={!file}>upload to firebase</button>
//       </form>
//       <img src={url} alt="" />
//     </div>
//   );

///onSubmit={handleSubmit(onSubmit)}

//<input defaultValue="test" {...register("example")} />

//{/* include validation with required or other standard HTML validation rules */}
//<input {...register("exampleRequired", { required: true })} />
//{/* errors will return when field validation fails  */}
//{errors.exampleRequired && <span>This field is required</span>}
/*
     <p>Images</p>
                    <ImageUploader
                        withIcon={true}
                        withPreview={true}
                        buttonText='Choose images'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />*/

// const appCtx = useContext(ControlContext);
// const urlParts = window.location.href.split("/")
// const projectId = urlParts[urlParts.length-1]
// console.log(projectId);
// const [projectData, setProjectData] = useState(appCtx.getProjectData(projectId));

//     console.log(inputList[0]);
//     let promises = [
//       inputFileList.map((fileData) => {
//         const ref = storage.ref(`/${name}/${fileData.name}`);
//         const uploadTask = ref.put(fileData.file);
//         return new Promise((resolve, reject) =>
//           uploadTask.on("state_changed", console.log, console.error, () =>{
//           console.log("State change")
//           ref.getDownloadURL().then((r)=>{
//               resolve(r);
//           });
//         }

//         ))
//       })
//     ]
//     //console.log(promises[0][0]);
//  Promise.all(
//    promises[0]).then((vals) => {
//       console.log("done");
//       console.log(vals);
//     });
// inputFileList.forEach((fileData)=>{

//     const ref = storage.ref(`/projects/${name}/${fileData.name}`);
//     const uploadTask = ref.put(fileData.file);

//     // uploadTask.on("state_changed", console.log, console.error, () => {
//     //     ref
//     //         .getDownloadURL().then((url) => { });});
// });

// const ref = storage.ref(`/images/${inputFileList[0].name}`);
// const uploadTask = ref.put(inputFileList[0].file);
// uploadTask.on("state_changed", console.log, console.error, () => {
//     ref
//         .getDownloadURL()
//         .then((url) => {

//             //setURL(url);
//             console.log("URL",url);
//         });
// });
