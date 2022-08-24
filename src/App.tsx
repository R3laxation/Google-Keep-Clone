import {Box} from '@mui/material';
import React from 'react';
import './App.css';
import {Notes} from './components/notes/Notes';
import {Sidebar} from './components/sidebar/Sidebar';
import {DataProvider} from "./context/DataProvider";

function App() {
    return (
        <DataProvider>
            <Box style={{display: 'flex', width: '100%'}}>
                <Sidebar/>
                <Notes/>
            </Box>
        </DataProvider>
    );
}

export default App;
