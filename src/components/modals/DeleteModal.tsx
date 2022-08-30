import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {Box, Button, DialogActions, DialogTitle, styled} from "@mui/material";
import {NoteType} from "../notes/addNoteForm/AddNoteForm";

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 50px;
  padding: 10px 15px;
  min-height: 20px;
  color: black;
`

export const DeleteModal = ({open, closeModal, deleteNote, note}: DeletePropsType) => {

    const closeModalHandler = () => {
        deleteNote(note)
        closeModal();
    }

    return (
        <div>
            <Dialog open={open} onClose={closeModal}>
                <DialogContent>
                    <Container>
                        <DialogTitle sx={{fontSize: '15px', color: 'gray'}}>
                            {"Удалить заметку навсегда?"}
                        </DialogTitle>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} sx={{fontSize: '15px', color: 'gray', textTransform: 'capitalize'}}>Отмена</Button>
                    <Button onClick={closeModalHandler}sx={{fontSize: '15px', textTransform: 'capitalize'}} color={'error'} autoFocus>
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

type DeletePropsType = {
    open: boolean
    closeModal: () => void
    deleteNote: (note: NoteType) => void
    note: NoteType
}