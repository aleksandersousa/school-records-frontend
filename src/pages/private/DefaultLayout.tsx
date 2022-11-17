import React, { useCallback, useEffect } from 'react';
import { LoadingCircle, Navbar } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';

import { Outlet } from 'react-router-dom';
import { Container } from './styles';
import { getCourses } from '@/redux/thunks/courses';
import { getTypeOfResults } from '@/redux/thunks/typeOfResults';
import { getCollegeSubjects } from '@/redux/thunks/collegeSubjects';
import { getStudents } from '@/redux/thunks/students';

const DefaultLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading: isLoadingCourses } = useAppSelector(state => state.courses);
  const { isLoading: isLoadingTypeOfResults } = useAppSelector(
    state => state.typeOfResults
  );
  const { isLoading: isLoadingCollegeSubejcts } = useAppSelector(
    state => state.collegeSubjects
  );
  const { isLoading: isLoadingStudents } = useAppSelector(state => state.students);

  const isLoading = useCallback(
    (): boolean =>
      isLoadingCourses ||
      isLoadingTypeOfResults ||
      isLoadingCollegeSubejcts ||
      isLoadingStudents,
    [
      isLoadingCourses,
      isLoadingTypeOfResults,
      isLoadingCollegeSubejcts,
      isLoadingStudents,
    ]
  );

  useEffect(() => {
    void dispatch(getCourses());
    void dispatch(getCollegeSubjects());
    void dispatch(getStudents());
    void dispatch(getTypeOfResults());
  }, []);

  if (isLoading()) {
    <LoadingCircle />;
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
