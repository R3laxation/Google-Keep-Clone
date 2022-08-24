import {Card, CardActions, CardContent, styled, Typography} from '@mui/material';
import React from 'react';
import {NoteType} from "../addNoteForm/AddNoteForm";
import {ArchiveOutlined as Archive, DeleteOutlined as Delete} from '@mui/icons-material';


const StyledCard = styled(Card)`
  width: 240px;
  margin: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`

export const Note = ({note}: NotePropsType) => {
    return (
        <StyledCard>
            <CardContent>
                <Typography>{note.title}</Typography>
                <Typography>{note.text}</Typography>
            </CardContent>
            <CardActions>
                <Archive fontSize={"small"} style={{marginLeft: 'auto'}}/>
                <Delete fontSize={"small"}/>
            </CardActions>
        </StyledCard>
    );
};

type NotePropsType = {
    note: NoteType
}