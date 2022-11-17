import styled from 'styled-components';
import { ContainerProps, StatusProps } from './typing';

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

export const DataTableRowStatus = styled.div<StatusProps>`
  padding: 0.5rem;
  border-radius: 4px;
  min-width: 83px;
  text-align: center;
  text-transform: capitalize;
  background-color: ${({ bgColor }): string => bgColor};
  color: ${({ color }): string => color};
`;
