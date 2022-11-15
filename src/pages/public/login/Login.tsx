import { ButtonDefault, CardAuth, Textfield } from '@/components';
import routes from '@/config/routes';
import { User } from '@/models';
import { useFormik } from 'formik';
import React from 'react';
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
  const handleSubmit = (values: typeof initialValues): void => {
    const body: { user: User } = {
      user: {
        ...values,
      },
    };
    console.log(body);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => handleSubmit(values),
  });

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

          <ButtonDefault text="Entrar" type="submit" />

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
