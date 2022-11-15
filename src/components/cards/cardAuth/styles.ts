import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.5rem 1rem;

  border-radius: ${({ theme }): string => theme.tipography.borderRadius};
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
`;
