import React, { useState } from 'react';
import styled from 'styled-components';
import { desktop } from '../responsive';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useApp } from '../context/AppProvider';
import Header from './Header';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${desktop({ height: '100vh' })}
`;

const Wrapper = styled.div`
  width: 18rem;
  height: 23rem;
  padding: 1.25rem;
  margin-bottom: 5rem;
  background-color: white;
  border-radius: 2rem;
  ${desktop({ width: '25rem', marginBottom: '0rem', height: '23rem' })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 360px;
  padding: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 300;
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  width: 15rem;
  margin: 0rem 0.7rem 0rem 0rem;
  padding: 0.7rem;
  border-radius: 2rem;
  border: solid 1px var(--dark);
  text-align: center;
  &::placeholder {
    text-align: center;
  }
  ${desktop({ width: '20rem' })}
`;

const DisplayPassword = styled.div``;
const Button = styled.button`
  width: 15rem;
  border: none;
  border-radius: 1.2rem;
  padding: 1rem 1.2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: var(--dark);
  background-color: var(--green);
  transition: all 0.2s ease-out;
  &:hover {
    background-color: var(--light-green);
    color: var(--dark-green);
    cursor: pointer;
  }
  ${desktop({ margin: '1rem ', width: '20rem' })}
`;

const ErrorYup = styled.p`
  color: tomato;
  text-align: center;
  font-size: 0.9rem;
  &::before {
    display: inline;
    content: '⚠';
  }
  ${desktop({ fontSize: '1.1rem' })}
`;
const Link = styled.p`
  margin: 0.3rem 0rem;
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
  margin-bottom: 1rem;
`;

const Login = () => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const { setCoach, setfavoritesExercicesList } = useApp();
  const navigator = useNavigate();

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Merci de rentrer un email valide')
        .max(255)
        .required('Merci de rentrer un email valide'),
      password: yup
        .string()
        .max(255)
        .required("Veuillez entrer votre mot de passe s'il vous plait"),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    const { email, password } = values;

    try {
      const {
        data: { isAdmin, favoritesExercices, id, username, lastname, firstname },
      } = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log('login isAdmin:', isAdmin);
      console.log('login favex:', favoritesExercices);
      setCoach({ isAdmin: isAdmin, _id: id, username: username, lastname: lastname, firstname: firstname });
      setfavoritesExercicesList(favoritesExercices);
      return isAdmin ? navigator('/admin') : navigator('/exercices');
    } catch (err) {
      return setError(!error);
    }
  };

  const handleChange = () => setChecked(!checked);

  const onInscription = () => {
    navigator('/enregistrement');
  };

  return (
    <Container>
      <Header />
      <Wrapper>
        <Title>Connexion</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer>
            {errors.email && <ErrorYup>{errors.email.message}</ErrorYup>}
            <Label>
              {' '}
              Email* :
              <Input
                type="text"
                name="email"
                placeholder="Email"
                {...register('email')}
              />
            </Label>
          </FormContainer>
          <FormContainer>
            {errors.password && <ErrorYup>{errors.password.message}</ErrorYup>}
            <Label>
              {' '}
              mot de passe * :
              <Input
                name="password"
                placeholder="mot de passe"
                type={checked ? 'text' : 'password'}
                {...register('password')}
              />
            </Label>
          </FormContainer>
          <DisplayPassword>
            <Label>
              {' '}
              Afficher le mot de passe
              <Input
                checked={checked}
                onChange={handleChange}
                type="checkbox"
              />
            </Label>
          </DisplayPassword>
          <Button>Connexion</Button>
          {error && <Error> Quelque chose a mal tourné </Error>}
          <Link onClick={onInscription}>Créer votre compte</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

