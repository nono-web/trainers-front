import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useApp } from '../context/AppProvider';
import Exercice from './Exercice';

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Excercices = ({ filters, sort }) => {
  const { exercicesList, setExercicesList } = useApp();
  const [filteredExercices, setFilteredExercices] = useState([]);

  useEffect(() => {
    setFilteredExercices(
      exercicesList.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [filters, exercicesList]);

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredExercices((prev) =>
        [...prev].sort((a, b) => a.createAt - b.createAt)
      );
    } else if (sort === 'asc') {
      setFilteredExercices((prev) => [...prev].sort((a, b) => a.time - b.time));
    } else {
      setFilteredExercices((prev) => [...prev].sort((a, b) => b.time - a.time));
    }
  }, [sort]);

  return (
    <Container>
      {filteredExercices.map((item) => (
        <Exercice
          item={item}
          key={item._id}
          exercicesList={exercicesList}
          setExercicesList={setExercicesList}
          filteredExercices={filteredExercices}
        />
      ))}
    </Container>
  );
};

export default Excercices;
