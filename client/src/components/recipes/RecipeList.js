import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import noRecipesImage from '../../assets/no_recipes.png';

const RecipeList = ({ recipes, loading, noRecipesMessage }) => {
  return (
    <Fragment>
      {loading ? (
        <ul className='columns is-multiline'>
          <RecipeCard loader />
          <RecipeCard loader />
          <RecipeCard loader />
        </ul>
      ) : !!recipes.length ? (
        <ul className='columns is-multiline'>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
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
