import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logoTrainers8.png';
import { desktop } from '../responsive';

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
