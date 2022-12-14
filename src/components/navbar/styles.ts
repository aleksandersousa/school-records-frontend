import styled from 'styled-components';
import { ProfileDropdownMenuProps } from './typing';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.5rem 2rem;
  background-color: ${({ theme }): string => theme.colors.primary.white};

  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
  box-shadow: 0px 4px 30px rgba(220, 216, 216, 0.25);
  -webkit-box-shadow: 0px 4px 30px rgba(220, 216, 216, 0.25);
  z-index: 2;

  @media (max-width: 810px) {
    padding: 0 1rem;
    height: 60px;
    justify-content: unset;
  }

  @media (max-width: ${({ theme }): string => theme.breakpoints.xs}) {
    justify-content: space-between;
  }
`;

export const Title = styled.h5`
  font-weight: 700;
  color: ${({ theme }): string => theme.colors.primary.default};

  cursor: pointer;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 810px) {
    margin-left: 2rem;
  }

  @media (max-width: ${({ theme }): string => theme.breakpoints.xs}) {
    margin-left: unset;
    display: none;
  }
`;

export const ActionText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  color: ${({ theme }): string => theme.colors.primary.default};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${({ theme }): string => theme.colors.primary.hover};
  }

  &.active {
    color: ${({ theme }): string => theme.colors.primary.active};
  }

  svg {
    width: 24px;
    height: 24px;
  }
  label {
    cursor: pointer;
  }
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
    color: ${({ theme }): string => theme.colors.text.dark};
  }

  p {
    text-transform: uppercase;
    font-size: 0.625rem;
    font-weight: 400;
    color: ${({ theme }): string => theme.colors.text.dark};
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

  background-color: ${({ theme }): string => theme.colors.primary.white};
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
  top: 60px;

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
