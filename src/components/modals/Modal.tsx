import React from 'react';
import { Icon } from '@iconify/react';
import { Background, Body, Container, Divider, Header } from './styles';
import { ModalProps } from './typing';

const Modal: React.FC<ModalProps> = ({
  width,
  height,
  maxHeight,
  minHeight,
  title,
  divider,
  padding = { top: '', left: '', bottom: '', right: '' },
  onClose,
  children,
  show,
}) => {
  return (
    <Background show={show}>
      <Container
        width={width}
        height={height}
        padding={padding}
        maxHeight={maxHeight}
        minHeight={minHeight}
      >
        <Header>
          {title != null || <div />}
          <Icon
            icon="mdi:window-close"
            width={24}
            height={24}
            style={{ cursor: 'pointer', margin: '0.5rem' }}
            onClick={onClose}
          />
        </Header>
        {(divider ?? false) && <Divider />}
        <Body>{children}</Body>
      </Container>
    </Background>
  );
};

export default Modal;
