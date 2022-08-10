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
  height: 170vh;
  background: url('https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${desktop({ height: '100vh'})}
`;

const Wrapper = styled.div`
  width: 18rem;
  height: 100%;
  padding: 1.25rem;
  margin-bottom: 5rem;
  background-color: white;
  border-radius: 2rem;
  ${desktop({width:'49rem', marginBottom: '0rem', height: '39rem'})}
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
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
  text-align:center;
  &::placeholder {
    text-align: center;
  }
  ${desktop({width: '20rem'})}
`;

const DisplayPassword = styled.div `

`

const Agreement = styled.span`
  font-size: 0.8rem;
  margin: 1.4rem 0rem;
  text-align: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${desktop({ flexDirection: 'row' })}
`;

const Button = styled.button`
  width: 15rem;
  border: none;
  border-radius: 1.2rem;
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  color: var(--dark);
  background-color: var(--green);
  transition: all 0.2s ease-out;
  &:hover {
    background-color: var(--light-green);
    color: var(--dark-green);
    cursor: pointer;
  }
  &:nth-child(2) {
    background-color: var(--light-orange)
  }
  &:hover:nth-child(2) {
    background-color: var(--yellow);
    color: var(--orange);
    cursor: pointer;
  }
  ${desktop({ margin: '1rem ', width: '20rem' })}
`;

const ErrorYup = styled.p `
color: tomato;
text-align:center;
font-size: 0.9rem;
&::before {
  display: inline;
  content: '⚠';
}
${desktop({ fontSize:'1.1rem'})}

`

const Register = () => {

    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('');
    const { setCoach, coach } = useApp();
    const navigator = useNavigate();
    

  const schema = yup
    .object({
      firstname: yup
        .string()
        .max(50)
        .required("Veuillez entrer votre prenom s'il vous plait"),
      lastname: yup
        .string()
        .max(50)
        .required("Veuillez entrer votre nom s'il vous plait"),
      username: yup
        .string()
        .max(20)
        .required("Veuillez entrer votre identifiant s'il vous plait"),
      email: yup
        .string()
        .email('Merci de rentrer un email valide')
        .max(255)
        .required('Merci de rentrer un email valide'),
      password: yup
        .string()
        .max(255)
        .required("Veuillez entrer votre mot de passe s'il vous plait"),
      controlpassword: yup
        .string()
        .oneOf(
          [yup.ref('password'), null],
          'Le mot de passe doit être identique'
        ),
      club: yup
        .string()
        .max(50)
        .required("Veuillez entrer votre club s'il vous plait"),
      phoneNumber: yup
        .number()
        .typeError('Veuillez rentrer un numero de numero de telephone valide')
        .required("Veuillez entrer votre numero de téléphone s'il vous plait"),
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
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      phoneNumber,
      club,
    } = values;

    try {
     const res =  await axios
        .post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
          {
            firstname,
            lastname,
            username,
            email,
            password,
            phoneNumber,
            club,
          },
        );
        setCoach({ ...coach, res});
      return navigator('/connexion');
    } catch (err) {
      setError(err.response.data)
      console.log(err.response.data);
    }
  };

  const onCancel = () => navigator('/connexion');

  const handleChange = () => setChecked(!checked);

  return (
    <Container>
        <Header  />
      <Wrapper>
        <Title>Créer votre compte</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer>
          {errors.firstname && <ErrorYup>{errors.firstname.message}</ErrorYup>}
            <Label>
              {' '}
              Nom* :
              <Input type="text" placeholder="Nom" name="firstname" {...register("firstname")} />
            </Label>
          </FormContainer>

          <FormContainer>
          {errors.lastname && <ErrorYup>{errors.lastname.message}</ErrorYup>}
            <Label>
              {' '}
              Prenom *:
              <Input type="text"  name="lastname" placeholder="Prenom"  {...register("lastname")} />
            </Label>
          </FormContainer>

          <FormContainer>
            {error && <ErrorYup>{error}</ErrorYup>}
          {errors.username && <ErrorYup>{errors.username.message}</ErrorYup>}
            <Label>
              {' '}
              Pseudo* :
              <Input type="text" name="username" placeholder="Pseudo" {...register("username")} />
            </Label>
          </FormContainer>

          <FormContainer>
          {errors.email && <ErrorYup>{errors.email.message}</ErrorYup>}
            <Label>
              {' '}
              Email* :
              <Input type="text" name="email" placeholder="Email" {...register("email")} />
            </Label>
          </FormContainer>

          <FormContainer>
          {errors.phoneNumber && <ErrorYup>{errors.phoneNumber.message}</ErrorYup>}
            <Label>
              {' '}
              Numero de Téléphone * :
              <Input type="text" name="phoneNumber " placeholder="Numero de téléphone" {...register("phoneNumber")}/>
            </Label>
          </FormContainer>

          <FormContainer>
          {errors.club && <ErrorYup>{errors.club.message}</ErrorYup>}
            <Label>
              {' '}
              Nom du club *:
              <Input type="text" name="club" placeholder="Nom du Club" {...register("club")} />
            </Label>
          </FormContainer>

          <FormContainer>
          {errors.password && <ErrorYup>{errors.password.message}</ErrorYup>}
            <Label>
              {' '}
              mot de passe * :
              <Input  name="password"  placeholder="mot de passe" type={checked ? 'text' : 'password'} {...register("password")}  />
            </Label>
          </FormContainer>

          <FormContainer>
          {errors.controlpassword && <ErrorYup>{errors.controlpassword.message}</ErrorYup>}
            <Label>
              {' '}
              Confirmation de mot de passe * :
              <Input  type={checked ? 'text' : 'password'} {...register("controlpassword")} placeholder="Confirmation de mot de passe" />
            </Label>
          </FormContainer>
          <DisplayPassword>
            <Label> Afficher le mot de passe
                <Input  checked={checked}
            onChange={handleChange} type="checkbox" />
            </Label>
          </DisplayPassword>
          <Agreement>
            En créant un compte, je consens au traitement de mes données
            personnelles conformément à la <b> POLITIQUE DE CONFIDENTIALITÉ</b>
          </Agreement>
          <ButtonContainer>
          <Button>Inscription</Button>
          <Button onClick={onCancel}>Connexion</Button>
          </ButtonContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
