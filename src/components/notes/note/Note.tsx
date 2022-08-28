import {Box, Card, CardActions, CardContent, styled, Typography} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {ArchiveOutlined as Archive, DeleteOutlined as Delete, EditOutlined as Edit} from '@mui/icons-material';
import {DataContext} from "../../../context/DataProvider";
import {
    saveArchivedToLocalStorage,
    saveDeletedToLocalStorage,
    saveNotesToLocalStorage
} from "../../../utils/localStorage/localStorage";
import {EditModal} from "../../modals/EditModal";

export const StyledCard = styled(Card)`
  width: 240px;
  margin: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: default;
  transition: box-shadow 400ms ease;
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
    transition: 'background-color 300ms ease',
    ":hover": {
        backgroundColor: '#eaebeb'
    }
}

export const Note = ({note}: NotePropsType) => {

    const {setArchivedNotes, setDeletedNotes, notes,
        setNotes, archivedNotes, deletedNotes, setAlert} = useContext(DataContext);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const archiveNote = (note: NoteType) => {
        setAlert('Заметка добавлена в архив')
        const updatedNotes = notes.filter((data) => data.id !== note.id);
        const archived = [note, ...archivedNotes];
        setNotes(updatedNotes);
        setArchivedNotes(archived);
        saveNotesToLocalStorage(updatedNotes);
        saveArchivedToLocalStorage(archived);
        setTimeout(() => {
            setAlert('')
        }, 2000)
    }

    const deleteNote = (note: NoteType) => {
        setAlert('Заметка перемещена в корзину')
        const updatedNotes = notes.filter((data) => data.id !== note.id);
        const deleted = [note, ...deletedNotes];
        setNotes(updatedNotes);
        setDeletedNotes(deleted);
        saveNotesToLocalStorage(updatedNotes);
        saveDeletedToLocalStorage(deleted);
        setTimeout(() => {
            setAlert('')
        }, 2000)
    }

    const openModal = () =>{
        setModalIsOpen(true)
    }

    const closeModal = () =>{
        setModalIsOpen(false)
    }

    return (
        <>
            <StyledCard>
                <CardContent>
                    <Typography>{note.title}</Typography>
                    <Typography>{note.text}</Typography>
                </CardContent>
                <CardActions>
                    <Box sx={iconStyle}>
                        <Edit fontSize={"small"} onClick={openModal}/>
                    </Box>
                    <Box sx={iconStyle}>
                        <Archive fontSize={"small"} onClick={() => archiveNote(note)}/>
                    </Box>
                    <Box sx={iconStyle}>
                        <Delete fontSize={"small"} onClick={() => deleteNote(note)}/>
                    </Box>
                </CardActions>
                <EditModal open={modalIsOpen} closeModal={closeModal}/>
            </StyledCard>

        </>


    );
};

type NotePropsType = {
    note: NoteType
}