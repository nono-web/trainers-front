import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { desktop } from '../responsive';
import Header from './Header';
import Footer from './Footer';
import { useApp } from '../context/AppProvider';
import FooterAdmin from './Admin/FooterAdmin';

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
  cursor: pointer;
`;

const AmountSign = styled.p`
  width: 1rem;
  height: 1rem;
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
  cursor: pointer;
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
  const { coach } = useApp();

  const [selectedExercice, setSelectedExercice] = useState({});
  const [quantity, setQuantity] = useState(0);
  const { setOrderTrainingPlane, orderTrainingPlane, exercicesList } = useApp();

  const handleQuantity = (type) => {
    if (type === 'dec') {
      setQuantity((prevState) => prevState - 1);

      const newOrderTraining = orderTrainingPlane.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: (item.quantity -= 1) };
        }

        return item;
      });
      setOrderTrainingPlane(newOrderTraining);
    } else {
      setQuantity((prevState) => prevState + 1);

      const newOrderTraining = orderTrainingPlane.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: (item.quantity += 1) };
        }

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
                      <AmountSign
                        onClick={(event) => {
                          event.stopPropagation();
                          handleQuantity('dec');
                        }}
                      >
                        -
                      </AmountSign>
                      <Amount>{quantity}</Amount>
                      <AmountSign
                        onClick={(event) => {
                          event.stopPropagation();
                          handleQuantity('inc');
                        }}
                      >
                        +
                      </AmountSign>
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
                      <AmountSign
                        onClick={(event) => {
                          event.stopPropagation();
                          handleQuantity('dec');
                        }}
                      >
                        -
                      </AmountSign>
                      <Amount>{quantity}</Amount>
                      <AmountSign
                        onClick={(event) => {
                          event.stopPropagation();
                          handleQuantity('inc');
                        }}
                      >
                        +
                      </AmountSign>
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
      {coach.isAdmin ? <FooterAdmin /> : <Footer />}
    </Container>
  );
};

export default DetailsExercice;
