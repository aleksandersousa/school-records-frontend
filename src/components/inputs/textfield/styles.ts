import styled from 'styled-components';
import { WrapperProps } from './typing';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }): string => theme.colors.text.dark};
`;

export const Wrapper = styled.div<WrapperProps>`
  border: 1px solid
    ${({ theme, error }): string =>
      !(error ?? false) ? theme.colors.text.medium : theme.colors.error.dark};
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
    background-color: ${({ theme }): string => theme.colors.primary.white};
  }
  &:hover,
  &:focus-within {
    border-color: ${({ theme }): string => theme.colors.primary.hover};
    &.disabled {
      border-color: ${({ theme }): string => theme.colors.secondary.medium};
    }
  }
`;

export const Input = styled.input`
  background-color: white;
  font-size: ${({ theme }): string => theme.tipography.fontSizes.label};
  color: ${({ theme }): string => theme.colors.text.dark};
  border: none;
  padding: 0.81rem 0 0.75rem 0.625rem;
  width: 100%;

  &.disabled {
    background-color: ${({ theme }): string => theme.colors.text.light};
    color: ${({ theme }): string => theme.colors.text.light};
    &::placeholder {
      color: ${({ theme }): string => theme.colors.text.light};
    }
  }
`;

export const ErrorMessage = styled.div`
  font-size: ${({ theme }): string => theme.tipography.fontSizes.label};
  color: ${({ theme }): string => theme.colors.error.dark};
`;
