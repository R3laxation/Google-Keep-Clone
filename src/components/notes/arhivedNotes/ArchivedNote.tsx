import {Box, CardActions, CardContent, Typography} from '@mui/material';
import React, {useContext} from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {DeleteOutlined as Delete, UnarchiveOutlined as Unarchive} from '@mui/icons-material';
import {DataContext} from "../../../context/DataProvider";
import {
    saveArchivedToLocalStorage,
    saveDeletedToLocalStorage,
    saveNotesToLocalStorage
} from "../../../utils/localStorage/localStorage";
import {iconStyle, StyledCard} from "../note/Note";

export const ArchivedNote = ({note}: NotePropsType) => {

    const {setArchivedNotes, setDeletedNotes, notes, setNotes, archivedNotes, deletedNotes, setAlert} = useContext(DataContext);

    const unArchiveNote = (note: NoteType) => {
        setAlert('Заметка возвращена из архива')
        const updatedNotes = archivedNotes.filter((data) => data.id !== note.id);
        const unarchived = [note, ...notes];
        setArchivedNotes(updatedNotes);
        setNotes(unarchived);
        saveNotesToLocalStorage(unarchived);
        saveArchivedToLocalStorage(updatedNotes);
        setTimeout(() => {
            setAlert('')
        }, 2000)
    }

    const deleteNote = (note: NoteType) => {
        setAlert('Заметка перемещена в корзину')
        const updatedNotes = archivedNotes.filter((data) => data.id !== note.id);
        const deleted = [note, ...deletedNotes];
        setArchivedNotes(updatedNotes);
        setDeletedNotes(deleted);
        saveArchivedToLocalStorage(updatedNotes);
        saveDeletedToLocalStorage(deleted);
        setTimeout(() => {
            setAlert('')
        }, 2000)
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography>{note.title}</Typography>
                <Typography>{note.text}</Typography>
            </CardContent>
            <CardActions>
                <Box sx={iconStyle}>
                    <Unarchive fontSize={"small"} onClick={() => unArchiveNote(note)}/>
                </Box>
                <Box sx={iconStyle}>
                    <Delete fontSize={"small"} onClick={() => deleteNote(note)}/>
                </Box>
            </CardActions>
        </StyledCard>
    );
};

type NotePropsType = {
    note: NoteType
}