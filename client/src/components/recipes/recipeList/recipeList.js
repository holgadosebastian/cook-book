import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../recipeCard';
import noRecipesImage from '../../../assets/no_recipes.png';

const RecipeList = ({ loading, recipes, noRecipesMessage }) => {
  return (
    <Fragment>
      {loading ? (
        <ul className='columns is-multiline'>
          <li style={{ marginTop: '24px' }} className='column is-one-third'>
            <RecipeCard loader />
          </li>
          <li style={{ marginTop: '24px' }} className='column is-one-third'>
            <RecipeCard loader />
          </li>
          <li style={{ marginTop: '24px' }} className='column is-one-third'>
            <RecipeCard loader />
          </li>
        </ul>
      ) : !!recipes.length ? (
        <ul className='columns is-multiline'>
          {recipes.map((recipe) => (
            <li
              style={{ marginTop: '24px' }}
              key={recipe._id}
              className='column is-one-third'
            >
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ marginTop: '24px' }} className='has-text-centered'>
          <span className='square-image'>
            <img src={noRecipesImage} alt='No Recipes' />
          </span>

          <p className='is-size-6 has-text-grey'>{noRecipesMessage}</p>
        </div>
      )}
    </Fragment>
  );
};

RecipeList.defaultProps = {
  loading: false,
  noRecipesMessage: 'No recipes found'
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  noRecipesMessage: PropTypes.string
};

export default RecipeList;
