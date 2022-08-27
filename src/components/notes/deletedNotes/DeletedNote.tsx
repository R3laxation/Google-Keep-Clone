import {Box, CardActions, CardContent, Typography} from '@mui/material';
import React, {useContext} from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {DeleteForeverOutlined as Delete, RestoreFromTrashOutlined as Restore} from '@mui/icons-material';
import {DataContext} from "../../../context/DataProvider";
import {saveDeletedToLocalStorage, saveNotesToLocalStorage} from "../../../utils/localStorage/localStorage";
import {iconStyle, StyledCard} from "../note/Note";

export const DeletedNote = ({note}: NotePropsType) => {

    const {setDeletedNotes, notes, setNotes, deletedNotes, setAlert} = useContext(DataContext);

    const restoreNote = (note: NoteType) => {
        const updatedNotes = deletedNotes.filter((data) => data.id !== note.id);
        const restored = [note, ...notes];
        setDeletedNotes(updatedNotes);
        setNotes(restored);
        saveDeletedToLocalStorage(updatedNotes);
        saveNotesToLocalStorage(restored);
    }

    const deleteNote = (note: NoteType) => {
        setAlert('Заметка восстановлена')
        const updatedNotes = deletedNotes.filter((data) => data.id !== note.id);
        setDeletedNotes(updatedNotes);
        saveDeletedToLocalStorage(updatedNotes);
        setTimeout(() => {
            setAlert('')
        }, 3000)
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography>{note.title}</Typography>
                <Typography>{note.text}</Typography>
            </CardContent>
            <CardActions>
                <Box sx={iconStyle}>
                    <Delete fontSize={"small"} onClick={() => deleteNote(note)} />
                </Box>
                <Box sx={iconStyle}>
                    <Restore fontSize={"small"} onClick={() => restoreNote(note)}/>
                </Box>
            </CardActions>
        </StyledCard>
    );
};

type NotePropsType = {
    note: NoteType
}