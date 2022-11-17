import React from 'react';
import { LoagingCircle, Navbar } from '@/components';
import { useFetch, useAppDispatch, useAppSelector } from '@/hooks';
import {
  coursesClear,
  coursesFailure,
  getCoursesStart,
  setCourses,
} from '@/redux/slices/courses';
import { Outlet } from 'react-router-dom';
import { Container } from './styles';
import { showToast } from '@/utils/notifiers';

const DefaultLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading: isLoadingCourses, error: errorCourses } = useAppSelector(
    state => state.courses
  );

  useFetch('/courses', getCoursesStart, setCourses, coursesFailure);

  if (errorCourses) {
    dispatch(coursesClear());
    showToast('Erro ao pegar cursos.', 'error');
  }

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
