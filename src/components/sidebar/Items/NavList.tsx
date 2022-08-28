import React, {useRef, useState} from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
    ArchiveOutlined as Archive,
    DeleteOutlineOutlined as Delete,
    LightbulbOutlined as LightBulb
} from "@mui/icons-material";
import {Link} from 'react-router-dom';
import styles from './NavList.module.css';
import {alpha, Box, styled} from "@mui/material";



// const StyledListItem = styled(ListItem)`
//   display: 'flex';
//   background-color: `${activeClass ? '#fdefc3' : ''}`;
//   transition: 'color 1500ms easy';
//   border-radius: '34px';
//   border-bottom-left-radius: open ?  0: '34px';
//   border-bottom-right-radius: open ?  0: '34px';
//   height: '64px', ":hover": {
//   background-color: : `${activeClass ? '#fdefc3' : '#f1f3f4'}`
// };
// `




export const NavList = ({open, handleDrawer, buttonIsClicked}: NavListPropsType) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const listItem = [
        {id: 1, name: 'Заметки', icon: <LightBulb/>, route: '/'},
        {id: 2, name: 'Архив', icon: <Archive/>, route: '/archive'},
        {id: 3, name: 'Корзина', icon: <Delete/>, route: 'delete'}
    ]

    const onMouseHandler = () => {
        if (!buttonIsClicked) {
            handleDrawer()
        }
    }

    const setActiveHandler = (index: number) => {
        setActiveIndex(index)
    }

    return (
        <div>
            <List onMouseEnter={onMouseHandler} onMouseLeave={onMouseHandler} >
                {
                    listItem.map((item, index) => {
                        const activeClass = activeIndex === index;
                        return (
                            <ListItem key={item.id} disablePadding sx={{
                                display: 'flex',
                                backgroundColor: `${activeClass ? '#fdefc3' : ''}`,
                                transition: 'background-color 200ms ease',
                                borderRadius: '34px',
                                borderBottomLeftRadius: open ? 0 : '34px',
                                borderTopLeftRadius: open ? 0 : '34px',
                                height: '64px',
                                ":hover" : {
                                    backgroundColor: `${activeClass ? '#fdefc3' : '#f1f3f4'}`
                                },
                            }
                            }>
                                <Link to={item.route} className={styles.link}
                                      style={{textDecoration: 'none', display: 'flex', color: 'inherit'}}>
                                    <ListItemButton onClick={() => setActiveHandler(index)}
                                                    sx={{
                                                        minHeight: 15,
                                                        justifyContent: open ? 'initial' : 'center',
                                                        px: 2.5,
                                                        backgroundColor: 'transparent !important',
                                                        ":hover": {
                                                            backgroundColor:  'unset',
                                                        },
                                                    }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} sx={{opacity: open ? 1 : 0}}/>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        )
                    })}
            </List>
        </div>
    );
};

type NavListPropsType = {
    open: boolean
    handleDrawer: () => void
    buttonIsClicked: boolean
}
