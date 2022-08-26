import React, {useContext, useEffect} from 'react';
import {Alert, Stack} from "@mui/material";
import {DataContext} from "../context/DataProvider";

export const AlertComponent = () => {

    const {alertIsOpen} = useContext(DataContext);

    useEffect(() => {console.log(alertIsOpen,"in alert")},[alertIsOpen])

    return (
        <Stack sx={{width: '100%'}} spacing={2}>
            {
                alertIsOpen && <Alert variant="filled" severity="success" sx={{width: 300, height: 'max-content', zIndex: 1500,  position: 'fixed', left: '60px', bottom: '20px'}} >
                Заметка добавлена в архив
                </Alert>
            }
        </Stack>
    );
};

