import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { desktop } from '../../responsive';
import axios from 'axios';
import Header from '../Header';
import trash from '../../assets/poubelle.png';
import coachs from '../../assets/entraineurAdmin.png';

import { useNavigate } from 'react-router-dom';
import FooterAdmin from './FooterAdmin';

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

const ContainerCoach = styled.div`
  display: flex;
  flex-direction: column;;
  ${desktop({ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' })}
`;

const ContainerAdminCoach = styled.div`
  background-color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${desktop({ margin: '2rem' })}
`;

const IconCoach = styled.img`
  width: 4rem;
  cursor: pointer;
`;

const Desc = styled.p`
  text-align: center;
  padding: 0.8rem;
`;

const Icon = styled.img`
  width: 2rem;
  cursor: pointer;
  &:nth-child(1) {
    margin-right: 5rem;
  }
`;
const AdminCoach = () => {
  const [AdminCoach, setAdminCoach] = useState([]);
  const navigator = useNavigate();

  const fetchAdminCoach = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/coach`);
      setAdminCoach(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchAdminCoach();
  }, []);

  const handlePrev = () => {
    navigator(-1);
  };
  const handleExercices = () => {
    navigator('/exercices');
  };

  const handleReset = async (_id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/coach/${_id}`);
    fetchAdminCoach();
  };

  return (
    <Container>
      <Header />
      <Title> Tout les Entraineurs</Title>
      <Top>
        <TopButton onClick={handlePrev}>Précédent</TopButton>
        <TopButton onClick={handleExercices}>
          Retourner sur les exercices
        </TopButton>
      </Top>
      <ContainerCoach>
        {AdminCoach.length > 0 &&
          AdminCoach.map((coach) => (
            <>
              <ContainerAdminCoach key={coach._id}>
                <IconCoach src={coachs} alt="foot" />
                <Desc>
                  {' '}
                  Nom : <b>{coach.firstname}</b>
                </Desc>
                <Desc>
                  Prenom : <b>{coach.lastname}</b>
                </Desc>
                <Desc>
                  Pseudo :<b> {coach.username}</b>
                </Desc>
                <Desc>
                  Email : <b>{coach.email}</b>
                </Desc>
                <Desc>
                  Numero de Téléphone :<b> {coach.phoneNumber}</b>
                </Desc>
                <Desc>
                  Club : <b>{coach.club}</b>
                </Desc>

                <Icon src={trash} onClick={() => handleReset(coach._id)} />
              </ContainerAdminCoach>
            </>
          ))}
      </ContainerCoach>
      <FooterAdmin />
    </Container>
  );
};

export default AdminCoach;
