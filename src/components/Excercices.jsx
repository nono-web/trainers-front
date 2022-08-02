import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Exercice from './Exercice';

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Excercices = ({ filters, sort }) => {
  const [exercices, setExercices] = useState([]);
  const [filteredExercices, setFilteredExercices] = useState([]);
 

  const getExercices = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/exercice');
      setExercices(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    getExercices();
  }, []);

  useEffect(() => {
      setFilteredExercices(
        exercices.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
            
          )
        )
      );
  }, [exercices, filters]);


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
        <Exercice item={item} key={item._id} getExercices={getExercices} filteredExercices={filteredExercices} />
      ))}
    </Container>
  );
};

export default Excercices;
