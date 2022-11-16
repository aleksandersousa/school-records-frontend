import { ButtonDefault, CardAuth, Textfield } from '@/components';
import { routes } from '@/config';
import { useFormik } from 'formik';
import React, { useRef } from 'react';
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

const Register: React.FC = () => {
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleSubmit = (values: typeof initialValues): void => {
    console.log(values);
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
            <Title>Cadastre-se</Title>
            <Subtitle>Hey, preencha os dados para criar uma conta</Subtitle>
          </Header>

          <Body>
            <Textfield
              label="Nome"
              placeholder="Digite seu nome"
              ref={nameRef}
              error={Boolean(formik.errors.name ?? '') && formik.touched.name}
              errorMessage={formik.errors.name}
            />
            <Textfield
              label="Email"
              placeholder="Digite seu email"
              ref={emailRef}
              error={Boolean(formik.errors.email ?? '') && formik.touched.email}
              errorMessage={formik.errors.email}
            />
            <Textfield
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              ref={passwordRef}
              error={Boolean(formik.errors.password ?? '') && formik.touched.password}
              errorMessage={formik.errors.password}
            />
          </Body>

          <ButtonDefault text="Entrar" type="submit" />

          <SignupText>
            Já tem uma conta?{' '}
            <Link to={routes.publics.login.path}>
              <TextLink>Entre aqui</TextLink>
            </Link>
          </SignupText>
        </Form>
      </CardAuth>
    </Container>
  );
};

export default Register;
