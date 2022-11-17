import React, { useEffect } from 'react';
import { ButtonDefault, ButtonOutline, Textfield, Select } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Student } from '@/models';
import { showToast } from '@/utils/notifiers';
import { useFormik } from 'formik';
import Modal from '../Modal';
import { initialValues, validationSchema } from './schema';
import { Container, Footer, Wrapper } from './styles';
import { EditStudentModalProps } from './typing';
import { formatCpf } from '@/utils/formatters';
import { updateStudent } from '@/redux/thunks/students';

const EditStudentModal: React.FC<EditStudentModalProps> = ({
  show,
  student,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const { data: courses } = useAppSelector(state => state.courses);

  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    try {
      const body: { student: Student } = {
        student: {
          ...values,
          cpf: formatCpf.removeMask(values.cpf),
        },
      };

      const payload = {
        body,
        studentId: student?.id as number,
      };

      await dispatch(updateStudent(payload));
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
    if (student) {
      formik.setFieldValue('name', student.name) as Promise<void>;
      formik.setFieldValue(
        'cpf',
        formatCpf.addMask(student.cpf as string)
      ) as Promise<void>;
      formik.setFieldValue('course_id', student.course?.id) as Promise<void>;
    }
  }, [student]);

  return (
    <Modal show={show} onClose={onClose} width="400px">
      <Container onSubmit={formik.handleSubmit}>
        <Wrapper>
          <Select
            label="Curso"
            value={formik.values.course_id}
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
            placeholder="Digite o nome do aluno"
            value={formik.values.name}
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue('name', e?.target.value)
            }
            error={Boolean(formik.errors.name ?? '') && formik.touched.name}
            errorMessage={formik.errors.name}
          />
          <Textfield
            label="Cpf"
            placeholder="Digite o cpf do aluno"
            value={formik.values.cpf}
            onChange={async (e): Promise<unknown> =>
              await formik.setFieldValue(
                'cpf',
                formatCpf.addMask(e?.target.value as string)
              )
            }
            error={Boolean(formik.errors.cpf ?? '') && formik.touched.cpf}
            errorMessage={formik.errors.cpf}
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

export default EditStudentModal;
