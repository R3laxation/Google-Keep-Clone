import {Card, CardActions, styled} from '@mui/material';
import React, {useContext} from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {DataContext} from "../../../context/DataProvider";
import {
    saveArchivedToLocalStorage,
    saveDeletedToLocalStorage,
    saveNotesToLocalStorage
} from "../../../utils/localStorage/localStorage";
import {EditModal} from "../../modals/EditModal";
import {NoteContent} from "../noteContent/NoteContent";
import {NoteAction} from "../noteAction/NoteAction";
import {ArchiveOutlined as Archive, DeleteOutlined as Delete, EditOutlined as Edit} from '@mui/icons-material';
import {useModalHook} from "../../../utils/useModalHook/useModalHook";

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

export const Note = ({note}: NotePropsType) => {

    const {
        setArchivedNotes, setDeletedNotes, notes,
        setNotes, archivedNotes, deletedNotes, setAlert
    } = useContext(DataContext);
    const {modalIsOpen, toggleEditModal} = useModalHook();

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

    const noteActions = [
        {
            tooltipText: 'Редактировать',
            component: () => <Edit fontSize={"small"} onClick={toggleEditModal}/>
        },
        {
            tooltipText: 'Добавить в архив',
            component: () => <Archive fontSize={"small"} onClick={() => archiveNote(note)}/>
        },
        {
            tooltipText: 'Удалить',
            component: () => <Delete fontSize={"small"} onClick={() => deleteNote(note)}/>
        },
    ];

    return (
        <>
            <StyledCard>
                <NoteContent title={note.title} text={note.text}/>
                <CardActions>
                    {noteActions.map((item, i) => <NoteAction key={i} settings={item}/>)}
                </CardActions>
                <EditModal open={modalIsOpen} closeModal={toggleEditModal} note={note}
                           noteType={'notes'} noteSetter={'setNotes'}/>
            </StyledCard>
        </>
    );
};

type NotePropsType = {
    note: NoteType
}