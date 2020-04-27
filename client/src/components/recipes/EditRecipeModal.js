import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeForm from './RecipeForm';
import RecipeContext from '../../context/recipe/recipeContext';

const EditRecipeModal = ({ recipe, modalActive, setModalActive }) => {
  const recipeContext = useContext(RecipeContext);
  const { updateRecipe, loading } = recipeContext;

  const onRecipeUpdate = async (newRecipe) => {
    await updateRecipe(newRecipe);

    setModalActive(false);
  };

  return (
    <div className={`modal ${modalActive && 'is-active'}`}>
      <div
        className='modal-background'
        onClick={() => setModalActive(false)}
      ></div>
      <div className='modal-content'>
        <div className='box'>
          <RecipeForm
            recipe={recipe}
            title='Edit Recipe'
            submitButtonText='Update'
            onFormSubmit={onRecipeUpdate}
            loading={loading}
          />

          <span
            style={{ marginTop: '12px' }}
            className='button is-text is-fullwidth is-rounded is-uppercase'
            onClick={() => setModalActive(false)}
          >
            Cancel
          </span>
        </div>
        <button
          className='modal-close is-large'
          onClick={() => setModalActive(false)}
          aria-label='close'
        ></button>
      </div>
    </div>
  );
};

EditRecipeModal.propTypes = {
  recipe: PropTypes.object.isRequired,
  modalActive: PropTypes.bool.isRequired,
  setModalActive: PropTypes.func.isRequired
};

export default EditRecipeModal;
