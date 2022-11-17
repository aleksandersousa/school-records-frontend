import * as Yup from 'yup';

export const initialValues = {
  name: '',
  code: '',
};

export const validationSchema = Yup.object({
  name: Yup.string().required('Obrigatório!'),
  code: Yup.string().required('Obrigatório!'),
});
