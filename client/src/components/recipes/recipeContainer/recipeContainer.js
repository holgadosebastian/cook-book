import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeList from '../recipeList';

const RecipeContainer = () => {
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const loadRecipes = async () => {
    let res = await axios.get('/api/recipes/latest');
    setRecipes(res.data.recipes);
    setLoadingRecipes(false);
  };

  useEffect(() => {
    loadRecipes();
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
      <RecipeList recipes={recipes} loading={loadingRecipes} />
    </div>
  );
};

export default RecipeContainer;
