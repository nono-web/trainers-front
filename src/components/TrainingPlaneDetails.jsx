import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useApp } from '../context/AppProvider';
import {formatDate} from '../utils/formatDate'
import axios from 'axios';
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

const Wrapper = styled.div`
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 1)
  );
  margin: 3rem 10rem;
`;
const Title = styled.h1`
text-align: center;
`;

const TotalContainer = styled.div `
display: flex;
justify-content: space-between;
align-items: center;
`

const TotalTime = styled.p `
margin: 1rem;
font-weight: bold;
`


const TotalQuantity = styled.p `
margin: 1rem;
font-weight: bold;
`

const Date = styled.p `
margin: 1rem;
font-weight: bold;
text-align: center;
`
const ExercicesContainer = styled.div ``

const TrainingPlaneDetails = () => {
  const [trainingPlaneDetails, setTrainingPlaneDetails] = useState([]);
  const { exercicesList} = useApp();
  const navigator = useNavigate();
  const { id } = useParams();

  const getTrainingPlane = async () => {
    try {
      const {data} = await axios.get(
        `http://localhost:8000/api/trainingPlane/${id}/details`
      );
      setTrainingPlaneDetails(data)
      console.log(trainingPlaneDetails)
    } catch (err) {}
  };

  useEffect(() => {
    getTrainingPlane();
  }, [id]);
  console.log("trainingPlaneDetails",trainingPlaneDetails)

  return (
    <Container>
      <Header />
      <Wrapper>
        
        <Title>{trainingPlaneDetails.trainingName}</Title>
        <TotalContainer>
            <TotalTime>Temps de l'entrainement total : {trainingPlaneDetails.total_time} min</TotalTime>
            <TotalQuantity>Nb d'exercices : {trainingPlaneDetails.nbTotal_exercices}</TotalQuantity>
        </TotalContainer>
        <Date> Date de création :{formatDate(trainingPlaneDetails.createdAt)} </Date>
        <ExercicesContainer>
        exercicesList
            {/* <Title>{trainingPlaneDetails._id }</Title> */}
        </ExercicesContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default TrainingPlaneDetails;
