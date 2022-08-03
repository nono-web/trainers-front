import React from 'react';
import styled from 'styled-components';

import terrain from '../assets/terrain-de-football.png';
import entrainement from '../assets/entrainement.png';
import entraineur from '../assets/entraineur.png';
import disconnect from '../assets/sortir.png';
import create from '../assets/coup-franc.png';
import { Link } from 'react-router-dom';
import { desktop } from '../responsive';
import { useApp } from '../context/AppProvider';

const Container = styled.div`
  bottom: 0;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  );
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  width: 100%;
  ${desktop({ justifyContent: 'space-around' })}
`;

const LinkFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: white;
`;

const Image = styled.img`
  width: 3rem;
  height: 3rem;
  margin-bottom: 0.3rem;
  margin-top: 0.5rem;
  ${desktop({ width: '5rem', height: '5rem' })}
`;

const Title = styled.a`
  margin: 0rem 0.5rem 0.7rem 0.5rem;
  text-decoration: none;
  font-size: 0.8rem;
  text-align: center;
  ${desktop({ fontSize: '1rem' })}
`;
const Counter = styled.div`
  position: relative;
  top: -108px;
  right: -25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  padding: 2px;
  background-color: teal;
  color: white;
  ${desktop({ top: '-120px', right: '-35px' })}
`;

const Footer = () => {
  const { coach } = useApp();
  const footerLinks = [
    {
      title: "Panier d'exercices",
      logo: terrain,
      link: '/panierExercices',
    },
    {
      title: 'Entrainement',
      logo: entrainement,
      link: '/entrainement',
    },
    {
      title: 'Creer Exercice',
      logo: create,
      link: '/createNew',
    },
    {
      title: 'Profil',
      logo: entraineur,
      link: `/profil/${coach._id}`,
    },
    {
      title: 'Deconnexion',
      logo: disconnect,
      link: '/disconnect',
    },
  ];
  return (
    <Container>
      {footerLinks.map(({ title, logo, link }, i) => (
        <Link to={link} key={i}>
          <LinkFooter key={i}>
            <Image src={logo} alt={title} />
            <Title>{title}</Title>
          </LinkFooter>
        </Link>
      ))}
    </Container>
  );
};

export default Footer;
