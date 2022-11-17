import * as Yup from 'yup';

export const initialValues = {
  name: '',
};

export const validationSchema = Yup.object({
  name: Yup.string().required('Obrigatório!'),
});
