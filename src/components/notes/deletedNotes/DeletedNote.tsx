import {Card, CardActions, CardContent, styled, Typography} from '@mui/material';
import React, { useContext } from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete} from '@mui/icons-material';
import {DataContext} from "../../../context/DataProvider";
import {saveDeletedToLocalStorage, saveNotesToLocalStorage} from "../../../storage/localStorage";


const StyledCard = styled(Card)`
  width: 240px;
  margin: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: default;
`

export const DeletedNote = ({note}: NotePropsType) => {

    const {setDeletedNotes, notes, setNotes, deletedNotes} = useContext(DataContext);

    const restoreNote = (note: NoteType) => {
        const updatedNotes = deletedNotes.filter((data) => data.id !== note.id);
        const restored = [note, ...notes];
        setDeletedNotes(updatedNotes);
        setNotes(restored);
        saveDeletedToLocalStorage(updatedNotes);
        saveNotesToLocalStorage(restored);
    }

    const deleteNote = (note: NoteType) => {
        const updatedNotes = deletedNotes.filter((data) => data.id !== note.id);
        setDeletedNotes(updatedNotes);
        saveDeletedToLocalStorage(updatedNotes);
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography>{note.title}</Typography>
                <Typography>{note.text}</Typography>
            </CardContent>
            <CardActions>
                <Delete fontSize={"small"} onClick={() => deleteNote(note)} style={{marginLeft: 'auto', cursor:'pointer'}} />
                <Restore fontSize={"small"} style={{cursor:'pointer'}} onClick={() => restoreNote(note)}/>
            </CardActions>
        </StyledCard>
    );
};

type NotePropsType = {
    note: NoteType
}