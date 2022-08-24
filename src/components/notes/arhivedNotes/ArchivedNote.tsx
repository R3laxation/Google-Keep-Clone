import {Card, CardActions, CardContent, styled, Typography} from '@mui/material';
import React, { useContext } from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {UnarchiveOutlined as Unarchive, DeleteOutlined as Delete} from '@mui/icons-material';
import {DataContext} from "../../../context/DataProvider";


const StyledCard = styled(Card)`
  width: 240px;
  margin: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`

export const ArchivedNote = ({note}: NotePropsType) => {

    const {setArchiveNotes, setDeletedNotes, notes, setNotes, archiveNotes} = useContext(DataContext);

    const unArchiveNote = (note: NoteType) => {
        const updatedNotes = archiveNotes.filter((data) => data.id !== note.id);
        setArchiveNotes(updatedNotes);
        setNotes((prevArr) => [note, ...prevArr]);
    }

    const deleteNote = (note: NoteType) => {
        const updatedNotes = notes.filter((data) => data.id !== note.id);
        setArchiveNotes(updatedNotes);
        setDeletedNotes((prevArr) => [note, ...prevArr]);
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography>{note.title}</Typography>
                <Typography>{note.text}</Typography>
            </CardContent>
            <CardActions>
                <Unarchive fontSize={"small"} style={{marginLeft: 'auto'}} onClick={() => unArchiveNote(note)}/>
                <Delete fontSize={"small"} onClick={() => deleteNote(note)}/>
            </CardActions>
        </StyledCard>
    );
};

type NotePropsType = {
    note: NoteType
}