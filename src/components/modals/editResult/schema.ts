import * as Yup from 'yup';

export const initialValues = {
  note: -1,
  type_of_result_id: -1,
  college_subject_id: -1,
  student_id: -1,
  cpf: '',
};

export const validationSchema = Yup.object({
  note: Yup.number()
    .typeError('Apenas números são permitidos!')
    .min(1, 'Obrigatório!')
    .required('Obrigatório!'),
  type_of_result_id: Yup.number().min(1, 'Obrigatório!').required('Obrigatório!'),
  college_subject_id: Yup.number().min(1, 'Obrigatório!').required('Obrigatório!'),
  student_id: Yup.number().min(1, 'Obrigatório!').required('Obrigatório!'),
});
