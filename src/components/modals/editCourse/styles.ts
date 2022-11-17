import styled from 'styled-components';

export const Container = styled.form`
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  flex: 1;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-evenly;

  button {
    min-width: 110px;
  }
`;
