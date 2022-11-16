import React from 'react';
import { Container, Welcome } from './styles';
import welcome from '@/assets/welcome.webp';

const Home: React.FC = () => {
  return (
    <Container>
      <Welcome src={welcome} />
    </Container>
  );
};

export default Home;
