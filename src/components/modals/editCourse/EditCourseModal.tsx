import React, { useEffect } from 'react';
import { ButtonDefault, ButtonOutline, Textfield } from '@/components';
import { useAppDispatch } from '@/hooks';
import { Course } from '@/models';
import { showToast } from '@/utils/notifiers';
import { useFormik } from 'formik';
import Modal from '../Modal';
import { initialValues, validationSchema } from './schema';
import { Container, Footer, Wrapper } from './styles';
import { updateCourse } from '@/redux/thunks/courses';
import { EditCourseModalProps } from './typing';

const EditCourseModal: React.FC<EditCourseModalProps> = ({ show, course, onClose }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    try {
      const body: { course: Course } = {
        course: {
          ...values,
        },
      };

      const payload = {
        body,
        courseId: course?.id as number,
      };

      await dispatch(updateCourse(payload));
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

  useEffect(() => {
    if (course) {
      formik.setFieldValue('name', course.name) as Promise<void>;
      formik.setFieldValue('code', course.code) as Promise<void>;
    }
  }, [course]);

  return (
    <Modal show={show} onClose={onClose} width="400px">
      <Container onSubmit={formik.handleSubmit}>
        <Wrapper>
          <Textfield
            label="Nome"
            placeholder="Digite o nome da disciplina"
            value={formik.values.name}
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue('name', e?.target.value)
            }
            error={Boolean(formik.errors.name ?? '') && formik.touched.name}
            errorMessage={formik.errors.name}
          />
          <Textfield
            label="Código"
            placeholder="Digite o código"
            value={formik.values.code}
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue('code', e?.target.value)
            }
            error={Boolean(formik.errors.code ?? '') && formik.touched.code}
            errorMessage={formik.errors.code}
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

export default EditCourseModal;
