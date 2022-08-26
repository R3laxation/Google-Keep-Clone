import React from 'react';
import {LightbulbOutlined as Lightbulb} from '@mui/icons-material';
import {Box, Typography, styled} from '@mui/material';

const Light = styled(Lightbulb)`
  font-size: 120px;
  color: #eee9e9;
`
const Text = styled(Typography)`
  color: #80868b;
  font-size: 12px;
`

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
`

export const EmptyNotes = () => {
    return (
        <Container>
            <Light/>
            <Text>Здесь будут ваши заметки.</Text>
        </Container>
    );
};

