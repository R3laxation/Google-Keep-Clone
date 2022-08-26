import {Box, Card, CardActions, CardContent, styled, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {ArchiveOutlined as Archive, DeleteOutlined as Delete} from '@mui/icons-material';
import {DataContext} from "../../../context/DataProvider";
import {
    saveArchivedToLocalStorage,
    saveDeletedToLocalStorage,
    saveNotesToLocalStorage
} from "../../../utils/localStorage/localStorage";

export const StyledCard = styled(Card)`
  width: 240px;
  margin: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: default;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
`

export const iconStyle = {
    marginLeft: 'auto',
    cursor:'pointer',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 1500ms easy',
    ":hover": {
        backgroundColor: '#eaebeb'
    }
}

export const Note = ({note}: NotePropsType) => {

    const {setArchivedNotes, setDeletedNotes, notes, setNotes, archivedNotes, deletedNotes, setAlertIsOpen, alertIsOpen} = useContext(DataContext);

    const archiveNote = (note: NoteType) => {
        setAlertIsOpen(true)
        const updatedNotes = notes.filter((data) => data.id !== note.id);
        const archived = [note, ...archivedNotes];
        setNotes(updatedNotes);
        setArchivedNotes(archived);
        saveNotesToLocalStorage(updatedNotes);
        saveArchivedToLocalStorage(archived);

    }

    // useEffect(() => {
    //
    //     if(alertIsOpen) {
    //         var timeoutId = setTimeout(() => {
    //             setAlertIsOpen(false)
    //         }, 3000)
    //     }
    //     return () => {
    //         clearTimeout(timeoutId)
    //     }
    // }, [alertIsOpen])

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
                <Box sx={iconStyle}>
                    <Archive fontSize={"small"} onClick={() => archiveNote(note)}/>
                </Box>
                <Box sx={iconStyle}>
                    <Delete fontSize={"small"} sx={{cursor:'pointer'}} onClick={() => deleteNote(note)}/>
                </Box>
            </CardActions>
        </StyledCard>
    );
};

type NotePropsType = {
    note: NoteType
}