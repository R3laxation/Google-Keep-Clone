import {CardActions} from '@mui/material';
import React, {useContext} from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {ArchiveOutlined as Archive, DeleteOutlined as Delete, EditOutlined as Edit} from '@mui/icons-material';
import {DataContext} from "../../../context/DataProvider";
import {
    saveArchivedToLocalStorage,
    saveDeletedToLocalStorage,
    saveNotesToLocalStorage
} from "../../../utils/localStorage/localStorage";
import {StyledCard} from "../note/Note";
import {NoteContent} from "../noteContent/NoteContent";
import {NoteAction} from '../noteAction/NoteAction';
import {useModalHook} from "../../../context/useModalHook";
import {EditModal} from "../../modals/EditModal";

export const ArchivedNote = ({note}: NotePropsType) => {

    const {
        setArchivedNotes,
        setDeletedNotes,
        notes,
        setNotes,
        archivedNotes,
        deletedNotes,
        setAlert
    } = useContext(DataContext);
    const {modalIsOpen, openModal, closeModal} = useModalHook();

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

    const noteActions = [
        {
            tooltipText: 'Редактировать',
            component: () => <Edit fontSize={"small"} onClick={openModal}/>
        },
        {
            tooltipText: 'Вернуть из архива',
            component: () => <Archive fontSize={"small"} onClick={() => unArchiveNote(note)}/>
        },
        {
            tooltipText: 'Удалить',
            component: () => <Delete fontSize={"small"} onClick={() => deleteNote(note)}/>
        },
    ];


    return (
        <StyledCard>
            <NoteContent title={note.title} text={note.text}/>
            <CardActions>
                {noteActions.map((item, i) => <NoteAction key={i} settings={item}/>)}
            </CardActions>
            <EditModal open={modalIsOpen} closeModal={closeModal} note={note}
                       noteType={'archivedNotes'} noteSetter={'setArchivedNotes'}
            />
        </StyledCard>
    );
};

type NotePropsType = {
    note: NoteType
}