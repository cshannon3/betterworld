import React from 'react';
import {  useEffect } from "react";
import "./RichTextEditor.css";
//import styled from "styled-components";
import { Editor, EditorState, RichUtils, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { GrBlockQuote } from "react-icons/gr";
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdCode, MdFormatListBulleted, MdFormatListNumbered } from 'react-icons/md';
//https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/
//https://draftjs.org/docs/api-reference-data-conversion
//June 18 - STILL ISN'T TAKING CSS? Can't test because projects broken
//Tried changing here, css, and in ladder


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

    <div className="RichEditor-root">
         <Editor 
         editorState={editorState}
          onChange={setEditorState} 
        />
    </div>
     <button className={"button"} onClick={()=>{
        const raw = convertToRaw(editorState.getCurrentContent());
        const blocks =raw.blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
       // const notRaw = convertFromRaw(blocks);
       // console.log(raw, notRaw);
        onSave(value);
     }}>save</button>
     <button className={"button grey"} onClick={onCancel}>cancel</button>
     </div>
    );
  }



export default class RichEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState:
            this.props.content !== undefined ? EditorState.createWithContent(ContentState.createFromText(this.props.content)) : EditorState.createEmpty(),

        };
        this.textInput = React.createRef();
        this.focus = () => this.textInput.editor.focus();
        this.onChange = (editorState) => {
            const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
            const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
            this.props.changeHandler(value);
            this.setState({ editorState: editorState });
        }  //this.setState({ editorState, annotationContent: editorState });
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => {
            this._toggleInlineStyle(style);
        }


    }

    componentDidMount = () => {
        this.focus();
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        const { editorState } = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        EditorState.moveSelectionToEnd(this.state.editorState)
        var selectionState = this.state.editorState.getSelection();
        //EditorState.createWithContent('Hello');

        return (
            <div className="RichEditor-root">
                <div className="RichEditor-controls">
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                </div>
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        onTab={this.onTab}
                        placeholder=""
                        ref={this.textInput}
                        spellCheck={true}
                    />
                </div>
            </div>
        );
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

//think this is the button but css isn't taking
class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.icon === undefined ? this.props.label : this.props.icon}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    // { label: 'H1', style: 'header-one' },
    // { label: 'H2', style: 'header-two' },
    // { label: 'H3', style: 'header-three' },
    // { label: 'H4', style: 'header-four' },
    // { label: 'H5', style: 'header-five' },
    // { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote', icon: <GrBlockQuote className="RichEditor-styleSvg" /> },
    { label: 'UL', style: 'unordered-list-item', icon: <MdFormatListBulleted className="RichEditor-styleSvg" /> },
    { label: 'OL', style: 'ordered-list-item', icon: <MdFormatListNumbered className="RichEditor-styleSvg" /> },
    //{ label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <React.Fragment>
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    icon={type.icon}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </React.Fragment>
    );
};

var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD', icon: <MdFormatBold className="RichEditor-styleSvg" />, styleClass: "RichEditor-styleSvg" },
    { label: 'Italic', style: 'ITALIC', icon: <MdFormatItalic className="RichEditor-styleSvg" /> },
    { label: 'Underline', style: 'UNDERLINE', icon: <MdFormatUnderlined className="RichEditor-styleSvg" /> },
    { label: 'Monospace', style: 'CODE', icon: <MdCode className="RichEditor-styleSvg" /> },
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <React.Fragment>
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    icon={type.icon}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </React.Fragment>
    );
};



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