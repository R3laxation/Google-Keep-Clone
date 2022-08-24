import {IconButton, Typography, Toolbar} from '@mui/material';
import AppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar/AppBar';
import * as React from 'react';
import {Menu} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import logo from '../../../assets/google-keep-logo-0BC92EBBBD-seeklogo.com.png';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const HeaderBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(() => (`
   z-index: 1201;
   background: #fff;
   height: 70px;
   box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px, rgba(0, 0, 0, 0.1) 0px 1px 1px;
   `
));

const Title = styled(Typography)`
  color: #606265;
  font-size: 24px;
`

export const Header = ({open, handleDrawer, clickedButtonHandler}: HeaderPropsType) => {

    const onClickHandler = () => {
        handleDrawer()
        clickedButtonHandler()
    }

    return (
        <HeaderBar open={open}>
            <Toolbar>
                <IconButton
                    onClick={onClickHandler}
                    edge="start"
                    sx={{marginRight: 2}}
                >
                    <Menu />
                </IconButton>
                <img src={logo} alt="logo" style={{width: '30px', marginRight: '20px' }}/>
                <Title>Keep</Title>
            </Toolbar>
        </HeaderBar>
    )
}

type HeaderPropsType = {
    open: boolean
    handleDrawer: () => void
    clickedButtonHandler: () => void
}