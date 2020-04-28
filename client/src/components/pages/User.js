import React, { Fragment, useEffect, useContext } from 'react';
import RecipeList from '../recipes/RecipeList';
import Hero from '../common/Hero';
import { getUserName } from '../../utils/userUtils';
import userImagePlaceholder from '../../assets/user_placeholder.png';
import UserContext from '../../context/user/userContext';
import RecipeContext from '../../context/recipe/recipeContext';

const User = (props) => {
  const recipeContext = useContext(RecipeContext);
  const { recipes, getUserRecipes, loading } = recipeContext;

  const userContext = useContext(UserContext);
  const { user, getUser } = userContext;

  useEffect(() => {
    getUserRecipes(props.match.params.id);
    getUser(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  if (user === null) return <div>Loading</div>;

  let userImage = userImagePlaceholder;

  return (
    <Fragment>
      <Hero color='light'>
        <div className='hero-container with-image'>
          <div
            className='hero-image square-image is-rounded has-background-grey-lighter'
            style={{ backgroundImage: `url(${userImage})` }}
          ></div>
          <div>
            {(user.firstName || user.lastName) && (
              <p className='is-size-5 is-uppercase'>{user.username}</p>
            )}
            <h1 className='is-size-3 is-uppercase has-text-weight-light has-text-grey-darker'>
              {getUserName(user.firstName, user.lastName, user.username)}
            </h1>
            <p>Recipe count: 0</p>
          </div>
        </div>
      </Hero>

      <div className='container is-fluid'>
        <div className='tabs'>
          <ul>
            <li className='is-active is-uppercase'>
              <a href='#'>My Recipes</a>
            </li>
          </ul>
        </div>
        <RecipeList
          recipes={recipes}
          loading={loading}
          noRecipesMessage="User doesn't seem to have any public recipes"
        />
      </div>
    </Fragment>
  );
};

export default User;
