import { useMemo, useState } from 'react';
import Modal from 'react-modal';
import styled from "styled-components"
import styles from "./LadderModal.module.css"
import TeamNotesWidget from "../../components/Notepad/NotepadWidget";


Modal.setAppElement('#root')


function LadderModal({ data, isOpen, onRequestClose, subtitle }) {

    var subtitle;
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={onRequestClose}
            contentLabel="Example Modal"
            //className=
            // overlayClassName="Overlay"

        >
           
                <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={onRequestClose}>close</button>
                <div>{data}</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
                <WidgetContainer>
                    <TeamNotesWidget />
                </WidgetContainer>
            
        </Modal>
    );
};


// const Container = styled.div`
//     height: 60vh; 
//     background-color:red;
// `

const WidgetContainer = styled.div`
height: auto;
min-height: 100% !important;
  width:100%;
`



export default LadderModal;