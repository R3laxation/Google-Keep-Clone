import {CardActions} from '@mui/material';
import React, {useContext} from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {
    DeleteForeverOutlined as Delete,
    EditOutlined as Edit,
    RestoreFromTrashOutlined as Restore
} from '@mui/icons-material';
import {DataContext} from "../../../context/DataProvider";
import {saveDeletedToLocalStorage, saveNotesToLocalStorage} from "../../../utils/localStorage/localStorage";
import {StyledCard} from "../note/Note";
import {NoteContent} from "../noteContent/NoteContent";
import {NoteAction} from '../noteAction/NoteAction';
import {useModalHook} from "../../../context/useModalHook";
import {EditModal} from "../../modals/EditModal";

export const DeletedNote = ({note}: NotePropsType) => {

    const {setDeletedNotes, notes, setNotes, deletedNotes, setAlert} = useContext(DataContext);
    const {modalIsOpen, openModal, closeModal} = useModalHook();

    const restoreNote = (note: NoteType) => {
        setAlert('Заметка восстановлена')
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
            tooltipText: 'Удалить навсегда',
            component: () => <Delete fontSize={"small"} onClick={() => deleteNote(note)}/>
        },
        {
            tooltipText: 'Восстановить',
            component: () => <Restore fontSize={"small"} onClick={() => restoreNote(note)}/>
        },
    ];


    return (
        <StyledCard>
            <NoteContent title={note.title} text={note.text}/>
            <CardActions>
                {noteActions.map((item, i) => <NoteAction key={i} settings={item}/>)}
            </CardActions>
            <EditModal open={modalIsOpen} closeModal={closeModal} note={note}
                       noteType={'deletedNotes'} noteSetter={'setDeletedNotes'}
            />
        </StyledCard>
    );
};

type NotePropsType = {
    note: NoteType
}