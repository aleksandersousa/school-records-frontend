import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 90%;

  padding: 1.5rem 2rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Title = styled.h5`
  font-weight: 500;
  color: ${({ theme }): string => theme.colors.text.medium};
`;

export const Filters = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
`;

export const IconsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;

  svg {
    cursor: pointer;
  }
`;
