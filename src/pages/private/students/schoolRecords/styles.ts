import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const Title = styled.h4`
  font-weight: 600;
  color: ${({ theme }): string => theme.colors.text.dark};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  border-radius: 32px;
  padding: 1rem;

  -webkit-box-shadow: 3px 6px 59px -30px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 3px 6px 59px -30px rgba(0, 0, 0, 0.4);
  box-shadow: 3px 6px 59px -30px rgba(0, 0, 0, 0.4);
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Name = styled.h6`
  font-weight: 500;
  color: ${({ theme }): string => theme.colors.text.dark};
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Label = styled.p`
  font-weight: 500;
  color: ${({ theme }): string => theme.colors.text.medium};
`;

export const Desc = styled.p`
  color: ${({ theme }): string => theme.colors.text.light};
`;

export const Subtitle = styled.h5`
  font-weight: 500;
  color: ${({ theme }): string => theme.colors.text.medium};
`;
