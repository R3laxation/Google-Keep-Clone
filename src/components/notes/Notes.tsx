import {Box, Grid} from '@mui/material';
import React, {useContext} from 'react';
import {styled} from "@mui/material/styles";
import {AddNoteForm} from "./addNoteForm/AddNoteForm";
import {Note} from './note/Note';
import {DataContext} from '../../context/DataProvider';
import {EmptyNotes} from "./emptyNotes/EmptyNotes";

const DrawerHeader = styled('div')(({theme}) => ({
    ...theme.mixins.toolbar,
}));

export const Notes = () => {

    const {notes} = useContext(DataContext);

    return (
        <Box sx={{display: 'flex', width: '100%'}}>
            <Box sx={{p: 3, width: '100%'}}>
                <DrawerHeader/>
                <AddNoteForm/>
                {
                    notes.length > 0
                    ? <Grid container style={{marginTop: 16}}>
                        {notes.map(note => (
                            <Note note={note}/>
                        ))}
                    </Grid>
                    : <EmptyNotes/>
                }
            </Box>
        </Box>

    );
};
