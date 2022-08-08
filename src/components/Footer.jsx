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
  margin-top: 5rem;
  bottom: 0;
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

const Footer = () => {
  const { coach } = useApp();
  const footerLinks = [
    {
      title: "Training order",
      logo: terrain,
      link: `/panierExercices/${coach._id}`,
    },
    {
      title: 'Trainings list',
      logo: entrainement,
      link: `/entrainements/${coach._id}`,
    },
    {
      title: 'Create exercice',
      logo: create,
      link: '/nouvelExercice',
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
