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

const Navbar: React.FC = () => {
  // const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector(state => state.user);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const dropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const showDropdown = (): void => {
    setShowProfileDropdown(true);
  };

  const onLogout = async (): Promise<void> => {
    try {
      // await logoutDoctorCall();
      // dispatch(logoutDoctor());
    } catch (error) {
      // showToast('Erro!', 'Erro ao sair.');
      console.log(error);
    }
  };

  return (
    <Container>
      <Title>SchoolRecords</Title>

      <UserProfile>
        <UserProfileText>
          <span>{currentUser?.name}</span>
        </UserProfileText>
        <UserProfileAvatar role="button" onClick={showDropdown}>
          <Avatar src={currentUser !== null ? currentUser.avatar_url : noAvatar} />
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
