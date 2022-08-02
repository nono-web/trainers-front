import React, { useState} from 'react';
import styled from 'styled-components';

import { desktop } from '../responsive';
import Header from './Header';
import Exercices from '../components/Excercices';
import Footer from './Footer';

const Container = styled.div`
  width: 100vw;
  height: auto;
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
  background-color: white;
  border-radius: 2rem;
  ${desktop({ margin: '1.25rem', padding: '1rem' })}
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
const Option = styled.option``;

const ExercicesList = () => {
 
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('asc');


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
      <Title> Tous les exercices</Title>
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
            <Option>Physique</Option>
            <Option>Stalom</Option>
            <Option>Course</Option>
            <Option>Gardien</Option>
            <Option>Tir de precision</Option>
            <Option>Pressing</Option>
            <Option>Passe</Option>
          </Select>
        
        </Filter>
        <Filter>
          <FilterText>Trier les exercices: </FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="asc">Temps (asc)</Option>
            <Option value="desc">Temps (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Exercices filters={filters} sort={sort}/>
      <Footer />
    </Container>
  );
};

export default ExercicesList;
