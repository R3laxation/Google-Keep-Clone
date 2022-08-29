import * as React from 'react';
import {ChangeEvent, useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {Box, styled} from "@mui/material";
import {DataContext, ProviderValueType, SetterType} from "../../context/DataProvider";
import {NoteType} from "../notes/addNoteForm/AddNoteForm";
import {saveNotesToLocalStorage} from "../../utils/localStorage/localStorage";

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 10px 15px;
  min-height: 20px;
  color: black;
`

export const EditModal = ({open, closeModal, note, noteType, noteSetter}: EditPropsType) => {

    const {title, text, id} = note;

    const context  = useContext(DataContext);
    const [editedNote, setEditedNote] = useState(note);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const changedNote = {
            ...editedNote,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
        };
        setEditedNote(changedNote)
    }
    const closeModalHandler = () => {
        const notes = context[noteType] as NoteType[]
        const setter = context[noteSetter] as SetterType
        const filteredNotes = notes.filter(note => note.id !== id)
        const newNotes = [editedNote, ...filteredNotes]
        setter(newNotes)
        saveNotesToLocalStorage(newNotes);
        closeModal();
    }

    return (
        <div>
            <Dialog open={open} onClose={closeModalHandler}>
                <DialogContent>
                    <Container>
                        <TextField
                            autoFocus
                            placeholder={title ? title : 'Введите заголовок'}
                            variant="standard"
                            InputProps={{disableUnderline: true}}
                            style={{marginBottom: 10}}
                            helperText={''}
                            value={editedNote.title}
                            multiline maxRows={Infinity}
                            onChange={onChangeHandler}
                            name='title'
                        />
                        <TextField
                            autoFocus
                            InputProps={{disableUnderline: true}}
                            placeholder={text ? text : 'Текст заметки'}
                            variant="standard"
                            value={editedNote.text}
                            multiline maxRows={Infinity}
                            onChange={onChangeHandler}
                            name='text'
                        />
                    </Container>
                </DialogContent>
            </Dialog>
        </div>
    );
}

type EditPropsType = {
    open: boolean
    closeModal: () => void
    note: NoteType
    noteType:  keyof ProviderValueType
    noteSetter: keyof ProviderValueType
}