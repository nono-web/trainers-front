import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { desktop } from '../responsive';
import Header from './Header';
import Footer from './Footer';
import FooterAdmin from './Admin/FooterAdmin';
import { useApp } from '../context/AppProvider';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: url('https://cdn.pixabay.com/photo/2017/06/23/23/49/youth-2436343_960_720.jpg')
    center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 17rem;
  margin-bottom: 0.5rem;
  ${desktop({ width: '30rem', height: '20rem' })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 0.5rem;
  margin: 2rem;
  border-radius: 2rem;
  ${desktop({ margin: '2rem' })}
`;

const Title = styled.h1`
  text-align: center;
`;

const Desc = styled.p`
  margin: 0.5rem;
  text-align: center;
  ${desktop({ padding: '0rem 2rem' })}
`;

const Texterea = styled.textarea`
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

const AgeTitle = styled.h4`
  margin-bottom: 0.5rem;
`;

const Age = styled.p``;

const Time = styled.p`
  margin: 0.5rem;
`;

const Input = styled.input`
  width: 15rem;
  border-radius: 2rem;
  &::placeholder {
    text-align: center;
  }
`;

const TrainingTitle = styled.h4`
  margin: 0.5rem;
`;

const Training = styled.p``;

const ButtonContainer = styled.div`
  margin-top: 0.5rem;
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

const EditExercices = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const { coach } = useApp();
  const [exercice, setExercice] = useState([]);
  const onCancel = () => navigator('/exercices');

  const fetchDataExerciceDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/exercice/${id}`
    );
    setExercice(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchDataExerciceDetails();
  }, [id]);

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
      time: yup
        .number()
        .typeError("Veuillez rentrer une durée d'exercice valide")
        .required(
          "Veuillez entrer le temps que dure l'exercice s'il vous plait"
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

  const onSubmit = (values) => {
    const { name, desc, img, time } = values;
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/exercice/${id}`, {
        name,
        desc,
        img,
        time,
      })
      .then(() => {
        alert("L'éxercice a été modifié");
        fetchDataExerciceDetails();
        return navigator(`/exercices/${id}/modifie`);
      });
  };

  return (
    <Container>
      <Header />
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Image src={exercice.img} />
      <Label> <b>Image de l'éxercices : </b>
      <Input
        type="text"
        placeholder="Modifier l'image de l'exercice"
        name="img"
        {...register('img')}
      />
      </Label>
      {errors.img && <ErrorYup>{errors.img.message}</ErrorYup>}
  
        <Wrapper>
          <Title>{exercice.name}</Title>
          <Label> <b>Nom de l'éxercice : </b>
          <Input
            type="text"
            placeholder="Modifier le nom de l'exercice"
            name="name"
            {...register('name')}
          />
          </Label>
          {errors.name && <ErrorYup>{errors.name.message}</ErrorYup>}
          <Desc>{exercice.desc}</Desc>
          <Label> <b>Description de l'éxercice : </b>
          <Texterea
            type="text"
            rows="5"
            cols="33"
            name="desc"
            placeholder="Modifier la description de l'exercice"
            {...register('desc')}
          />
          </Label>
          {errors.desc && <ErrorYup>{errors.desc.message}</ErrorYup>}
          <AgeTitle>Catégories : </AgeTitle>
          {exercice.categoriesAge?.map((c) => (
            <Age>{c}</Age>
          ))}
          <Time> Temps de l'exercice : {exercice.time} min</Time>
          <Label> <b>Temps de l'éxercice : </b>
          <Input
            type="text"
            placeholder="Modifier le temps de l'exercice"
            name="time"
            {...register('time')}
          />
          </Label>
          {errors.time && <ErrorYup>{errors.time.message}</ErrorYup>}
          <TrainingTitle>Type d'entrainement : </TrainingTitle>
          {exercice.typeTraining?.map((t) => (
            <Training>{t}</Training>
          ))}
          <ButtonContainer>
            <Button>Modifié l'exercice</Button>
            <Button onClick={onCancel}>Revenir aux exercices</Button>
          </ButtonContainer>
        </Wrapper>
      </Form>
      {coach.isAdmin ? <FooterAdmin /> : <Footer />}
    </Container>
  );
};

export default EditExercices;
