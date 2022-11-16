import React, { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
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
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { Link } from 'react-router-dom';
import { routes } from '@/config';
import { signout } from '@/services/userServices';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { showToast } from '@/utils/notifiers';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector(state => state.user);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const dropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useOnClickOutside(dropdownRef, (): void => setShowProfileDropdown(false));

  const showDropdown = (): void => {
    setShowProfileDropdown(true);
  };

  const onLogout = async (): Promise<void> => {
    try {
      await signout(dispatch);
      showToast('Saiu com sucesso!', 'success');
    } catch (error) {
      showToast('Erro ao sair', 'error');
      console.log(error);
    }
  };

  return (
    <Container>
      <Link to={routes.privates.home.path}>
        <Title>SchoolRecords</Title>
      </Link>

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
