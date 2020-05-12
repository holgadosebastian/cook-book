import React, { Fragment, useContext, useEffect } from 'react';
import Hero from '../../components/elements/hero';
import Columns from '../../components/elements/columns';
import Button from '../../components/elements/button';
import RecipeContainer from '../../components/recipes/recipeContainer';
import LoginForm from '../../components/auth/loginForm';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Hero
        size='medium'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80)'
        }}
      >
        <Columns className='has-text-grey-dark' centered>
          <Columns.Column className='has-text-centered' size={6}>
            <h1 className='is-size-3 is-uppercase'>Welcome to RecipGeek</h1>
            <p className='is-size-5'>Create, share and discover new recipes</p>
          </Columns.Column>
        </Columns>
      </Hero>

      <RecipeContainer />

      <Hero
        size='medium'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80)'
        }}
      >
        <Columns centered>
          <Columns.Column className='has-text-centered' size={6}>
            {isAuthenticated ? (
              <div className='has-text-centered'>
                <h3 className='is-size-4 mb3'>Want to try something new?</h3>
                <Button to='/search'>Search Recipes</Button>
              </div>
            ) : (
              <LoginForm />
            )}{' '}
          </Columns.Column>
        </Columns>
      </Hero>
    </Fragment>
  );
};

export default Home;
