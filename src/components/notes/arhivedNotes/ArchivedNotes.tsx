import {Box, Grid} from '@mui/material';
import React, {useContext} from 'react';
import {styled} from "@mui/material/styles";
import {DataContext} from "../../../context/DataProvider";
import {ArchivedNote} from "./ArchivedNote";
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


export const ArchivedNotes = () => {

    const {archivedNotes, setArchivedNotes} = useContext(DataContext);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const items: any = reorder(
            archivedNotes,
            result.source.index,
            result.destination.index
        );

        setArchivedNotes(items)
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
                                        archivedNotes.map((note, index) => (
                                            <Draggable key={note.id} draggableId={note.id} index={index}>
                                                {(provided) => (
                                                    <Grid item
                                                          ref={provided.innerRef}
                                                          {...provided.draggableProps}
                                                          {...provided.dragHandleProps}>
                                                        <ArchivedNote note={note}/>
                                                    </Grid>
                                                )}
                                            </Draggable>
                                        ))}
                                </Grid>
                            </Grid>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
        </Box>

    );
};
