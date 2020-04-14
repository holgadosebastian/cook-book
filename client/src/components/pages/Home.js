import React, { useContext, useEffect } from 'react';
import AllRecipes from './AllRecipes';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <AllRecipes />
    </div>
  );
};

export default Home;
