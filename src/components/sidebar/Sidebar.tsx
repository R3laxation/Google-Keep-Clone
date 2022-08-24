import * as React from 'react';
import {CSSObject, styled, Theme} from '@mui/material/styles';
import {Drawer as MuiDrawer, Box} from '@mui/material';
import {NavList} from "./Items/NavList";
import {Header} from './header/Header';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
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

    const handleDrawer = () => {
        setOpen(prevState => !prevState);
    };

    const clickedButtonHandler = () => {
        setButtonIsClicked(prevState => !prevState);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Header open={open} handleDrawer={handleDrawer} clickedButtonHandler={clickedButtonHandler}/>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                </DrawerHeader>
                <NavList open={open} handleDrawer={handleDrawer} buttonIsClicked={buttonIsClicked}/>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
            </Box>
        </Box>
    );
}
