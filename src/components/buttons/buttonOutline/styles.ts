import styled from 'styled-components';

export const Container = styled.button`
  padding: 0.625rem 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  transition: all 0.2s ease-in-out;

  font-weight: 500;
  font-size: ${({ theme }): string => theme.tipography.fontSizes.paragraph};
  color: ${({ theme }): string => theme.colors.primary.default};
  background-color: ${({ theme }): string => theme.colors.primary.white};

  border-radius: ${({ theme }): string => theme.tipography.borderRadius};
  border: 1px solid ${({ theme }): string => theme.colors.primary.default};

  &:hover {
    border: 1px solid ${({ theme }): string => theme.colors.primary.hover};
    color: ${({ theme }): string => theme.colors.primary.hover};
  }
  &:focus {
    border: 1px solid ${({ theme }): string => theme.colors.primary.active};
    color: ${({ theme }): string => theme.colors.primary.active};
  }
`;
