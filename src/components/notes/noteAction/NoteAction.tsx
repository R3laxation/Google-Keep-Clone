import React, {ReactComponentElement} from 'react';
import {Box, Tooltip} from "@mui/material";

export const iconStyle = {
    marginLeft: 'auto',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 300ms ease',
    ":hover": {
        backgroundColor: '#eaebeb'
    }
}

export const NoteAction = ({
                               settings
                           }: NoteActionsPropsType) => {

    const ComponentForRender = settings.component

    return (
        <Tooltip title={settings.tooltipText}>
            <Box sx={iconStyle}>
                    <ComponentForRender/>
            </Box>
        </Tooltip>
    );
};

type NoteActionsPropsType = {
    settings: {
        tooltipText: string,
        component: () => ReactComponentElement<any>
    }
}
