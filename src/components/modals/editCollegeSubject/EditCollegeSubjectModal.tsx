import { ButtonDefault, ButtonOutline, Textfield, Select } from '@/components';
import { useAppDispatch } from '@/hooks';
import { CollegeSubject } from '@/models';
import { updateCollegeSubject } from '@/redux/thunks/collegeSubjects';
import { showToast } from '@/utils/notifiers';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import Modal from '../Modal';
import { fakeData } from './constants';
import { initialValues, validationSchema } from './schema';
import { Container, Footer, Wrapper } from './styles';
import { EditCollegeSubjectModalProps } from './typing';

const EditCollegeSubjectModal: React.FC<EditCollegeSubjectModalProps> = ({
  show,
  collegeSubject,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    try {
      const body: { college_subject: CollegeSubject } = {
        college_subject: {
          ...values,
          workload: Number(values.workload),
        },
      };

      const payload = {
        body,
        collegeSubjectId: collegeSubject?.id as number,
      };

      await dispatch(updateCollegeSubject(payload));
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
    if (collegeSubject) {
      formik.setFieldValue('course_id', collegeSubject.course_id) as Promise<void>;
      formik.setFieldValue('workload', collegeSubject.workload) as Promise<void>;
      formik.setFieldValue('name', collegeSubject.name) as Promise<void>;
    }
  }, [collegeSubject]);

  return (
    <Modal show={show} onClose={onClose} width="400px">
      <Container onSubmit={formik.handleSubmit}>
        <Wrapper>
          <Select
            label="Curso"
            value={formik.values.course_id}
            options={fakeData.map(d => ({ value: d.id, label: d.name }))}
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue('course_id', Number(e?.target.value))
            }
            error={Boolean(formik.errors.course_id ?? '') && formik.touched.course_id}
            errorMessage={formik.errors.course_id}
          />
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
            label="Carga horária"
            placeholder="Digite a carga horária em números inteiros"
            value={formik.values.workload.toString()}
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

export default EditCollegeSubjectModal;
