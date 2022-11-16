import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;

  @media (max-width: ${({ theme }): string => theme.breakpoints.xs}) {
    padding: 1.5rem 0.5rem;
    height: 90%;
    justify-content: center;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;
