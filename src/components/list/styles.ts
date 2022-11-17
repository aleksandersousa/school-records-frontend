import styled from 'styled-components';
import { LabelProps } from './typing';

export const Container = styled.div`
  border-radius: 32px;
  padding: 1rem 2rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  -webkit-box-shadow: 3px 6px 59px -30px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 3px 6px 59px -30px rgba(0, 0, 0, 0.4);
  box-shadow: 3px 6px 59px -30px rgba(0, 0, 0, 0.4);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Label = styled.h6<LabelProps>`
  font-weight: 600;
  width: ${({ width }): string => width as string};
  color: ${({ theme }): string => theme.colors.text.dark};
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  max-height: 280px;
  overflow-y: scroll;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
`;

export const Text = styled.p<LabelProps>`
  text-align: left;
  width: ${({ width }): string => width as string};
  color: ${({ theme }): string => theme.colors.text.medium};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;
