import React, { useEffect } from 'react';
import { LoagingCircle, Navbar } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';

import { Outlet } from 'react-router-dom';
import { Container } from './styles';
import { getCourses } from '@/redux/thunks/courses';

const DefaultLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading: isLoadingCourses } = useAppSelector(state => state.courses);

  useEffect(() => {
    void dispatch(getCourses());
  }, []);

  if (isLoadingCourses) {
    <LoagingCircle />;
  }

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
