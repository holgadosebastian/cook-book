import React from 'react';
import Container from '../../components/elements/container';
import notFoundPlaceholder from '../../assets/404_not_found.png';

const NotFound = () => {
  return (
    <Container.Wrapper>
      <Container className='has-text-centered'>
        <img src={notFoundPlaceholder} alt='' width='200' />
        <p>Not Found</p>
      </Container>
    </Container.Wrapper>
  );
};

export default NotFound;
