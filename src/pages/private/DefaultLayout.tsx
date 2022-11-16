import { Navbar } from '@/components';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from './styles';

const DefaultLayout: React.FC = () => {
  return (
    <>
      <Navbar />

      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default DefaultLayout;
