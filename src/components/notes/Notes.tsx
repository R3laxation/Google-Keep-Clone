import {Box, Grid} from '@mui/material';
import React, {useContext} from 'react';
import {styled} from "@mui/material/styles";
import {AddNoteForm} from "./addNoteForm/AddNoteForm";
import {Note} from './note/Note';
import {DataContext} from '../../context/DataProvider';
import {EmptyNotes} from "./emptyNotes/EmptyNotes";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';


const DrawerHeader = styled('div')(({theme}) => ({
    ...theme.mixins.toolbar,
}));

const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const Notes = () => {

    const {notes, setNotes} = useContext(DataContext);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const items: any = reorder(
            notes,
            result.source.index,
            result.destination.index
        );

        setNotes(items)
    }

    return (
        <Box sx={{display: 'flex', width: '100%'}}>
            <Box sx={{p: 3, width: '100%'}}>
                <DrawerHeader/>
                <AddNoteForm/>
                {
                    notes.length > 0
                        ? <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <Grid container style={{marginTop: 16}} {...provided.droppableProps}
                                          ref={provided.innerRef}>
                                        {
                                            notes.map((note, index) => (
                                                <Draggable key={note.id} draggableId={note.id} index={index}>
                                                    {(provided) => (
                                                        <Grid item
                                                              ref={provided.innerRef}
                                                              {...provided.draggableProps}
                                                              {...provided.dragHandleProps}>
                                                            <Note note={note}/>
                                                        </Grid>
                                                    )}
                                                </Draggable>

                                            ))
                                        }
                                    </Grid>
                                )}
                            </Droppable>
                        </DragDropContext>
                        : <EmptyNotes/>
                }
            </Box>
        </Box>

    );
};
