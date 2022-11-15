import React from 'react';
import { Container } from './styles';
import { ButtonDefaultProps } from './typing';

const ButtonDefault: React.FC<ButtonDefaultProps> = ({
  text,
  type,
  disabled,
  onClick,
}) => {
  return (
    <Container type={type} disabled={disabled} onClick={onClick}>
      {text}
    </Container>
  );
};

export default ButtonDefault;
