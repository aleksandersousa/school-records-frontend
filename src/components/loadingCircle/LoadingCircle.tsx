import { CircularProgress } from '@mui/material';
import React from 'react';
import { Background, Container } from './styles';

const LoadingCircle: React.FC = () => {
  return (
    <Background>
      <Container>
        <CircularProgress />
      </Container>
    </Background>
  );
};

export default LoadingCircle;
