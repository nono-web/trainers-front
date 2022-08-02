import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { desktop } from '../responsive';
import Header from './Header';
import Footer from './Footer';

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

const Input = styled.input`
  width: 15rem;
  border-radius: 2rem;
  &::placeholder {
    text-align: center;
  }
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
text-align:center;
`

const ProfilCoach = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const onCancel = () => navigator('/exercices');

  const [profil, setProfil] = useState([]);
  const [firstname, setFirsname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [club, setClub] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  

  useEffect(() => {
    const fetchDataProfil = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/coach/${id}`
      );
      setProfil(res.data);
      console.log(res.data);
    };
    fetchDataProfil();
  }, [id]);

  const handleChange = () => {
    const values = {
      firstname,
      lastname,
      username,
      email,
      password,
      club,
      phoneNumber
    };
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/coach/${id}`, values)
      .then(({ data }) => {
        console.log({
          data,
        });
       return  alert("Votre profil a été modifié");
      });
  };

  return (
    <Container>
      <Header />
      <Wrapper>
        <Title>{profil.firstname}</Title>
        <Input
          type="text"
          placeholder="Modifier votre nom"
          onChange={(e) => setFirsname(e.target.value)}
        />
         <Title>{profil.lastname}</Title>
        <Input
          type="text"
          placeholder="Modifier votre prenom"
          onChange={(e) => setLastname(e.target.value)}
        />
            <Title>{profil.username}</Title>
        <Input
          type="text"
          placeholder="Modifier votre pseudo"
          onChange={(e) => setUsername(e.target.value)}
        />
            <Title>{profil.email}</Title>
        <Input
          type="text"
          placeholder="Modifier votre email"
          onChange={(e) => setEmail(e.target.value)}
        />
            <Title>{profil.club}</Title>
        <Input
          type="text"
          placeholder="Modifier votre club"
          onChange={(e) => setClub(e.target.value)}
        />
        <Title>{profil.phoneNumber}</Title>
           <Input
          type="text"
          placeholder="Modifier votre numero de téléphone"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      
        <Warning> ⚠ Tout les champs doivent étre remplis pour modifier l'exercice </Warning>
        <ButtonContainer>
          <Button onClick={handleChange}>Modifié l'exercice</Button>
          <Button onClick={onCancel}>Revenir aux exercices</Button>
        </ButtonContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default ProfilCoach;
