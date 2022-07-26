import React, { useState } from 'react';
import styled from 'styled-components';

import { desktop } from '../responsive';
import Header from './Header';
import Exercices from '../components/Excercices';
import Footer from './Footer';
import { useApp } from '../context/AppProvider';
import FooterAdmin from './Admin/FooterAdmin';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: url('https://images.pexels.com/photos/47343/the-ball-stadion-horn-corner-47343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    center;
  background-size: cover;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 3rem;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${desktop({ flexDirection: 'row', justifyContent: 'space-between' })}
`;
const Filter = styled.div`
  margin: 1rem 1.25rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 2rem;
  ${desktop({})}
`;

const FilterText = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  margin-right: 0rem;
  text-align: center;
  ${desktop({ marginRight: '1.25rem' })}
`;

const Select = styled.select`
  padding: 0.8rem;
  margin: 0.7rem 0rem;
  border-radius: 2rem;
  text-align: center;
  ${desktop({ marginRight: '1.25rem' })}
`;

const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 0.8rem;
  margin: 0.7rem 0rem;
  border-radius: 2rem;
  text-align: center;
  ${desktop({ marginRight: '1.25rem' })}
`;
const Option = styled.option``;

const ExercicesList = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('asc');
  const { coach, showFavorites, setShowFavorites } = useApp();

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Header />
      {coach.isAdmin ? (
        <>
          <Title> Tous les exercices</Title>{' '}
          <Title> Partie Administrateur</Title>{' '}
        </>
      ) : (
        <Title> Tous les exercices</Title>
      )}

      <FilterContainer>
        <Filter>
          <FilterText>Filtrer les exercices: </FilterText>
          <Select name="categoriesAge" onChange={handleFilters}>
            <Option disabled>Catégories</Option>
            <Option>U6-U7</Option>
            <Option>U8-U9</Option>
            <Option>U10-U11</Option>
            <Option>U12-U13</Option>
            <Option>U14-U15</Option>
          </Select>
          <Select name="typeTraining" onChange={handleFilters}>
            <Option disabled>Type d'entrainement</Option>
            <Option>physique</Option>
            <Option>slalom</Option>
            <Option>course</Option>
            <Option>gardien</Option>
            <Option>tir de precision</Option>
            <Option>pressing</Option>
            <Option>passe</Option>
            <Option>tir </Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Trier les exercices: </FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="asc">Temps (asc)</Option>
            <Option value="desc">Temps (desc)</Option>
          </Select>
          <Button
            type="button"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {showFavorites ? 'Tous les exercices' : 'Exercices Favories'}
          </Button>
        </Filter>
      </FilterContainer>
      <Exercices filters={filters} sort={sort} />
      {coach.isAdmin ? <FooterAdmin /> : <Footer />}
    </Container>
  );
};

export default ExercicesList;
