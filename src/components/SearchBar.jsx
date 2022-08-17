import React from 'react';
import styled from 'styled-components';

import cross from '../assets/cross.png';
import search from '../assets/loupe.png';

const Container = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
background-color: var(--light-green);
border-radius: 1.2rem;
padding: 0.3rem;
`;

const Input = styled.input`
background-color: var(--light-green);
  width: 15rem;
  border: none;
  border-radius: 1.2rem;
  padding: 1rem;
&:focus {
   outline: none;
}
`;

const SearchIcon = styled.div `
`;

const Image = styled.img`
width : 3rem;
cursor: pointer;
`;

const SearchBar = ({ placeholder, setSearched, searched }) => {
  const handleChange = (e) => {
    setSearched(e.target.value);
  };

  const clearInput = () => {
    setSearched('');
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder={placeholder}
        value={searched}
        onChange={handleChange}
      />
      <SearchIcon>
        {searched ? (
          <Image src={cross} onClick={clearInput} />
        ) : (
          <Image src={search} />
        )}
      </SearchIcon>
    </Container>
  );
};

export default SearchBar;
