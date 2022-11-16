import styled from 'styled-components';

export const Container = styled.button`
  padding: 0.625rem 1rem;

  display: flex;
  justify-content: center;
  gap: 0.5rem;

  transition: all 0.2s ease-in-out;

  font-weight: 500;
  font-size: ${({ theme }): string => theme.tipography.fontSizes.paragraph};
  color: ${({ theme }): string => theme.colors.secondary.light};
  background-color: ${({ theme }): string => theme.colors.primary.default};

  border-radius: ${({ theme }): string => theme.tipography.borderRadius};

  &:hover {
    background-color: ${({ theme }): string => theme.colors.primary.hover};
  }
  &:focus {
    background-color: ${({ theme }): string => theme.colors.primary.active};
  }
`;
