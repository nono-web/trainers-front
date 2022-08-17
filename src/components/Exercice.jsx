import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { desktop } from '../responsive';
import { useApp } from '../context/AppProvider';

import trash from '../assets/poubelle.png';
import search from '../assets/search.png';
import emptyHeart from '../assets/coeurVide.png';
import edit from '../assets/edit.png';
import heart from '../assets/coeur.png';


const Container = styled.div``;

const ContainerExercice = styled.div`
  background-color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 2rem;
  ${desktop({ margin: '2rem' })}
`;

const Title = styled.h3`
  text-align: center;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Time = styled.p`
  text-align: center;
  padding: 0.5rem;
`;

const Image = styled.img`
  width: 16rem;
  height: 10rem;
  ${desktop({ width: '20rem', height: '15rem' })}
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Icon = styled.img`
  width: 2rem;
  cursor: pointer;
`;

const Exercice = ({ item, setExercicesList,filteredExercices }) => {
  const navigator = useNavigate();
  const {
    coach,
    favoritesExercicesList,
    setfavoritesExercicesList,
  } = useApp();

  const onSearch = () => {
    navigator(`/exercices/${item._id}`);
  };

  const onEdit = () => {
    navigator(`/exercices/${item._id}/modifie`);
  };

  const refreshExercicesList = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/exercice`);
      setExercicesList(res.data);
    } catch (err) {}
  };

  const refreshFavoriteExList = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/coach/favoritesExList/${coach._id}`
        )
        .then(({ data }) => {
          setfavoritesExercicesList([...data]);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = async (_id) => {
    const { response } = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/exercice/${_id}`,
      [_id]
    );
    refreshExercicesList();
  };

  const handleAddFavorite = async (itemId) => {
    
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/coach/favoritesExercices/${coach._id}`,
          {
            newFavoriteExId: itemId,
          }
        )
        .then(({ data }) => {
          !favoritesExercicesList?.includes(itemId) &&
            favoritesExercicesList.push(data.response);
          localStorage.setItem(
            'favoritesExercicesList',
            JSON.stringify(favoritesExercicesList)
          );

          refreshFavoriteExList();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFavorite = async (itemId) => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/coach/removeOneFavoriteExe/${coach._id}`,
          {
            favoriteExId: itemId,
          }
        )
        .then(({ data }) => {
          refreshFavoriteExList();
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshExercicesList();
  }, []);

  

  return (
    <Container>
        <ContainerExercice>
          <Image src={item.img} />
          <Title> {item.name}</Title>
          <Time>Temps de l'exercice : {item.time} min</Time>
          <IconContainer>
            <Icon src={search} onClick={onSearch} />
            <Icon src={edit} onClick={onEdit} />
            {favoritesExercicesList?.includes(item._id) && (
              <Icon
                src={heart}
                onClick={(e) => {
                  handleRemoveFavorite(item._id);
                  e.stopPropagation();
                }}
              />
            )}
            {!favoritesExercicesList?.includes(item._id) && (
              <Icon
                src={emptyHeart}
                onClick={(e) => {
                  handleAddFavorite(item._id);
                  e.stopPropagation();
                }}
              />
            )}
            <Icon src={trash} onClick={() => handleReset(item._id)} />
          </IconContainer>
        </ContainerExercice>
    </Container>
  );
};

export default Exercice;
