import styled from 'styled-components';
import { ContainerProps } from './typing';

export const Container = styled.div<ContainerProps>`
  height: ${({ height }): string => height || '70vh'};
  width: 100%;
`;

export const DataTableRowText = styled.span`
  font-weight: 400;
  font-size: 0.875rem;
  color: ${({ theme }): string => theme.colors.text.medium};
  margin-bottom: 0.1rem;
`;
