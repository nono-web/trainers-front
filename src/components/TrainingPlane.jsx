import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { desktop } from '../responsive';
import axios from 'axios';
import Footer from './Footer';
import Header from './Header';
import search from '../assets/search.png';
import trash from '../assets/poubelle.png';
import foot from '../assets/ballon-de-foot.png';
import { useApp } from '../context/AppProvider';
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100%;
  background: url('https://cdn.pixabay.com/photo/2014/10/14/20/24/ball-488701_960_720.jpg')
    center;
  background-size: cover;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin: 2rem 0rem;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
`;

const TopButton = styled.button`
  width: 15rem;
  border: none;
  border-radius: 1.2rem;
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  color: var(--dark);
  background-color: var(--dark-green);
  transition: all 0.2s ease-out;
  &:hover {
    background-color: var(--light-green);
    color: var(--dark-green);
    cursor: pointer;
  }
  &:nth-child(2) {
    background-color: var(--light-orange);
    margin-left: 2rem;
  }
  &:hover:nth-child(2) {
    background-color: var(--yellow);
    color: var(--orange);
    cursor: pointer;
  }
  ${desktop({ margin: '1rem ', width: '20rem' })}
`;

const ContainerPlane = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${desktop({ flexDirection: 'row' })}
`;

const ContainerTrainingPlane = styled.div`
  background-color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${desktop({ margin: '2rem' })}
`;

const IconFoot = styled.img`
  width: 4rem;
  cursor: pointer;
`;

const NameTraining = styled.h3`
  text-align: center;
  padding: 0.5rem;
  font-size: 1rem;
`;

const TotalTime = styled.p`
  text-align: center;
  padding: 0.8rem;
`;

const TotalQuantity = styled.p`
  text-align: center;
  padding: 0.8rem;
`;

const Date = styled.p`
  text-align: center;
  padding: 0.8rem;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Icon = styled.img`
  width: 2rem;
  cursor: pointer;
  &:nth-child(1) {
    margin-right: 5rem;
  }
`;
const TrainingPlane = () => {
  const { coach } = useApp();
  const [trainingPlane, setTrainingPlane] = useState([]);
  const navigator = useNavigate();
  const { coachId } = useParams();

  const fetchTrainingPlane = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/trainingPlane/${coachId}`
      );
      setTrainingPlane(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchTrainingPlane();
  }, [coachId]);
  console.log("trianingplane",trainingPlane)

  const handlePrev = () => {
    navigator(`/panierExercices/${coach._id}`);
  };
  const handleExercices = () => {
    navigator('/exercices');
  };

  const handleReset = async (_id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/trainingPlane/${_id}`
    );
    fetchTrainingPlane();
  };

  const handleSearch = (_id) => {
    navigator(`/entrainements/details/${_id}`);
  };

  return (
    <Container>
      <Header />
      <Title> Tout vos entrainements</Title>
      <Top>
        <TopButton onClick={handlePrev}>
          Retourner sur le panier d'éxercices
        </TopButton>
        <TopButton onClick={handleExercices}>
          Retourner sur les exercices
        </TopButton>
      </Top>
      <ContainerPlane>
        {trainingPlane.length > 0 &&
          trainingPlane.map((training) => (
            <>
              <ContainerTrainingPlane key={training._id}>
                <IconFoot src={foot} alt="foot" />
                <NameTraining>{training.trainingName}</NameTraining>
                <TotalTime>
                  Temps Total de l'entrainement : {training.total_time} min
                </TotalTime>
                <TotalQuantity>
                  Nb d'exercices : {training.nbTotal_exercices}
                </TotalQuantity>
                <Date>
                  {' '}
                  Date de création :{training.updatedAt.substring(0, 10)}{' '}
                </Date>
                <IconContainer>
                  <Icon
                    src={search}
                    onClick={() => handleSearch(training._id)}
                  />
                  <Icon src={trash} onClick={() => handleReset(training._id)} />
                </IconContainer>
              </ContainerTrainingPlane>
            </>
          ))}
      </ContainerPlane>
      <Footer />
    </Container>
  );
};

export default TrainingPlane;
