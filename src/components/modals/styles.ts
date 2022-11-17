import styled from 'styled-components';
import { BackgroundProps, ContainerProps } from './typing';

export const Background = styled.div<BackgroundProps>`
  ${({ show }): string =>
    show
      ? `
    width: 100vw;
    height: 100vh;
    background-color: rgba(131, 131, 131, 0.4);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all 0.3s ease-out;
    z-index: 999;
  `
      : 'display: none;'}
`;

export const Container = styled.div<ContainerProps>`
  width: ${({ width }): string | undefined => width};
  height: ${({ height }): string | undefined => height};
  max-height: ${({ maxHeight }): string | undefined => maxHeight};
  min-height: ${({ minHeight }): string | undefined => minHeight};
  padding: ${({ padding }): string | false | undefined =>
    padding != null &&
    `${padding.top} ${padding.left} ${padding.bottom} ${padding.right}`};
  background-color: white;
  border-radius: 8px;
  border: 1px solid ${({ theme }): string => theme.colors.text.medium};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: initial;

  .error {
    color: ${({ theme }): string => theme.colors.error.dark};
  }

  @media (max-width: ${({ theme }): string => theme.breakpoints.sm}) {
    width: calc(100% - 3rem);
  }

  @media (max-width: ${({ theme }): string => theme.breakpoints.xs}) {
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: unset;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.p`
  text-align: center;
  font-size: 1.5rem;
`;

export const Body = styled.div`
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
`;

export const Divider = styled.div`
  margin-top: 0.675rem;
  border: 1px solid ${({ theme }): string => theme.colors.text.light};
`;
