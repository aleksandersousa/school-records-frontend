import React from 'react';
import { ButtonDefault, ButtonOutline, Textfield, Select } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Result } from '@/models';
import { showToast } from '@/utils/notifiers';
import { useFormik } from 'formik';
import Modal from '../Modal';
import { initialValues, validationSchema } from './schema';
import { Container, Footer, Wrapper } from './styles';
import { NewResultModalProps } from './typing';
import { createResult } from '@/redux/thunks/results';

const NewResultModal: React.FC<NewResultModalProps> = ({ show, onClose }) => {
  const dispatch = useAppDispatch();

  const { data: typeOfResults } = useAppSelector(state => state.typeOfResults);
  const { data: collegeSubjects } = useAppSelector(state => state.collegeSubjects);
  const { data: students } = useAppSelector(state => state.students);

  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    try {
      const body: { result: Result } = {
        result: {
          ...values,
        },
      };

      await dispatch(createResult(body));
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
            label="Disciplina"
            options={collegeSubjects.map(d => ({
              value: d.id as number,
              label: d.name as string,
            }))}
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue('college_subject_id', Number(e?.target.value))
            }
            error={
              Boolean(formik.errors.college_subject_id ?? '') &&
              formik.touched.college_subject_id
            }
            errorMessage={formik.errors.college_subject_id}
          />
          <Select
            label="Aluno"
            options={students.map(d => ({
              value: d.id as number,
              label: d.name as string,
            }))}
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue('student_id', Number(e?.target.value))
            }
            error={Boolean(formik.errors.student_id ?? '') && formik.touched.student_id}
            errorMessage={formik.errors.student_id}
          />
          <Select
            label="Resultado"
            options={typeOfResults.map(d => ({
              value: d.id as number,
              label: d.description as string,
            }))}
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue('type_of_result_id', Number(e?.target.value))
            }
            error={
              Boolean(formik.errors.type_of_result_id ?? '') &&
              formik.touched.type_of_result_id
            }
            errorMessage={formik.errors.type_of_result_id}
          />
          <Textfield
            label="Nota"
            placeholder="Digite a nota do aluno"
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue('note', e?.target.value)
            }
            error={Boolean(formik.errors.note ?? '') && formik.touched.note}
            errorMessage={formik.errors.note}
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

export default NewResultModal;
