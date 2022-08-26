import {Box, ClickAwayListener, styled, TextField} from '@mui/material';
import React, {ChangeEvent, useContext, useRef, useState} from 'react';
import {DataContext} from "../../../context/DataProvider";
import {v4 as uuid} from 'uuid';
import {saveNotesToLocalStorage} from "../../../utils/localStorage/localStorage";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 600px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67/ 30%), 0 2px 6px 2px rgb(60 64 67/15%);
  padding: 10px 15px;
  border-radius: 8px;
  border-color: #e0e0e0;
  margin: auto;
  min-height: 20px;
`
const note = {
    id: '',
    title: '',
    text: '',
}

export const AddNoteForm = () => {

    const {setNotes, notes} = useContext(DataContext);
    const containerRef = useRef<HTMLElement>();
    const [addNote, setAddNote] = useState<NoteType>({...note, id: uuid()});

    const [showTextFiled, setShowTextField] = useState(false);

    const onClickHandler = () => {
        setShowTextField(true)
        if (containerRef.current) {
            containerRef.current.style.minHeight = '70px'
        }
    }

    const handleClickAway = () => {
        setShowTextField(false)
        if (containerRef.current) {
            containerRef.current.style.minHeight = '30px'
        }
        setAddNote({...note, id: uuid()});
        if(addNote.text || addNote.title){
            const newNotes = [addNote, ...notes]
            setNotes(newNotes);
            saveNotesToLocalStorage(newNotes);
        }
    }

    const onTextChange = (e: ChangeEvent) => {
        let changedNote = {...addNote, [(e.target as HTMLInputElement).name]:(e.target as HTMLInputElement).value}
        setAddNote(changedNote);
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef}>
                {showTextFiled && <TextField placeholder={'Введите заголовок'} variant={"standard"}
                                             InputProps={{disableUnderline: true}} style={{marginBottom: 10}}
                                             onChange={(e) => onTextChange(e)} name='title' value={addNote.title}
                />}
                <TextField placeholder={'Заметка...'} multiline maxRows={Infinity} variant={"standard"}
                           InputProps={{disableUnderline: true}} onClick={onClickHandler}
                           onChange={(e) => onTextChange(e)}
                           name='text' value={addNote.text}
                />
            </Container>
        </ClickAwayListener>
    );
};

export type NoteType = {
    id: string
    title: string
    text: string
}