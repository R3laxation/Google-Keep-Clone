import * as React from 'react';
import {useContext, useEffect} from 'react';
import {CSSObject, styled, Theme} from '@mui/material/styles';
import {Alert, Box, Drawer as MuiDrawer, Stack} from '@mui/material';
import {NavList} from "./Items/NavList";
import {Header} from './header/Header';
import {DataContext} from "../../context/DataProvider";
import {getFromLocalStorage} from '../../utils/localStorage/localStorage';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;',
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    borderRight: 'none',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export const Sidebar = () => {
    const [open, setOpen] = React.useState(false);
    const [buttonIsClicked, setButtonIsClicked] = React.useState(false);

    const {setNotes, setArchivedNotes, setDeletedNotes} = useContext(DataContext);

    const handleDrawer = () => {
        setOpen(prevState => !prevState);
    };

    const clickedButtonHandler = () => {
        setButtonIsClicked(prevState => !prevState);
    };

    useEffect(() => {
        const actions = [
            {
                name: 'google-keep-clone-notes',
                action: setNotes
            },
            {
                name: 'google-keep-clone-archived',
                action: setArchivedNotes
            },
            {
                name: 'google-keep-clone-deleted',
                action: setDeletedNotes
            }
        ]
        actions.forEach(({name, action}) => getFromLocalStorage(name, action));
    }, [])

    return (
        <Box sx={{display: 'flex'}}>
            <Header open={open} handleDrawer={handleDrawer} clickedButtonHandler={clickedButtonHandler}/>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                </DrawerHeader>
                <NavList open={open} handleDrawer={handleDrawer} buttonIsClicked={buttonIsClicked}/>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
            </Box>
        </Box>
    );
}
