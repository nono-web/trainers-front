import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { desktop } from '../responsive';
import Header from './Header';
import Exercice from './Exercice';

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
 
`;

const Image = styled.img`
  width: 17rem;
  margin-bottom: 0.5rem;
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

const Title = styled.h1`
text-align:center;
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

const Warning = styled.p `
color: red;
font-size: 1.5rem;
margin: 0.5rem;
`

const EditExercices = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const onCancel = () => navigator('/exercices');

  const [exercice, setExercice] = useState([]);
  const [desc, setDesc] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState(null);
  const [img, setImg] = useState(null);

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

  const handleChange = () => {
    const values = {
      desc,
      time,
      name,
      img,
    };
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/exercice/${id}`, values)
      .then(({ data }) => {
        console.log({
          data,
        });
       return  navigator(`/exercices/${id}`);
      });
  };

  return (
    <Container>
      <Header />
      <Image src={exercice.img} />
      <Input
        type="text"
        placeholder="Modifier l'image de l'exercice"
        onChange={(e) => setImg(e.target.value)}
      />
      <Wrapper>
        <Title>{exercice.name}</Title>
        <Input
          type="text"
          placeholder="Modifier le nom de l'exercice"
          onChange={(e) => setName(e.target.value)}
        />
        <Desc>{exercice.desc}</Desc>
        <Texterea
          type="text"
          rows="5"
          cols="33"
          name="desc"
          placeholder="Modifier la description de l'exercice"
          onChange={(e) => setDesc(e.target.value)}
        />
        <AgeTitle>Catégories : </AgeTitle>
        {exercice.categoriesAge?.map((c) => (
          <Age>{c}</Age>
        ))}
        <Time> Temps de l'exercice : {exercice.time} min</Time>
        <Input
          type="text"
          placeholder="Modifier le temps de l'exercice"
          onChange={(e) => setTime(e.target.value)}
        />
        <TrainingTitle>Type d'entrainement : </TrainingTitle>
        {exercice.typeTraining?.map((t) => (
          <Training>{t}</Training>
        ))}
        <Warning> ⚠ Tout les champs doivent étre remplis pour modifier l'exercice </Warning>
        <ButtonContainer>
          <Button onClick={handleChange}>Modifié l'exercice</Button>
          <Button onClick={onCancel}>Revenir aux exercices</Button>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default EditExercices;
