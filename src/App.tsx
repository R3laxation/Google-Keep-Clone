import {Box} from '@mui/material';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';import { DataProvider } from './context/DataProvider';
import {Sidebar} from "./components/sidebar/Sidebar";
import { Notes } from './components/notes/Notes';
import { DeletedNotes } from './components/notes/deletedNotes/DeletedNotes';
import { ArchivedNotes } from './components/notes/arhivedNotes/ArchivedNotes';



function App() {
    return (
        <DataProvider>
            <Box style={{display: 'flex', width: '100%'}}>
                <Sidebar/>
                <Routes>
                    <Route path={'/'} element={<Notes/>}/>
                    <Route path={'/archive'} element={<ArchivedNotes/>}/>
                    <Route path={'/delete'} element={<DeletedNotes/>}/>
                </Routes>
            </Box>
        </DataProvider>
    );
}

export default App;
