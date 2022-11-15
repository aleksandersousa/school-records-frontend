import * as Yup from 'yup';

export const initialValues = {
  email: '',
  password: '',
};

export const validationSchema = Yup.object({
  email: Yup.string().email('Digite um email válido!').required('Obrigatório!'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos!')
    .required('Obrigatório!'),
});
