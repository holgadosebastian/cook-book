import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <ul>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;
