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
import {useModalHook} from "../../../utils/useModalHook/useModalHook";
import {EditModal} from "../../modals/EditModal";
import {DeleteModal} from '../../modals/DeleteModal';

export const DeletedNote = ({note}: NotePropsType) => {

    const {setDeletedNotes, notes, setNotes, deletedNotes, setAlert} = useContext(DataContext);
    const {modalIsOpen, toggleEditModal, toggleDeleteModal, isEdit} = useModalHook();


    const restoreNote = (note: NoteType) => {
        setAlert('Заметка восстановлена')
        const updatedNotes = deletedNotes.filter((data) => data.id !== note.id);
        const restored = [note, ...notes];
        setDeletedNotes(updatedNotes);
        setNotes(restored);
        saveDeletedToLocalStorage(updatedNotes);
        saveNotesToLocalStorage(restored);
        setTimeout(() => {
            setAlert('')
        }, 2000)
    }

    const deleteNote = (note: NoteType) => {
        const updatedNotes = deletedNotes.filter((data) => data.id !== note.id);
        setDeletedNotes(updatedNotes);
        saveDeletedToLocalStorage(updatedNotes);
    }

    const noteActions = [
        {
            tooltipText: 'Редактировать',
            component: () => <Edit fontSize={"small"} onClick={toggleEditModal}/>
        },
        {
            tooltipText: 'Восстановить',
            component: () => <Restore fontSize={"small"} onClick={() => restoreNote(note)}/>
        },
        {
            tooltipText: 'Удалить навсегда',
            component: () => <Delete fontSize={"small"} onClick={toggleDeleteModal}/>
        },
    ];


    return (
        <StyledCard>
            <NoteContent title={note.title} text={note.text}/>
            <CardActions>
                {noteActions.map((item, i) => <NoteAction key={i} settings={item}/>)}
            </CardActions>
            {isEdit
                ? <EditModal open={modalIsOpen} closeModal={toggleEditModal} note={note}
                             noteType={'deletedNotes'} noteSetter={'setDeletedNotes'}
                />
                : <DeleteModal open={modalIsOpen} closeModal={toggleDeleteModal} deleteNote={deleteNote} note={note}/>
            }
        </StyledCard>
    );
};

type NotePropsType = {
    note: NoteType
}