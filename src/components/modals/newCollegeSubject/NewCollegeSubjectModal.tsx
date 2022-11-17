import React from 'react';
import { ButtonDefault, ButtonOutline, Textfield, Select } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { CollegeSubject } from '@/models';
import { showToast } from '@/utils/notifiers';
import { useFormik } from 'formik';
import Modal from '../Modal';
import { initialValues, validationSchema } from './schema';
import { Container, Footer, Wrapper } from './styles';
import { NewCollegeSubjectModalProps } from './typing';
import { createCollegeSubject } from '@/redux/thunks/collegeSubjects';

const NewCollegeSubjectModal: React.FC<NewCollegeSubjectModalProps> = ({
  show,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const { data: courses } = useAppSelector(state => state.courses);

  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    try {
      const body: { college_subject: CollegeSubject } = {
        college_subject: {
          ...values,
          workload: Number(values.workload),
        },
      };

      await dispatch(createCollegeSubject(body));
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
          <Select
            label="Curso"
            options={courses.map(d => ({
              value: d.id as number,
              label: d.name as string,
            }))}
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue('course_id', Number(e?.target.value))
            }
            error={Boolean(formik.errors.course_id ?? '') && formik.touched.course_id}
            errorMessage={formik.errors.course_id}
          />
          <Textfield
            label="Nome"
            placeholder="Digite o nome da disciplina"
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue('name', e?.target.value)
            }
            error={Boolean(formik.errors.name ?? '') && formik.touched.name}
            errorMessage={formik.errors.name}
          />
          <Textfield
            label="Carga horária"
            placeholder="Digite a carga horária em números inteiros"
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue('workload', e?.target.value)
            }
            error={Boolean(formik.errors.workload ?? '') && formik.touched.workload}
            errorMessage={formik.errors.workload}
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

export default NewCollegeSubjectModal;
