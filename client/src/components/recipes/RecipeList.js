import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

const RecipeList = ({
  recipes,
  loading,
  noRecipesMessage = 'No recipes found'
}) => {
  return (
    <div>
      {loading ? (
        <ul className='columns' style={{ flexWrap: 'wrap' }}>
          <RecipeCard loader />
          <RecipeCard loader />
          <RecipeCard loader />
        </ul>
      ) : !!recipes.length ? (
        <ul className='columns' style={{ flexWrap: 'wrap' }}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </ul>
      ) : (
        <div>
          <p className='is-size-5'>{noRecipesMessage}</p>
        </div>
      )}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  noRecipesMessage: PropTypes.string
};

export default RecipeList;
