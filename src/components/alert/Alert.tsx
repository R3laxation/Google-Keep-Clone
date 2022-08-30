import React, {useContext} from 'react';
import {Alert, Stack, styled} from "@mui/material";
import {DataContext} from "../../context/DataProvider";


const CustomAlert = styled(Alert)`
  width: 300px;
  height: max-content;
  z-index: 1500;
  position: fixed;
  left: 60px;
  bottom: 20px;
  background-color: #2e2e2e;
  color: #feefc4;
  transition: all 1500ms ease;
`

export const AlertComponent = () => {

    const {alert} = useContext(DataContext);

    return (
        <Stack sx={{width: '100%'}} spacing={2}>
            {
                alert && <CustomAlert variant="filled" severity="success" >
                    {alert}
                </CustomAlert>
            }
        </Stack>
    );
};

