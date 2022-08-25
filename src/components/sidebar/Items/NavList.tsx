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
            <List onMouseEnter={onMouseHandler} onMouseLeave={onMouseHandler}>
                {
                    listItem.map((item, index) => {
                        const activeClass = activeIndex === index;
                        return (
                            <ListItem key={item.id} disablePadding sx={{
                                display: 'block',
                                backgroundColor: `${activeClass ? '#fdefc3' : ''}`,
                                borderRadius: '10%/50%'
                            }}>
                                <Link to={item.route}
                                      style={{textDecoration: 'none', display: 'flex', color: 'inherit'}}>
                                    <ListItemButton onClick={() => setActiveHandler(index)}
                                                    sx={{
                                                        minHeight: 15,
                                                        justifyContent: open ? 'initial' : 'center',
                                                        px: 2.5,

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
