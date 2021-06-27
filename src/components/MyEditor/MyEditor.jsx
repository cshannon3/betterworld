import React from 'react';
import {  useEffect, useState } from "react";
import styled from "styled-components";
import { Editor, EditorState, RichUtils, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { GrBlockQuote } from "react-icons/gr";
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdCode, MdFormatListBulleted, MdFormatListNumbered } from 'react-icons/md';
import {swapTags, getUsersFromTags} from './tags'
import defaultStyle from './defaultStyle'

import { MentionsInput, Mention } from "react-mentions";
//https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/
//https://draftjs.org/docs/api-reference-data-conversion

//https://stackblitz.com/edit/react-mentions?file=tags.js

const users = [
  {
      _id: '123',
      name: { first: 'John', last: 'Reynolds' }
    },
    {
      _id: '234',
      name: { first: 'Holly', last: 'Reynolds' }
    },
    {
      _id: '345',
      name: { first: 'Ryan', last: 'Williams' }
    }
];


export function MyEditor({content, onSave, onChange=(val)=>{}, onCancel=()=>{}}) {

    const [editorState, setEditorState] = React.useState(
      () => content !== undefined ? EditorState.createWithContent(ContentState.createFromText(content)) : EditorState.createEmpty(),
    );
    useEffect(() => {
        const raw = convertToRaw(editorState.getCurrentContent());
        const blocks =raw.blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        onChange(value);

    }, [editorState])

    return (
    <div >

    <RootStyles>
         <Editor 
         editorState={editorState}
          onChange={setEditorState} 
        />
    </RootStyles>
     <SaveButton className={"button"} onClick={()=>{
        const raw = convertToRaw(editorState.getCurrentContent());
        const blocks =raw.blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        
        onSave(value);
     }}>save</SaveButton>
     <CancelButton className={"button grey"} onClick={()=>onCancel()}>cancel</CancelButton>
     </div>
    );
  }

export function MyEditor2({content, onSave, onChange=(val)=>{}, onCancel=()=>{}}) {

    const [_content, setContent] = useState(content??"");


    const handleCommentChange = (e) => {
      const newContent = e.target.value;
      setContent(e.target.value);
      onChange(newContent);
    };
    const userMentionData = users.map(myUser => ({
      id: myUser._id,
      display: `${myUser.name.first} ${myUser.name.last}`
    }))
    return (
    <div >

    <RootStyles>
      <MentionsInput
          value={_content}
          onChange={handleCommentChange}
          style={defaultStyle}
        >
          <Mention 
          trigger="@" 
          markup="@{{__type__||__id__||__display__}}"
          data={userMentionData} 
          type="user"
          
          />
        </MentionsInput>
    </RootStyles>
     <SaveButton className={"button"} onClick={()=>{
        // const raw = convertToRaw(editorState.getCurrentContent());
        // const blocks =raw.blocks;
        const displayText = swapTags(_content)
        // const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
       onSave(displayText);
     }}>save</SaveButton>
     <div>{_content}</div>
     <CancelButton className={"button grey"} onClick={()=>onCancel()}>cancel</CancelButton>
     </div>
    );
  }

  


  const RootStyles = styled.div`
    background: #dad9d926;
    border: 1px solid #9f9e9e;
    font-family: sans-serif;
    font-size: 14px;
   // padding: 10px 15px 15px 15px;
    height:100px;
    margin-bottom: 10px;

    &::focused {
        border-color: darkslategray;
    }
    
  `;
const SaveButton = styled.button`
    background: #0CC998;
    border-radius: 5px;
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    color: white;
    height:30px;
    width:144px;
    margin:10px;
    cursor: pointer;
`;
const CancelButton = styled(SaveButton)`
    background-color:grey;
`;



