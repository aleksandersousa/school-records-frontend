import styled from 'styled-components';
import { ProfileDropdownMenuProps } from './typing';

export const Container = styled.div``;

export const Title = styled.h5`
  font-weight: 700;
  color: ${({ theme }): string => theme.colors.primary.default};
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 810px) {
    display: none;
  }
`;

export const UserProfileText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span {
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }): string => theme.colors.terciary.dark};
  }

  p {
    text-transform: uppercase;
    font-size: 0.625rem;
    font-weight: 400;
    color: ${({ theme }): string => theme.colors.terciary.dark};
  }
`;

export const UserProfileAvatar = styled.div`
  border: 2px solid ${({ theme }): string => theme.colors.primary.default};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileDropdownMenu = styled.div<ProfileDropdownMenuProps>`
  display: ${({ open }): string => (open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1rem;

  background-color: ${({ theme }): string => theme.colors.secondary.light};
  width: 40vw;
  max-width: 189px;
  max-height: 200px;
  margin: 0 auto 0;
  padding: 3vh 2vw;
  border-radius: 4px;
  z-index: 10;
  transition: ease-in 400ms;
  position: absolute;
  right: 16px;
  top: 70px;

  box-shadow: 0px 4px 30px rgba(220, 216, 216, 0.25);
  -webkit-box-shadow: 0px 4px 30px rgba(220, 216, 216, 0.25);

  @media (max-width: 767.9px) {
    width: 60vw;
    padding: 2vh 1.5vw;
  }

  @media (max-width: 379.9px) {
    width: 80vw;
  }
`;

export const DropdownOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }): string => theme.colors.primary.hover};
  }

  label {
    cursor: pointer;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
