import React from 'react';
import Modal from '../Modal';
import { Buttons, Container, Wrapper } from './styles';
import { LogoutModalProps } from './typing';
import ButtonDefault from '@/components/buttons/buttonDefault/ButtonDefault';
import { logout } from '@/redux/thunks/auth';
import { showToast } from '@/utils/notifiers';
import { useAppDispatch } from '@/hooks';

const LogoutModal: React.FC<LogoutModalProps> = ({ show, onClose }) => {
  const dispatch = useAppDispatch();

  const onClick = async (): Promise<void> => {
    try {
      onClose();
      await dispatch(logout());
      window.location.reload();
    } catch (error) {
      showToast('Erro inesperado.', 'error');
    }
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
