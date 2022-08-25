import {Box, Grid} from '@mui/material';
import React, {useContext} from 'react';
import {styled} from "@mui/material/styles";
import { NoteType } from '../addNoteForm/AddNoteForm';
import {DataContext} from "../../../context/DataProvider";
import {ArchivedNote} from "./ArchivedNote";


const DrawerHeader = styled('div')(({theme}) => ({
    ...theme.mixins.toolbar,
}));

export const ArchivedNotes = () => {

    const {archivedNotes} = useContext(DataContext);



    return (
        <Box sx={{display: 'flex', width: '100%'}}>
            <Box sx={{p: 3, width: '100%'}}>
                <DrawerHeader/>
                <Grid container style={{marginTop: 16}}>
                    {
                        archivedNotes.map((note: NoteType) => (
                        <ArchivedNote note={note} key={note.id}/>
                    ))
                    }
                </Grid>
            </Box>
        </Box>

    );
};
