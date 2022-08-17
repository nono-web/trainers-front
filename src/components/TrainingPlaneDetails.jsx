import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useApp } from '../context/AppProvider';
import { desktop } from '../responsive';
import { formatDate } from '../utils/formatDate';
import FooterAdmin from './Admin/FooterAdmin';
import Footer from './Footer';
import Header from './Header';

const Container = styled.div`
  width: 100vw;
  height: 100%;
  background: url('https://cdn.pixabay.com/photo/2014/10/14/20/24/ball-488701_960_720.jpg')
    center;
  background-size: cover;
  display: flex;
  flex-direction: column;
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

const Wrapper = styled.div`
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.6)
  );
  margin: 1rem;
  border-radius: 2rem;
  ${desktop({ margin: '1rem 15rem' })}
`;
const Title = styled.h1`
  text-align: center;
  margin-top: 1rem;
`;

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ${desktop({ flexDirection: 'row' })}
`;

const TotalTime = styled.p`
  margin: 1rem;
  font-weight: bold;
`;

const TotalQuantity = styled.p`
  margin: 1rem;
  font-weight: bold;
`;

const Date = styled.p`
  margin: 1rem;
  font-weight: bold;
  text-align: center;
`;
const ExercicesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerExercicesPlan = styled.div`
  background-color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${desktop({ margin: '2rem' })}
`;

const Image = styled.img`
  width: 12rem;
  height: 12rem;
  cursor: pointer;
`;

const DescTitle = styled.p`
margin-top: 1rem;
  text-align: center;
`;

const Desc = styled.p`
  text-align: center;
  margin: 0.5rem;
`;

const TrainingPlaneDetails = () => {
  const location = useLocation();
  const { data } = location.state;
  const { exercicesList, coach } = useApp();
  const navigator = useNavigate();
 
  const exercicesPlan = exercicesList.filter((planex) =>
    data.exercices.find((ex) => planex._id === ex._id)
  );

  const quantityExercicesPlan = data.exercices.filter((planex) =>
    exercicesPlan.find((ex) => planex._id === ex._id)
  );
 
  const handlePrev = () => {
    navigator(-1);
  };
  const handleExercices = () => {
    navigator('/exercices');
  };

  return (
    <Container>
      <Header />
      <Top>
        <TopButton onClick={handlePrev}>Precedent</TopButton>
        <TopButton onClick={handleExercices}>
          Retourner sur les exercices
        </TopButton>
      </Top>
      <Wrapper>
        <Title>{data.trainingName}</Title>
        <TotalContainer>
          <TotalTime>
            Temps de l'entrainement total : {data.total_time} min
          </TotalTime>
          <TotalQuantity>
            Nb d'exercices : {data.nbTotal_exercices}
          </TotalQuantity>
        </TotalContainer>
        <Date> Date de création : {formatDate(data.createdAt)} </Date>
        <ExercicesContainer>
          {exercicesPlan.length > 0 &&
            exercicesPlan.map((exercices) => (
              <>
                <ContainerExercicesPlan>
                  <Image src={exercices.img} alt="training" />
                  <DescTitle>
                    <b>Titre de l'éxercice </b> :
                  </DescTitle>
                  <Desc> {exercices.name}</Desc>
                  <DescTitle>
                    <b>Description de l'exercice </b> :
                  </DescTitle>
                  <Desc> {exercices.desc}</Desc>
                  <DescTitle>
                    <b>Temps de l'exercice </b> :
                  </DescTitle>
                  <Desc> {exercices.time} min</Desc>
                  <DescTitle>
                    {' '}
                    <b>Nombres d'éxercices : </b>{' '}
                  </DescTitle>
                  {quantityExercicesPlan.length > 0 &&
                    quantityExercicesPlan.map((exercicesQuantity) =>
                      exercicesQuantity._id === exercices._id ? (
                        <Desc>{exercicesQuantity.quantity}</Desc>
                      ) : (
                        ''
                      )
                    )}
                </ContainerExercicesPlan>
              </>
            ))}
        </ExercicesContainer>
      </Wrapper>
      {coach.isAdmin ? <FooterAdmin /> :  <Footer /> }
    </Container>
  );
};

export default TrainingPlaneDetails;
