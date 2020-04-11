import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const recipes = [
    {
      title: 'Sandwich',
      timeTake: 90,
      id: 1
    },
    {
      title: 'Toast',
      timeTake: 90,
      id: 2
    }
  ];

  return (
    <div>
      <ul>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
