import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, loading }) => {
  return (
    <div>
      {loading ? (
        <ul className='columns' style={{ flexWrap: 'wrap' }}>
          <RecipeCard loader />
          <RecipeCard loader />
          <RecipeCard loader />
        </ul>
      ) : (
        <ul className='columns' style={{ flexWrap: 'wrap' }}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </ul>
      )}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;
