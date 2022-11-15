import React from 'react';
import { Container } from './styles';
import { CardAuthProps } from './typing';

const CardAuth: React.FC<CardAuthProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CardAuth;
