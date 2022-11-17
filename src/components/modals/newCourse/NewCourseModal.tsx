import React from 'react';
import { ButtonDefault, ButtonOutline, Textfield } from '@/components';
import { useAppDispatch } from '@/hooks';
import { Course } from '@/models';
import { showToast } from '@/utils/notifiers';
import { useFormik } from 'formik';
import Modal from '../Modal';
import { initialValues, validationSchema } from './schema';
import { Container, Footer, Wrapper } from './styles';
import { createCourse } from '@/redux/thunks/courses';
import { NewCourseModalProps } from './typing';

const NewCourseModal: React.FC<NewCourseModalProps> = ({ show, onClose }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    try {
      const body: { course: Course } = {
        course: {
          ...values,
        },
      };

      await dispatch(createCourse(body));
    } catch (error) {
      showToast('Erro inesperado.', 'error');
    } finally {
      onClose();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => await handleSubmit(values),
  });

  return (
    <Modal show={show} onClose={onClose} width="400px">
      <Container onSubmit={formik.handleSubmit}>
        <Wrapper>
          <Textfield
            label="Nome"
            placeholder="Digite o nome do curso"
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue('name', e?.target.value)
            }
            error={Boolean(formik.errors.name ?? '') && formik.touched.name}
            errorMessage={formik.errors.name}
          />
        </Wrapper>

        <Footer>
          <ButtonDefault text="Salvar" type="submit" />
          <ButtonOutline text="Cancelar" type="button" onClick={onClose} />
        </Footer>
      </Container>
    </Modal>
  );
};

export default NewCourseModal;
