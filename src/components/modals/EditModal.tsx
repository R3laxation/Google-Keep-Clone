import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {StyledCard} from "../notes/note/Note";
import {CardContent} from "@mui/material";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const EditModal = ({open, closeModal}: EditPropsType) => {

    return (
        <div>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                </Box>
            </Modal>
        </div>
    );
};

type EditPropsType =
    {
        open: boolean
        closeModal: () => void
    }