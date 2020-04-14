import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeList from '../recipes/RecipeList';
import RecipeContext from '../../context/recipe/recipeContext';
import AuthContext from '../../context/auth/authContext';

const AllRecipes = () => {
  const recipeContext = useContext(RecipeContext);
  const { recipes, getRecipes } = recipeContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className='container is-fluid'
      style={{ paddingTop: '24px', paddingBottom: '48px' }}
    >
      <div style={{ position: 'relative' }}>
        <p className='is-size-4 has-text-grey-darker is-uppercase has-text-weight-light'>
          Latest Recipes
        </p>
        {isAuthenticated && (
          <Link
            to='/new-recipe'
            className='button is-primary is-uppercase is-outlined is-rounded is-small'
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              marginTop: '-15px'
            }}
          >
            Add Recipe
          </Link>
        )}
      </div>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default AllRecipes;
