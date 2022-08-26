import {Card, CardActions, CardContent, styled, Typography} from '@mui/material';
import React, { useContext } from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {ArchiveOutlined as Archive, DeleteOutlined as Delete} from '@mui/icons-material';
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

export const Note = ({note}: NotePropsType) => {

    const {setArchivedNotes, setDeletedNotes, notes, setNotes, archivedNotes, deletedNotes} = useContext(DataContext);

    const archiveNote = (note: NoteType) => {
        const updatedNotes = notes.filter((data) => data.id !== note.id);
        const archived = [note, ...archivedNotes];
        setNotes(updatedNotes);
        setArchivedNotes(archived);
        saveNotesToLocalStorage(updatedNotes);
        saveArchivedToLocalStorage(archived);
    }

    const deleteNote = (note: NoteType) => {
        const updatedNotes = notes.filter((data) => data.id !== note.id);
        const deleted = [note, ...deletedNotes];
        setNotes(updatedNotes);
        setDeletedNotes(deleted);
        saveNotesToLocalStorage(updatedNotes);
        saveDeletedToLocalStorage(deleted);
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography>{note.title}</Typography>
                <Typography>{note.text}</Typography>
            </CardContent>
            <CardActions>
                <Archive fontSize={"small"} style={{marginLeft: 'auto', cursor:'pointer'}} onClick={() => archiveNote(note)}/>
                <Delete fontSize={"small"} style={{cursor:'pointer'}} onClick={() => deleteNote(note)}/>
            </CardActions>
        </StyledCard>
    );
};

type NotePropsType = {
    note: NoteType
}