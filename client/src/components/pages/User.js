import React, { useEffect, useContext } from 'react';
import RecipeList from '../recipes/RecipeList';
import UserContext from '../../context/user/userContext';
import RecipeContext from '../../context/recipe/recipeContext';

const User = (props) => {
  const recipeContext = useContext(RecipeContext);
  const { recipes, getUserRecipes } = recipeContext;

  const userContext = useContext(UserContext);
  const { user, getUser } = userContext;

  useEffect(() => {
    getUserRecipes(props.match.params.id);
    getUser(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className='container is-fluid'
      style={{ paddingTop: '24px', paddingBottom: '48px' }}
    >
      <h1 className='is-size-4 is-uppercase has-text-weight-light has-text-grey-darker'>
        {user !== null &&
          (user.firstName || user.lastName
            ? user.firstName + ' ' + user.lastName
            : user.username)}
        's Recipes
      </h1>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default User;
