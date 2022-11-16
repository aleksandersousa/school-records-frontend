import { ButtonDefault, CardAuth, Textfield } from '@/components';
import { routes } from '@/config';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { User } from '@/models';
import { logout } from '@/redux/ducks/auth';
import { login } from '@/services/userServices';
import { showToast } from '@/utils/notifiers';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initialValues, validationSchema } from './schema';
import {
  Body,
  Container,
  Form,
  Header,
  SignupText,
  Subtitle,
  TextLink,
  Title,
} from './styles';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(state => state.user);

  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    const body: { user: User } = {
      user: {
        ...values,
      },
    };

    await login(body, dispatch);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => await handleSubmit(values),
  });

  useEffect(() => {
    if (error) {
      dispatch(logout());
      showToast('Email ou senha incorretos', 'error');
    }
  }, [error]);

  return (
    <Container>
      <CardAuth>
        <Form onSubmit={formik.handleSubmit}>
          <Header>
            <Title>Entrar</Title>
            <Subtitle>Hey, digite suas credenciais para entrar na sua conta</Subtitle>
          </Header>

          <Body>
            <Textfield
              label="Email"
              placeholder="Digite seu email"
              onChange={async (e): Promise<void> =>
                await (formik.setFieldValue('email', e?.target.value) as Promise<void>)
              }
              error={Boolean(formik.errors.email ?? '') && formik.touched.email}
              errorMessage={formik.errors.email}
            />
            <Textfield
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              onChange={async (e): Promise<void> =>
                await (formik.setFieldValue('password', e?.target.value) as Promise<void>)
              }
              error={Boolean(formik.errors.password ?? '') && formik.touched.password}
              errorMessage={formik.errors.password}
            />
          </Body>

          <ButtonDefault text="Entrar" type="submit" loading={isLoading} />

          <SignupText>
            Ainda não tem uma conta?{' '}
            <Link to={routes.publics.register.path}>
              <TextLink>Cadastre-se</TextLink>
            </Link>
          </SignupText>
        </Form>
      </CardAuth>
    </Container>
  );
};

export default Login;
