import React from 'react';
import imgHome from '../assets/terrain3.jpg';

import styled from 'styled-components';
import logo from '../assets/logoTrainers8.png';
import { desktop } from '../responsive';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background-image: url(${imgHome});
  height: 100vh;
  width: 100vw;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const Title = styled.h1 `
text-align: center;
font-size: 2rem;
padding: 0rem 1rem;
margin-bottom: 3rem;
${desktop({ fontSize:'3rem', marginBottom: '4rem' })}
`

const Logo = styled.img`
  width: 100%;
  margin-top: 8rem;
  margin-bottom: 2rem;
  ${desktop({ width: '40%', marginBottom: '0rem'})}
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${desktop({ flexDirection: 'row' })}
`;

const ButtonConnexion = styled.button`
  width: 10rem;
  height: 2.5rem;
  margin-top: 1.7rem;
  border-radius: 1.2rem;
  border: 0;
  font-size: 1.1rem;
  color: var(--dark);
  background-color: var(--green);
  transition: all 0.2s ease-out;
  &:hover {
    background-color: var(--light-green);
    color: var(--dark-green);
    cursor: pointer;
  }
`;

const ButtonRegister = styled.button`
  width: 10rem;
  height: 2.5rem;
  margin-top: 1.7rem;
  border-radius: 1.2rem;
  border: 0;
  font-size: 1.1rem;
  color: var(--dark);
  background-color: var(--light-orange);
  transition: all 0.2s ease-out;
  &:hover {
    background-color: var(--yellow);
    color: var(--orange);
    cursor: pointer;
  }
  ${desktop({ marginLeft: '2rem' })}
`;

const Home = () => {
    const navigator = useNavigate();
  const onConnexion = () => {
    navigator('/connexion');
  };

  const onInscription = () => {
    navigator('/enregistrement');
  };

  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Title> Bienvenue sur Trainers ! C'est l'heure de l'entrainement ! </Title>
      <ButtonContainer>
        <ButtonConnexion onClick={onConnexion}>CONNEXION</ButtonConnexion>
        <ButtonRegister onClick={onInscription}>INSCRIPTION</ButtonRegister>
      </ButtonContainer>
    </Container>
  );
};

export default Home;
