import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { desktop } from '../responsive';

import logo from '../assets/logoTrainers8.png';


const Header = () => {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
  `;

  const Logo = styled.img`
    width: 20rem;
    ${desktop({width: '20rem'})}
  `;

  return (
    <Link to="/exercices">
      <Container>
        <Logo src={logo} atl="trainers logo" />
      </Container>
    </Link>
  );
};

export default Header;
