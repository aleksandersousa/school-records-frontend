import styled from 'styled-components';

interface Props {
  width?: string;
}

export const Container = styled.div<Props>`
  box-sizing: border-box;
  width: ${({ width }): string => (width ? `min(100%,  ${width})` : '400px')};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;

  .input {
    border: 1px solid ${({ theme }): string => theme.colors.neutral.medium};
    border-radius: ${({ theme }): string => theme.tipography.borderRadius};
    background-color: ${({ theme }): string => theme.colors.primary.white};
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.25rem 1rem 0.25rem 0;
    transition: all 0.2s ease-in-out;
    svg {
      cursor: pointer;
    }
    &.disabled {
      background-color: ${({ theme }): string => theme.colors.neutral.light};
    }
    &:hover,
    &:focus-within {
      border-color: ${({ theme }): string => theme.colors.primary.hover};
      &.disabled {
        border-color: ${({ theme }): string => theme.colors.neutral.medium};
      }
    }
  }
`;

export const Input = styled.input`
  background-color: ${({ theme }): string => theme.colors.primary.white};
  font-size: ${({ theme }): string => theme.tipography.fontSizes.label};
  color: ${({ theme }): string => theme.colors.text.medium};
  border: none;
  padding: 0.81rem 0 0.75rem 0.625rem;
  width: 100%;

  &.disabled {
    background-color: ${({ theme }): string => theme.colors.neutral.light};
    color: ${({ theme }): string => theme.colors.neutral.medium};
    &::placeholder {
      color: ${({ theme }): string => theme.colors.neutral.medium};
    }
  }
`;
