import * as Yup from 'yup';

export const initialValues = {
  course_id: -1,
  name: '',
  cpf: '',
};

export const validationSchema = Yup.object({
  course_id: Yup.number().min(1, 'Obrigatório!').required('Obrigatório!'),
  name: Yup.string().required('Obrigatório!'),
  cpf: Yup.string()
    .matches(/\d{3}\.\d{3}\.\d{3}-\d{2}/gi, {
      name: 'CPF',
      message: 'Insira um CPF válido!',
    })
    .required('CPF é obrigatório!'),
});
