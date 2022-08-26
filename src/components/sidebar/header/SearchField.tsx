import React, {ChangeEvent, useContext, useState} from 'react';
import {alpha, Box, InputBase, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {DataContext} from "../../../context/DataProvider";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.05),
    },
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(7),
        width: '500px',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    color: '#606265',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   ' &:hover' : {
        cursor: 'pointer'
}
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: '#606265',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const SearchField = () => {

    const {setSearchValue} = useContext(DataContext);

    const [tempValue, setTempValue] = useState('');

    const onTextChange = (e: ChangeEvent) => {
        // setSearchValue((e.target as HTMLInputElement).value)
        setTempValue((e.target as HTMLInputElement).value)
    }

    const onAddSearchValue = () => {
        setSearchValue(tempValue)
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <Search>
                <SearchIconWrapper onClick={onAddSearchValue} >
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Поиск"
                    inputProps={{'aria-label': 'search'}}
                    value={tempValue} onChange={(e) => onTextChange(e)}
                />
            </Search>
        </Box>

    );
};

