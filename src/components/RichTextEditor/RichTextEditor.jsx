import React from 'react';
import {  useEffect } from "react";
import styled from "styled-components";
import { Editor, EditorState, RichUtils, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { GrBlockQuote } from "react-icons/gr";
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdCode, MdFormatListBulleted, MdFormatListNumbered } from 'react-icons/md';
//https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/
//https://draftjs.org/docs/api-reference-data-conversion
//June 18 - STILL ISN'T TAKING CSS? Can't test because projects broken
//Tried changing here, css, and in ladder
//This was super annoying

export function MyEditor({content, onSave, onChange=(val)=>{}, onCancel}) {

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
     <CancelButton className={"button grey"} onClick={onCancel}>cancel</CancelButton>
     </div>
    );
  }

  const RootStyles = styled.div`
    background: #dad9d926;
    border: 1px solid #9f9e9e;
    font-family: sans-serif;
    font-size: 14px;
    padding: 10px 15px 15px 15px;
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



