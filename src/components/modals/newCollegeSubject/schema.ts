import * as Yup from 'yup';

export const initialValues = {
  course_id: -1,
  workload: -1,
  name: '',
};

export const validationSchema = Yup.object({
  name: Yup.string().required('Obrigatório!'),
  course_id: Yup.number().min(1, 'Obrigatório!').required('Obrigatório!'),
  workload: Yup.number()
    .typeError('Só números permitidos!')
    .min(15, 'Mínimo de 15 horas!')
    .required('Obrigatório!'),
});
