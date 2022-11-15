import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  text-align: center;
`;

export const Title = styled.h4`
  font-weight: 700;
  color: ${({ theme }): string => theme.colors.primary.default};
`;

export const Subtitle = styled.label`
  max-width: 80%;

  text-align: center;
  color: ${({ theme }): string => theme.colors.terciary.dark};
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SignupText = styled.label`
  text-align: center;
  color: ${({ theme }): string => theme.colors.terciary.dark};
`;

export const TextLink = styled.label`
  font-weight: 700;
  text-decoration: underline;
  color: ${({ theme }): string => theme.colors.terciary.dark};

  cursor: pointer;
`;
