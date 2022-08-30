import React from 'react';
import {Typography, CardContent} from "@mui/material";

export const NoteContent = ({title, text}: CardContentPropsType) => {
    return (
        <CardContent sx={{wordBreak: 'break-word'}}>
            {
                title || text
                    ? <>
                        <Typography>{title}</Typography>
                        <Typography>{text}</Typography>
                    </>
                    : <Typography sx={{color: '#80868b', width: '100%', textAlign: 'center', fontSize: '22px'}}>Пустая заметка </Typography>
            }
        </CardContent>
    );
};

type CardContentPropsType = {
    title: string
    text: string
}