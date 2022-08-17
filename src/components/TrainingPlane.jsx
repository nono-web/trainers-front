import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { desktop } from '../responsive';
import Footer from './Footer';
import Header from './Header';
import { formatDate } from '../utils/formatDate';
import SearchBar from './SearchBar';
import { useApp } from '../context/AppProvider';

import searchPlan from '../assets/search.png';
import trash from '../assets/poubelle.png';
import foot from '../assets/ballon-de-foot.png';

const Container = styled.div`
  width: 100%;
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
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  ${desktop({ flexDirection: 'row' })}
`;

const TopButton = styled.button`
  width: 15rem;
  border: none;
  border-radius: 1.2rem;
  padding: 1rem 1.2rem;
  margin: 1rem;
  color: var(--dark);
  background-color: var(--dark-green);
  transition: all 0.2s ease-out;
  &:hover {
    background-color: var(--light-green);
    color: var(--dark-green);
    cursor: pointer;
  }
  &:nth-child(3) {
    background-color: var(--light-orange);
    margin-left: 2rem;
  }
  &:hover:nth-child(3) {
    background-color: var(--yellow);
    color: var(--orange);
    cursor: pointer;
  }
  ${desktop({ margin: '1rem ', width: '20rem' })}
`;

const ContainerPlane = styled.div`
  display: flex;
  flex-direction: column;
  ${desktop({
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  })}
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

const Desc = styled.p`
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
  const [search, setSearch] = useState('');
  const navigator = useNavigate();
  const { coachId } = useParams();

  const fetchTrainingPlane = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/trainingPlane/${coachId}`
      );
      setTrainingPlane(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchTrainingPlane();
  }, [coachId]);
 
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

  return (
    <Container>
      <Header />
      <Title> Tout vos entrainements</Title>
      <Top>
        <TopButton onClick={handlePrev}>
          Retourner sur le panier d'éxercices
        </TopButton>
        <SearchBar
          placeholder="Recherchez votre entrainement"
          searched={search}
          setSearched={setSearch}
        />
        <TopButton onClick={handleExercices}>
          Retourner sur les exercices
        </TopButton>
      </Top>
      <ContainerPlane>
        {trainingPlane.length > 0 &&
          trainingPlane
            .filter((info) => {
              if (search === '') {
                return info;
              } else if (
                info.trainingName.toLowerCase().includes(search.toLowerCase())
              ) {
                return info;
              }
            })
            .map((training) => (
              <>
                <ContainerTrainingPlane key={training._id}>
                  <IconFoot src={foot} alt="foot" />
                  <Desc>
                    {' '}
                    <b>Entrainement : </b>
                    {training.trainingName}
                  </Desc>
                  <Desc>
                    <b>Temps Total de l'entrainement : </b>{' '}
                    {training.total_time} min
                  </Desc>
                  <Desc>
                    <b> Nb d'exercices : </b> {training.nbTotal_exercices}
                  </Desc>
                  <Desc>
                    {' '}
                    <b>Desc de création : </b> {formatDate(training.updatedAt)}{' '}
                  </Desc>
                  <IconContainer>
                    <Link
                      to={`/entrainements/details/${training._id}`}
                      state={{ data: training }}
                    >
                      <Icon src={searchPlan} />
                    </Link>
                    <Icon
                      src={trash}
                      onClick={() => handleReset(training._id)}
                    />
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
