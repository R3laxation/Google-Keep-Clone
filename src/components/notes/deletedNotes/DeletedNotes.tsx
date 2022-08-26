import {Box, Grid} from '@mui/material';
import React, {useContext} from 'react';
import {styled} from "@mui/material/styles";
import {NoteType} from '../addNoteForm/AddNoteForm';
import {DataContext} from '../../../context/DataProvider';
import {DeletedNote} from "./DeletedNote";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {ArchivedNote} from "../arhivedNotes/ArchivedNote";

const DrawerHeader = styled('div')(({theme}) => ({
    ...theme.mixins.toolbar,
}));

const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const DeletedNotes = () => {

    const {deletedNotes, setDeletedNotes} = useContext(DataContext);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const items: any = reorder(
            deletedNotes,
            result.source.index,
            result.destination.index
        );

        setDeletedNotes(items)
    }

    return (
        <Box sx={{display: 'flex', width: '100%'}}>
            <Box sx={{p: 3, width: '100%'}}>
                <DrawerHeader/>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <Grid container style={{marginTop: 16}} {...provided.droppableProps}
                                  ref={provided.innerRef}>
                                <Grid container style={{marginTop: 16}}>
                                    {
                                        deletedNotes.map((note, index) => (
                                            <Draggable key={note.id} draggableId={note.id} index={index}>
                                                {(provided) => (
                                                    <Grid item
                                                          ref={provided.innerRef}
                                                          {...provided.draggableProps}
                                                          {...provided.dragHandleProps}>
                                                        <DeletedNote note={note}/>
                                                    </Grid>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
        </Box>

    );
};
