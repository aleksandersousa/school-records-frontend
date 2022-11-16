import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../Modal';
import { Buttons, Container, Wrapper } from './styles';
import { LogoutModalProps } from './typing';
import { logout } from '@/redux/ducks/auth';
import ButtonDefault from '@/components/buttons/buttonDefault/ButtonDefault';

const LogoutModal: React.FC<LogoutModalProps> = ({ show, onClose }) => {
  const dispatch = useDispatch();

  const onClick = (): void => {
    onClose();
    dispatch(logout());
    window.location.reload();
  };

  return (
    <Modal show={show} onClose={onClose} width="30%">
      <Container>
        <Wrapper>
          <h6>
            Sua sessão expirou! Para continuar utilizando o sistema, faça login novamente.
          </h6>
          <Buttons>
            <ButtonDefault text="Ok" onClick={onClick} />
          </Buttons>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default LogoutModal;
