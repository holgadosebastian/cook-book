import React, { useContext } from 'react';
import RecipeForm from '../../components/recipes/recipeForm';
import RecipeContext from '../../context/recipe/recipeContext';

const NewRecipe = (props) => {
  const recipeContext = useContext(RecipeContext);
  const { createRecipe, loading } = recipeContext;

  // Creates recipe and redirects to it
  const onRecipeCreation = async (recipe) => {
    let newRecipe = await createRecipe(recipe);

    props.history.push(`/recipe/${newRecipe._id}`);
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
