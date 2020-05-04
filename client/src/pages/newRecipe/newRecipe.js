import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeForm from '../../components/recipes/recipeForm';
import RecipeContext from '../../context/recipe/recipeContext';
import UiContext from '../../context/ui/uiContext';

const NewRecipe = (props) => {
  const recipeContext = useContext(RecipeContext);
  const { createRecipe, loading } = recipeContext;

  const uiContext = useContext(UiContext);
  const { showNotification } = uiContext;

  // Creates recipe and shows link to it
  const onRecipeCreation = async (recipe) => {
    let newRecipe = await createRecipe(recipe);

    let message = (
      <p>
        Recipe Created! <Link to={`/recipe/${newRecipe._id}`}>View</Link>
      </p>
    );
    showNotification(message, 3000);
  };

  return (
    <div
      style={{ paddingTop: '24px', paddingBottom: '48px' }}
      className='container is-fluid'
    >
      <div className='box'>
        <RecipeForm
          formTitle='Create New Recipe'
          submitButtonText='Create'
          onFormSubmit={onRecipeCreation}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default NewRecipe;
