import React from 'react'
import styled from 'styled-components';

const Container = styled.div `
  position: fixed;
  bottom: 0;
  z-index: 2;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: -20px;
  padding: 18px 10px;
  width: 100%;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  background-color: var(--green);
`

const Link = styled.div ``

const Footer = () => {

    const footerLinks = [
        {
          title: 'exercices',
          logo: search,
          link: '/exercices',
        },
        {
          title: "Panier d'exercices",
          logo: basket,
          link: '/panier',
        },
        {
          title: 'Entrainement',
          logo: invoice,
          link: '/entrainement',
        },
        {
          title: 'Profil',
          logo: settings,
          link: '/profil',
        },
      ];
  return (
    <Container>
      
    </Container>
  )
}

export default Footer
