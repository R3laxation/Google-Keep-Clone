import {Box, Grid} from '@mui/material';
import React, {useContext} from 'react';
import {styled} from "@mui/material/styles";import { NoteType } from '../addNoteForm/AddNoteForm';
import { DataContext } from '../../../context/DataProvider';
import {DeletedNote} from "./DeletedNote";

const DrawerHeader = styled('div')(({theme}) => ({
    ...theme.mixins.toolbar,
}));

export const DeletedNotes = () => {

    const {deletedNotes} = useContext(DataContext);

    return (
        <Box sx={{display: 'flex', width: '100%'}}>
            <Box sx={{p: 3, width: '100%'}}>
                <DrawerHeader/>
                        <Grid container style={{marginTop: 16}}>
                            {
                                deletedNotes.map((note: NoteType) => (
                                <DeletedNote note={note} key={note.id}/>
                            ))
                            }
                        </Grid>

            </Box>
        </Box>

    );
};
