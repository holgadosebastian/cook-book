import React, { useContext, useEffect } from 'react';
import RecipeList from '../recipes/RecipeList';
import RecipeContext from '../../context/recipe/recipeContext';

const AllRecipes = () => {
  const recipeContext = useContext(RecipeContext);
  const { recipes, getRecipes } = recipeContext;

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
      </div>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default AllRecipes;
