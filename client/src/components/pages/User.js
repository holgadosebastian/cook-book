import React, { useEffect, useContext } from 'react';
import RecipeList from '../recipes/RecipeList';
import RecipeContext from '../../context/recipe/recipeContext';

const User = (props) => {
  const recipeContext = useContext(RecipeContext);
  const { recipes, getUserRecipes } = recipeContext;

  useEffect(() => {
    getUserRecipes(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className='container is-fluid'
      style={{ paddingTop: '24px', paddingBottom: '48px' }}
    >
      <h1 className='is-size-4 is-uppercase has-text-weight-light has-text-grey-darker'>
        User's Recipes
      </h1>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default User;
