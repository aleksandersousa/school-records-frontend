import React, { useEffect } from 'react';
import { ButtonDefault, ButtonOutline, Textfield, Select } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Result } from '@/models';
import { showToast } from '@/utils/notifiers';
import { useFormik } from 'formik';
import Modal from '../Modal';
import { initialValues, validationSchema } from './schema';
import { Container, Footer, Wrapper } from './styles';
import { EditResultModalProps } from './typing';
import { updateResult } from '@/redux/thunks/results';

const EditResultModal: React.FC<EditResultModalProps> = ({ show, result, onClose }) => {
  const dispatch = useAppDispatch();

  const { data: typeOfResults } = useAppSelector(state => state.typeOfResults);
  const { data: collegeSubjects } = useAppSelector(state => state.collegeSubjects);
  const { data: students } = useAppSelector(state => state.students);

  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    try {
      const body: { result: Result } = {
        result: {
          ...values,
          note: Number(values.note),
        },
      };

      const payload = {
        body,
        resultId: result?.id as number,
      };

      await dispatch(updateResult(payload));
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
    if (result) {
      formik.setFieldValue('note', result.note) as Promise<void>;
      formik.setFieldValue(
        'college_subject_id',
        result.college_subject?.id
      ) as Promise<void>;
      formik.setFieldValue('student_id', result.student?.id) as Promise<void>;
      formik.setFieldValue(
        'type_of_result_id',
        result.type_of_result?.id
      ) as Promise<void>;
    }
  }, [result]);

  return (
    <Modal show={show} onClose={onClose} width="400px">
      <Container onSubmit={formik.handleSubmit}>
        <Wrapper>
          <Select
            label="Disciplina"
            value={formik.values.college_subject_id}
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
            value={formik.values.student_id}
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
            value={formik.values.type_of_result_id}
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
            value={formik.values.note.toString()}
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

export default EditResultModal;
