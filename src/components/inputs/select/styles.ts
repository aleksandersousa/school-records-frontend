import styled from 'styled-components';

interface Props {
  width?: string;
}

export const Container = styled.div<Props>`
  box-sizing: border-box;
  width: ${({ width }): string => `min(100%,  ${width as string})`};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledSelect = styled.select`
  background-color: white;
  border: 1px solid ${({ theme }): string => theme.colors.neutral.medium};
  border-radius: ${({ theme }): string => theme.tipography.borderRadius};
  font-size: ${({ theme }): string => theme.tipography.fontSizes.label};
  color: ${({ theme }): string => theme.colors.text.dark};
  padding: 0 0.5rem;
  width: 100%;
  height: 52px;
  max-height: 52px;

  &.disabled {
    background-color: ${({ theme }): string => theme.colors.neutral.light};

    &::placeholder {
      color: ${({ theme }): string => theme.colors.neutral.medium};
    }
  }
  &:hover,
  &:focus-within {
    border-color: ${({ theme }): string => theme.colors.primary.hover};
    &.disabled {
      border-color: ${({ theme }): string => theme.colors.neutral.medium};
    }
  }
`;

export const Label = styled.label<{ error?: boolean }>`
  font-weight: 500;
  color: ${({ theme }): string => theme.colors.text.dark};
`;

export const ErrorMessage = styled.label`
  color: ${({ theme }): string => theme.colors.error.dark};
`;
