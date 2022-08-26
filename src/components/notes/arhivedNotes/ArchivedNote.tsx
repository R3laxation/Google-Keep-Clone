import {Card, CardActions, CardContent, styled, Typography} from '@mui/material';
import React, { useContext } from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {UnarchiveOutlined as Unarchive, DeleteOutlined as Delete} from '@mui/icons-material';
import {DataContext} from "../../../context/DataProvider";
import {
    saveArchivedToLocalStorage,
    saveDeletedToLocalStorage,
    saveNotesToLocalStorage
} from "../../../storage/localStorage";


const StyledCard = styled(Card)`
  width: 240px;
  margin: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: default;
`

export const ArchivedNote = ({note}: NotePropsType) => {

    const {setArchivedNotes, setDeletedNotes, notes, setNotes, archivedNotes, deletedNotes} = useContext(DataContext);

    const unArchiveNote = (note: NoteType) => {
        const updatedNotes = archivedNotes.filter((data) => data.id !== note.id);
        const unarchived = [note, ...notes];
        setArchivedNotes(updatedNotes);
        setNotes(unarchived);
        saveNotesToLocalStorage(unarchived);
        saveArchivedToLocalStorage(updatedNotes);
    }

    const deleteNote = (note: NoteType) => {
        const updatedNotes = archivedNotes.filter((data) => data.id !== note.id);
        const deleted = [note, ...deletedNotes];
        setArchivedNotes(updatedNotes);
        setDeletedNotes(deleted);
        saveArchivedToLocalStorage(updatedNotes);
        saveDeletedToLocalStorage(deleted);
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography>{note.title}</Typography>
                <Typography>{note.text}</Typography>
            </CardContent>
            <CardActions>
                <Unarchive fontSize={"small"} style={{marginLeft: 'auto', cursor:'pointer'}} onClick={() => unArchiveNote(note)}/>
                <Delete fontSize={"small"} style={{cursor:'pointer'}} onClick={() => deleteNote(note)}/>
            </CardActions>
        </StyledCard>
    );
};

type NotePropsType = {
    note: NoteType
}