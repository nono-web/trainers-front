import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { desktop } from '../responsive';
import Header from './Header';

const Container = styled.div`
  width: 100vw;
  height: 100%;
  background: url('https://cdn.pixabay.com/photo/2017/06/23/23/49/youth-2436343_960_720.jpg')
    center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${desktop({ height: '110vh' })}
`;

const Image = styled.img`
  width: 17rem;
  ${desktop({ width: '30rem', height: '20rem' })}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 0.5rem;
  margin: 2rem;
  border-radius: 2rem;
  ${desktop({ margin: '2rem' })}
`;

const Title = styled.h1``;

const Desc = styled.p`
  margin: 0.5rem;
  text-align: center;
  ${desktop({ padding:'0rem 2rem'})}
`;
const AgeTitle = styled.h4`
margin-bottom: 0.5rem;
`;

const Age = styled.p`
`;

const Time = styled.p`
  margin: 0.5rem;
`;
const TrainingTitle = styled.h4`
  margin: 0.5rem;
`;

const Training = styled.p`
`;

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
    background-color: var(--dark-green);
  }
  &:hover:nth-child(2) {
    background-color: var(--green);
    cursor: pointer;
  }
  &:nth-child(3) {
    background-color: var(--light-orange);
  }
  &:hover:nth-child(3) {
    background-color: var(--yellow);
    color: var(--orange);
    cursor: pointer;
  }
  ${desktop({ margin: '1rem ', width: '20rem' })}
`;

const DetailsExercice = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const onCancel = () => navigator('/exercices');
  
  const [exercice, setExercice] = useState({});

  useEffect(() => {
    const fetchDataExerciceDetails = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/exercice/${id}`
      );
      setExercice(res.data);
      console.log(res.data);
    };
    fetchDataExerciceDetails();
  }, [id]);

  const onEditExercice = () => {
    navigator(`/exercices/${id}/modifie`);
  };

  return (
    <Container>
      <Header />
      <Image src={exercice.img} />
      <Wrapper>
        <Title>{exercice.name}</Title>
        <Desc>{exercice.desc}</Desc>
        <AgeTitle>Catégories : </AgeTitle>
        {exercice.categoriesAge?.map((c) => (
          <Age>{c}</Age>
        ))}
        <Time> Temps de l'exercice : {exercice.time} min</Time>
        <TrainingTitle>Type d'entrainement : </TrainingTitle>
        {exercice.typeTraining?.map((t) => (
          <Training>{t}</Training>
        ))}
        <ButtonContainer>
          <Button>Ajouter à l'entrainement</Button>
          <Button onClick={onEditExercice}>Modifier Exercice</Button>
          <Button onClick={onCancel}>Revenir aux exercices</Button>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default DetailsExercice;
