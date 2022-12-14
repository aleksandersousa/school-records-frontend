import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useAppSelector, useOnClickOutside, useAppDispatch } from '@/hooks';
import {
  Actions,
  ActionText,
  Avatar,
  Container,
  DropdownOption,
  ProfileDropdownMenu,
  Title,
  UserProfile,
  UserProfileAvatar,
  UserProfileText,
} from './styles';
import noAvatar from '@/assets/no_avatar.png';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '@/config';
import { CurrentPage } from './typing';
import { logout } from '@/redux/thunks/auth';
import { showToast } from '@/utils/notifiers';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser } = useAppSelector(state => state.user);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState<CurrentPage>(CurrentPage.Home);

  const dropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useOnClickOutside(dropdownRef, (): void => setShowProfileDropdown(false));

  const showDropdown = (): void => {
    setShowProfileDropdown(true);
  };

  const onLogout = async (): Promise<void> => {
    try {
      await dispatch(logout());
    } catch (error) {
      showToast('Erro inesperado.', 'error');
    }
  };

  const configureCurrentPage = (pathname: string): void => {
    const path = pathname.split('/');
    const homeRouteFragment = routes.defaults.source;
    const collegeSubjectsRouteFragment = routes.privates.collegeSubjects.routeFragment;
    const coursesRouteFragment = routes.privates.courses.routeFragment;
    const resultsRouteFragment = routes.privates.results.routeFragment;
    const studentsRouteFragment = routes.privates.students.routeFragment;

    if (path[path.length - 1] === homeRouteFragment) {
      setCurrentPage(CurrentPage.Home);
    } else if (path[path.length - 1] === collegeSubjectsRouteFragment) {
      setCurrentPage(CurrentPage.CollegeSubjects);
    } else if (path[path.length - 1] === coursesRouteFragment) {
      setCurrentPage(CurrentPage.Courses);
    } else if (path[path.length - 1] === resultsRouteFragment) {
      setCurrentPage(CurrentPage.Results);
    } else if (path[path.length - 1] === studentsRouteFragment) {
      setCurrentPage(CurrentPage.Students);
    } else {
      setCurrentPage(-1);
    }
  };

  const goToCollegeSubjects = (): void => {
    navigate(routes.privates.collegeSubjects.routeFragment);
  };
  const goToCourses = (): void => {
    navigate(routes.privates.courses.routeFragment);
  };
  const goToResults = (): void => {
    navigate(routes.privates.results.routeFragment);
  };
  const goToStudents = (): void => {
    navigate(routes.privates.students.routeFragment);
    setShowProfileDropdown(false);
  };

  useEffect(() => configureCurrentPage(location.pathname), [location.pathname]);

  return (
    <Container>
      <Link to={routes.privates.home.path}>
        <Title>SchoolRecords</Title>
      </Link>

      <Actions>
        <ActionText
          role="button"
          className={currentPage === CurrentPage.CollegeSubjects ? 'active' : ''}
          onClick={goToCollegeSubjects}
        >
          <Icon icon="maki:college" />
          <label>Disciplinas</label>
        </ActionText>
        <ActionText
          role="button"
          className={currentPage === CurrentPage.Courses ? 'active' : ''}
          onClick={goToCourses}
        >
          <Icon icon="raphael:books" />
          <label>Cursos</label>
        </ActionText>
        <ActionText
          role="button"
          className={currentPage === CurrentPage.Results ? 'active' : ''}
          onClick={goToResults}
        >
          <Icon icon="carbon:result" />
          <label>Resultados</label>
        </ActionText>
        <ActionText
          role="button"
          className={currentPage === CurrentPage.Students ? 'active' : ''}
          onClick={goToStudents}
        >
          <Icon icon="mdi:account-student" />
          <label>Alunos</label>
        </ActionText>
      </Actions>

      <UserProfile>
        <UserProfileText>
          <span>{currentUser?.name}</span>
        </UserProfileText>
        <UserProfileAvatar role="button" onClick={showDropdown}>
          <Avatar src={currentUser?.avatar_url ?? noAvatar} />
        </UserProfileAvatar>
      </UserProfile>

      <ProfileDropdownMenu ref={dropdownRef} open={showProfileDropdown}>
        <DropdownOption onClick={onLogout}>
          <Icon icon="mdi:logout" />
          <label>Sair</label>
        </DropdownOption>
      </ProfileDropdownMenu>
    </Container>
  );
};

export default Navbar;
