import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { desktop } from '../responsive';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApp } from '../context/AppProvider';
import * as yup from 'yup';
import axios from 'axios';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import FooterAdmin from './Admin/FooterAdmin';

const Container = styled.div`
  width: 100vw;
  height: 170vh;
  background: url('https://cdn.pixabay.com/photo/2016/11/29/07/06/bleachers-1867992_960_720.jpg')
    center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${desktop({ height: '100%' })}
`;

const Wrapper = styled.div`
  width: 17rem;
  height: 75rem;
  padding: 1.25rem;
  margin-bottom: 5rem;
  background-color: white;
  border-radius: 2rem;
  ${desktop({ width: '50rem', height: '36rem' })}
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
  margin: 0.3rem 0.7rem 0rem 0rem;
  padding: 0.7rem;
  border-radius: 2rem;
  border: solid 1px var(--dark);
  text-align: center;
  &::placeholder {
    text-align: center;
  }
  ${desktop({ width: '20rem' })}
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
    background-color: var(--light-orange);
  }
  &:hover:nth-child(2) {
    background-color: var(--yellow);
    color: var(--orange);
    cursor: pointer;
  }
  ${desktop({ margin: '1rem ', width: '20rem' })}
`;

const ErrorYup = styled.p`
  color: tomato;
  text-align: center;
  font-size: 0.7rem;
  &::before {
    display: inline;
    content: '⚠';
  }
  ${desktop({ fontSize: '1rem' })}
`;

const Textarea = styled.textarea`
  flex: 1;
  width: 15rem;
  margin: 0.3rem 1rem 1rem 1rem;
  padding: 0.7rem;
  border-radius: 2rem;
  border: solid 1px var(--dark);
  text-align: center;
  &::placeholder {
    text-align: center;
  }
  ${desktop({ width: '20rem' })}
`;

const CreateNewExercice = () => {
  const [error, setError] = useState('');
  const navigator = useNavigate();
  const [age, setAge] = useState([]);
  const [training, setTraining] = useState([]);
  const { coach } = useApp();
  const categorie = {
    'U6-U7': 'U6-U7',
    'U8-U9': 'U8-U9',
    'U10-U11': 'U10-U11',
    'U12-U13': 'U12-U13',
    'U14-U15': 'U14-U15',
  };

  const type = {
    passe: 'passe',
    physique: 'phyisque',
    stalom: 'stalom',
    gardien: 'gardien',
    pressing: 'pressing',
    course: 'course',
  };

  const schema = yup
    .object({
      name: yup
        .string()
        .max(50)
        .required("Veuillez entrer le nom de l'exercice s'il vous plait"),
      desc: yup
        .string()
        .max(1000)
        .required(
          "Veuillez entrer la description de l'exercice s'il vous plait"
        ),
      img: yup
        .string()
        .max(255)
        .required("Veuillez mettre une image s'il vous plait"),
      categoriesAge: yup
        .array()
        .max(255)
        .typeError('Veuillez rentrer au moins une catégorie valide')
        .required("Merci de rentrer un moins une categorie s'il vous plait"),
      time: yup
        .number()
        .typeError("Veuillez rentrer une durée d'exercice valide")
        .required(
          "Veuillez entrer le temps que dure l'exercice s'il vous plait"
        ),
      typeTraining: yup
        .array()
        .typeError("Veuillez rentrer un type d'entrainement valide")
        .max(255)
        .required(
          "Veuillez entrer au moins un type d'entraiment'il vous plait"
        ),
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
    const { name, desc, img, categoriesAge, time, typeTraining } = values;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/exercice`, {
        coachId: coach._id,
        name,
        desc,
        img,
        categoriesAge,
        time,
        typeTraining,
      });
      return navigator('/exercices');
    } catch (err) {
      setError(err.response.data);
      console.log(err.response.data);
    }
  };

  const onCancel = () => navigator(-1);

  const handleCategories = (event) => {
    const {
      target: { value },
    } = event;
    setAge(typeof value === 'string' ? value.split(',') : value);
  };

  const handleTraining = (event) => {
    const {
      target: { value },
    } = event;
    setTraining(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Container>
      <Header />
      <Wrapper>
        <Title>Créer votre exercice</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer>
            {errors.name && <ErrorYup>{errors.name.message}</ErrorYup>}
            <Label>
              {' '}
              Nom de l'exercice* :
              <Input
                type="text"
                placeholder="Titre de l'exercice"
                name="name"
                {...register('name')}
              />
            </Label>
          </FormContainer>

          <FormContainer>
            {errors.img && <ErrorYup>{errors.img.message}</ErrorYup>}
            <Label>
              {' '}
              Image de l'exercice *:
              <Input
                type="text"
                name="img"
                placeholder="L'url de l'image"
                {...register('img')}
              />
            </Label>
          </FormContainer>

          <FormContainer>
            {errors.categoriesAge && (
              <ErrorYup>{errors.categoriesAge.message}</ErrorYup>
            )}
            <Label>
              {' '}
              Categories *:
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  value={age}
                  {...register('categoriesAge')}
                  onChange={handleCategories}
                  input={<OutlinedInput label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {Object.values(categorie).map((categories) => (
                    <MenuItem key={categories} value={categories}>
                      {categories}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Label>
          </FormContainer>

          <FormContainer>
            {errors.time && <ErrorYup>{errors.time.message}</ErrorYup>}
            <Label>
              {' '}
              Durée de l'exercice* :
              <Input
                type="text"
                name="time"
                placeholder="Durée de l'exercice en minutes"
                {...register('time')}
              />
            </Label>
          </FormContainer>

          <FormContainer>
            {errors.typeTraining && (
              <ErrorYup>{errors.typeTraining.message}</ErrorYup>
            )}
            <Label>
              {' '}
              Type d'entrainement *:
              <FormControl sx={{ m: 1, width: 300, textAlign: 'center' }}>
                <InputLabel>Type d'entrainement</InputLabel>
                <Select
                  multiple
                  value={training}
                  {...register('typeTraining')}
                  onChange={handleTraining}
                  input={<OutlinedInput label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {Object.values(type).map((types) => (
                    <MenuItem key={types} value={types}>
                      {types}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Label>
          </FormContainer>
          <FormContainer>
            {errors.desc && <ErrorYup>{errors.desc.message}</ErrorYup>}
            <Label>
              {' '}
              Description de l'exercice *:
              <Textarea
                type="text"
                rows="8"
                cols="33"
                name="desc"
                placeholder="Description de l'exercice"
                {...register('desc')}
              />
            </Label>
          </FormContainer>
          <ButtonContainer>
            <Button>Creer exercice</Button>
            <Button onClick={onCancel}>Précédent</Button>
          </ButtonContainer>
        </Form>
      </Wrapper>
      {coach.isAdmin ? <FooterAdmin /> :  <Footer /> }
    </Container>
  );
};

export default CreateNewExercice;
