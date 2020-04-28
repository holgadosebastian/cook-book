import React from 'react';
import Spinner from './Spinner';

const LoadingContainer = ({ message }) => {
  return (
    <div className='container has-text-centered is-fullheight'>
      <Spinner size='large' />
      {message && <p className='is-size-6 has-text-grey mt2'>{message}</p>}
    </div>
  );
};

export default LoadingContainer;
