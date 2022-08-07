import styled from 'styled-components';
import { desktop } from '../responsive';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppProvider';
import Header from './Header';
import Footer from './Footer';

import trash from '../assets/poubelle.png';

const Container = styled.div`
  width: 100vw;
  height: 100%;
  background: url('https://cdn.pixabay.com/photo/2014/10/14/20/24/ball-488701_960_720.jpg')
    center;
  background-size: cover;
  ${desktop({ height: '100%' })}
`;

const Wrapper = styled.div`
  padding: 1.25rem;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  color: white;
  ${desktop({ fontSize: '3rem' })}
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

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${desktop({ flexDirection: 'row' })}
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  ${desktop({ flexDirection: 'row' })}
`;

const Input = styled.input`
  width: 70%;
  margin: 0rem 0.7rem 0rem 0rem;
  padding: 0.7rem;
  border-radius: 2rem;
  border: solid 1px var(--dark);
  text-align: center;
  &::placeholder {
    text-align: center;
  }
  ${desktop({ width: '20rem' })}
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin: 0.5rem;
  font-weight: bold;
  color: white;
  text-align: center;
`;

const Info = styled.div`
  flex: 3;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  );
  border-radius: 2rem;
  margin-bottom: 2rem;
`;

const Exercice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${desktop({ flexDirection: 'row' })}
`;

const ExerciceDetail = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${desktop({ flexDirection: 'row' })}
`;

const Image = styled.img`
  width: 12.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
  margin-left: 1rem;
  border-radius:2rem;
  &:nth-child(1) {
    margin-top: 1rem;
  }
`;

const Details = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ExerciceName = styled.span`
  font-size: 0.8rem;
  margin: 0.2rem;
  ${desktop({ fontSize: '1rem' })}
`;

const ExerciceId = styled.span`
  font-size: 1rem;
  margin: 0.2rem;
`;

const ExerciceTimes = styled.span`
  font-size: 1rem;
  margin: 0.2rem;
`;

const TimeDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ExerciceAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
`;
const ExerciceAmount = styled.div`
  font-size: 1.6rem;
  margin: 0.3rem;
`;
const ExerciceTime = styled.div`
  font-size: 2rem;
  font-weight: 200;
`;

const ContainerImgTrash = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageTrash = styled.img`
  width: 3rem;
  height: 3rem;
`;

const Summary = styled.div`
  background-color: white;
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 2rem;
  padding: 1.25rem;
  height: 40vh;
  ${desktop({ marginLeft: '1rem' })}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  text-align: center;
`;

const SummaryItem = styled.div`
  margin: 2rem 0rem;
  display: flex;
  justify-content: space-between;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const SummaryButton = styled.button`
  width: 100%;
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
`;

const CartExercices = () => {
  const [trainingName, setTrainingName] = useState(null);
  const navigator = useNavigate();
  const { id } = useParams();
  const { orderTrainingPlane, coach } = useApp();
  console.log(orderTrainingPlane);

  const total_quantity = orderTrainingPlane
    .map((item) => {
      return item.quantity;
    })
    .reduce((acc, value) => {
      return acc + value;
    }, 0);
  console.log('Le total est', total_quantity); // 20

  const total_time = orderTrainingPlane
    .map((item) => {
      return item.time * item.quantity;
    })
    .reduce((acc, value) => {
      return acc + value;
    }, 0);

  console.log('Le total est', total_time); // 20

  const Time_Hours = (total_time / 60).toFixed(2);

  const handlePrev = () => {
    navigator(-1);
  };
  const handleExercices = () => {
    navigator('/exercices');
  };

  const onSubmit = async () => {
    const values = {
      coachId: id,
      trainingName,
      exercices: orderTrainingPlane,
      total_time,
      nbTotal_exercices: total_quantity,
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/trainingPlane`,
        values
      );
      alert("L'entrainement est Prêt");
      localStorage.removeItem('orderTrainingPlane');
      navigator(`/entrainements/${values.coachId}`);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <Container>
      <Header />
      <Wrapper>
        <Title>Votre Panier d'éxercice</Title>
        <Top>
          <TopButton onClick={handlePrev}>Exercice Précédent</TopButton>
          <TopButton onClick={handleExercices}>
            Retourner sur les exercices
          </TopButton>
        </Top>
        <InputContainer>
          <Label> Nom de l'entrainement (Obligatoire) :</Label>
          <Input
            type="text"
            placeholder="Nom"
            name="trainingName"
            onChange={(e) => setTrainingName(e.target.value)}
          />
        </InputContainer>
        <Bottom>
          <Info>
            {orderTrainingPlane.length > 0 &&
              orderTrainingPlane.map((orders) => (
                <>
                  <Exercice>
                    <ExerciceDetail>
                      <Image
                        onClick={() => navigator(`/exercices/${orders._id}`)}
                        src={orders.img}
                      />
                      <Details>
                        <ExerciceName>
                          <b>Exercice : </b>
                          {orders.name}
                        </ExerciceName>
                        <ExerciceId>
                          <b>ID: </b> {orders._id}
                        </ExerciceId>
                        <ExerciceTimes>
                          <b>Temps de l'exercice: </b> {orders.time} min
                        </ExerciceTimes>
                      </Details>
                    </ExerciceDetail>
                    <ContainerImgTrash>
                      <ImageTrash src={trash} />
                    </ContainerImgTrash>
                    <TimeDetail>
                      <ExerciceAmountContainer>
                        <ExerciceAmount>
                          Nb d'éxercices : {orders.quantity}
                        </ExerciceAmount>
                      </ExerciceAmountContainer>
                      <ExerciceTime>
                        {' '}
                        {orders.time * orders.quantity} min
                      </ExerciceTime>
                    </TimeDetail>
                  </Exercice>
                </>
              ))}
          </Info>
          <Summary>
            <SummaryTitle>Récapitulatif de l'entrainement</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Nombre d'exercice : </SummaryItemText>
              <SummaryItemPrice> {total_quantity}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Temps de l'entrainement :</SummaryItemText>
              <SummaryItemPrice> {total_time} min</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Soit :</SummaryItemText>
              <SummaryItemPrice> {Time_Hours} h</SummaryItemPrice>
            </SummaryItem>
            <SummaryButton onClick={onSubmit}>
              Commencer mon entrainement
            </SummaryButton>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default CartExercices;
