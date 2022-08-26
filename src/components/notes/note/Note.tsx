import {Card, CardActions, CardContent, styled, Typography} from '@mui/material';
import React, { useContext } from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {ArchiveOutlined as Archive, DeleteOutlined as Delete} from '@mui/icons-material';
import {DataContext} from "../../../context/DataProvider";


const StyledCard = styled(Card)`
  width: 240px;
  margin: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`

export const Note = ({note}: NotePropsType) => {

    const {setArchivedNotes, setDeletedNotes, notes, setNotes} = useContext(DataContext);

    const archiveNote = (note: NoteType) => {
        const updatedNotes = notes.filter((data) => data.id !== note.id);
        setNotes(updatedNotes);
        setArchivedNotes((prevArr) => [note, ...prevArr]);
    }

    const deleteNote = (note: NoteType) => {
        const updatedNotes = notes.filter((data) => data.id !== note.id);
        setNotes(updatedNotes);
        setDeletedNotes((prevArr) => [note, ...prevArr]);
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography>{note.title}</Typography>
                <Typography>{note.text}</Typography>
            </CardContent>
            <CardActions>
                <Archive fontSize={"small"} style={{marginLeft: 'auto'}} onClick={() => archiveNote(note)}/>
                <Delete fontSize={"small"} onClick={() => deleteNote(note)}/>
            </CardActions>
        </StyledCard>
    );
};

type NotePropsType = {
    note: NoteType
}