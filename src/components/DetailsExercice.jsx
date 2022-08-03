import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { desktop } from '../responsive';
import Header from './Header';
import Footer from './Footer';
import { useApp } from '../context/AppProvider';

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

const Image = styled.img`
  width: 17rem;
  ${desktop({ width: '30rem', height: '20rem' })}
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
  text-align: center;
`;

const Desc = styled.p`
  margin: 0.5rem;
  text-align: center;
  ${desktop({ padding: '0rem 2rem' })}
`;
const AgeTitle = styled.h4`
  margin-bottom: 0.5rem;
`;

const Age = styled.p``;

const Time = styled.p`
  margin: 0.5rem;
`;
const TrainingTitle = styled.h4`
  margin: 0.5rem;
`;

const Training = styled.p``;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-top: 1rem;
`;

const Amount = styled.span`
  width: 2rem;
  height: 2rem;
  border-radius: 0.7rem;
  border: 2px solid var(--green);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0rem 0.4rem;
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
    background-color: var(--dark-green);
  }
  &:hover:nth-child(2) {
    background-color: var(--green);
    cursor: pointer;
  }
  &:nth-child(3) {
    background-color: var(--light-orange);
  }
  &:hover:nth-child(3) {
    background-color: var(--yellow);
    color: var(--orange);
    cursor: pointer;
  }
  ${desktop({ margin: '1rem ', width: '20rem' })}
