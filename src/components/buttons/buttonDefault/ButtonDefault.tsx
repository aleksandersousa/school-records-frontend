import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useTheme } from 'styled-components';
import { Container } from './styles';
import { ButtonDefaultProps } from './typing';

const ButtonDefault: React.FC<ButtonDefaultProps> = ({
  text,
  type,
  disabled,
  loading,
  onClick,
}) => {
  const theme = useTheme();

  return (
    <Container type={type} disabled={disabled} onClick={onClick}>
      {text}
      {(loading ?? false) && (
        <ThreeDots
          height="24"
          width="24"
          radius="9"
          ariaLabel="three-dots-loading"
          color={theme.colors.primary.light}
        />
      )}
    </Container>
  );
};

export default ButtonDefault;