`;

const DetailsExercice = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const onCancel = () => navigator('/exercices');

  const [selectedExercice, setSelectedExercice] = useState({});
  const [quantity, setQuantity] = useState(0);
  const {
    setOrderTrainingPlane,
    orderTrainingPlane,
    exercicesList,
    setExercicesList,
  } = useApp();

  const handleQuantity = (type) => {
    if (type === 'dec') {
      setQuantity((prevState) => prevState - 1);

      const newOrderTraining = orderTrainingPlane.map((item) => {
        // 👇️ if id equals 2, update country property
        if (item._id === id) {
          return { ...item, quantity: (item.quantity -= 1) };
        }

        // 👇️ otherwise return iteme as is
        return item;
      });
      setOrderTrainingPlane(newOrderTraining);
    } else {
      setQuantity((prevState) => prevState + 1);

      const newOrderTraining = orderTrainingPlane.map((item) => {
        // 👇️ if id equals 2, update country property
        if (item._id === id) {
          return { ...item, quantity: (item.quantity += 1) };
        }

        // 👇️ otherwise return itemect as is
        return item;
      });
      setOrderTrainingPlane(newOrderTraining);
    }
  };

  const onEditExercice = () => {
    navigator(`/exercices/${id}/modifie`);
  };

  const handleClickCart = (id) => {
    let newOrder = { ...selectedExercice, quantity: 1 };
    setOrderTrainingPlane(() => [...orderTrainingPlane, newOrder]);
    setQuantity((prevState) => (prevState += 1));
  };

  useEffect(() => {
    exercicesList
      .filter((selectedEx) => selectedEx._id === id)
      .map((selectedEx) => setSelectedExercice(selectedEx));

    console.log(
      'selectedId is included in planOrderEx',
      orderTrainingPlane.some((plannedEx) => plannedEx._id === id)
    );

    orderTrainingPlane.some((plannedEx) => plannedEx._id === id) &&
      orderTrainingPlane
        .filter((element) => element._id === id)
        .map((item) => {
          setQuantity(item.quantity);
        });

    // const fetchDataExerciceDetails = async () => {
    //   const res = await axios.get(
    //     `${process.env.REACT_APP_API_URL}/api/exercice/${id}`
    //   );
    //   setExercice(res.data);
    //   // console.log(res.data);
    // };

    // fetchDataExerciceDetails();

    // quantity === 0 &&
    //   setOrderTrainingPlane(() =>
    //     orderTrainingPlane.filter((item) => item._id !== id)
    //   );

    // orderTrainingPlane.some((item) => item._id !== id) && setQuantity(0);
    console.log('selectedId', id);
    console.log('orderTrainingPlane', orderTrainingPlane);
  }, [id, quantity, exercicesList, orderTrainingPlane]);

  return (
    <Container>
      <Header />
      {!orderTrainingPlane.some((plannedEx) => plannedEx._id === id)
        ? exercicesList
            .filter((selectedEx) => selectedEx._id === id)
            .map((element) => (
              <>
                <Image src={element.img} />
                <Wrapper>
                  <Title>{element.name}</Title>
                  <Desc>{element.desc}</Desc>
                  <AgeTitle>Catégories : </AgeTitle>
                  {element.categoriesAge?.map((c) => (
                    <>
                      <Age>{c}</Age>
                    </>
                  ))}
                  <Time> Temps de l'exercice : {element.time} min</Time>
                  <TrainingTitle>Type d'entrainement : </TrainingTitle>
                  {element.typeTraining?.map((t) => (
                    <>
                      <Training>{t}</Training>
                    </>
                  ))}

                  {quantity > 0 && (
                    <AmountContainer>
                      <p
                        styled={{ cursor: 'pointer' }}
                        width="1rem"
                        height="1rem"
                        viewBox="0 0 24 24"
                        onClick={(event) => {
                          event.stopPropagation();

                          handleQuantity('dec');
                        }}
                      >
                        -
                      </p>
                      <Amount
                        style={{
                          width: '1rem',
                          height: '1rem',
                          margin: '10px',
                        }}
                      >
                        {quantity}
                      </Amount>
                      <p
                        styled={{ cursor: 'pointer' }}
                        width="1rem"
                        height="1rem"
                        viewBox="0 0 24 24"
                        onClick={(event) => {
                          event.stopPropagation();

                          handleQuantity('inc');
                        }}
                      >
                        +
                      </p>
                    </AmountContainer>
                  )}

                  <ButtonContainer>
                    {quantity === 0 ? (
                      <Button onClick={() => handleClickCart(id)}>
                        Ajouter au panier d'exercices{' '}
                      </Button>
                    ) : (
                      ''
                    )}
                    <Button onClick={onEditExercice}>Modifier Exercice</Button>
                    <Button onClick={onCancel}>Revenir aux exercices</Button>
                  </ButtonContainer>
                </Wrapper>
              </>
            ))
        : orderTrainingPlane
            .filter((selectedEx) => selectedEx._id === id)
            .map((element) => (
              <>
                <Image src={element.img} />
                <Wrapper>
                  <Title>{element.name}</Title>
                  <Desc>{element.desc}</Desc>
                  <AgeTitle>Catégories : </AgeTitle>
                  {element.categoriesAge?.map((c) => (
                    <>
                      <Age>{c}</Age>
                    </>
                  ))}
                  <Time> Temps de l'exercice : {element.time} min</Time>
                  <TrainingTitle>Type d'entrainement : </TrainingTitle>
                  {element.typeTraining?.map((t) => (
                    <>
                      <Training>{t}</Training>
                    </>
                  ))}

                  {element.quantity > 0 && (
                    <AmountContainer>
                      <p
                        styled={{ cursor: 'pointer' }}
                        width="1rem"
                        height="1rem"
                        viewBox="0 0 24 24"
                        onClick={(event) => {
                          event.stopPropagation();

                          handleQuantity('dec');
                        }}
                      >
                        -
                      </p>
                      <Amount
                        style={{
                          width: '1rem',
                          height: '1rem',
                          margin: '10px',
                        }}
                      >
                        {quantity}
                      </Amount>
                      <p
                        styled={{ cursor: 'pointer' }}
                        width="1rem"
                        height="1rem"
                        viewBox="0 0 24 24"
                        onClick={(event) => {
                          event.stopPropagation();

                          handleQuantity('inc');
                        }}
                      >
                        +
                      </p>
                    </AmountContainer>
                  )}

                  <ButtonContainer>
                    {quantity === 0 ? (
                      <Button onClick={() => handleClickCart(id)}>
                        Ajouter au panier d'exercices{' '}
                      </Button>
                    ) : (
                      ''
                    )}
                    <Button onClick={onEditExercice}>Modifier Exercice</Button>
                    <Button onClick={onCancel}>Revenir aux exercices</Button>
                  </ButtonContainer>
                </Wrapper>
              </>
            ))}

      <Footer />
    </Container>
  );
};

export default DetailsExercice;
