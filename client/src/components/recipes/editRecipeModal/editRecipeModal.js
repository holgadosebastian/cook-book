import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../elements/modal';
import Button from '../../elements/button';
import RecipeForm from '../recipeForm';
import RecipeContext from '../../../context/recipe/recipeContext';
import UiContext from '../../../context/ui/uiContext';

const EditRecipeModal = ({ recipe, modalActive, onClose }) => {
  const recipeContext = useContext(RecipeContext);
  const { updateRecipe, loading } = recipeContext;

  const uiContext = useContext(UiContext);
  const { showNotification } = uiContext;

  const onRecipeUpdate = async (newRecipe) => {
    await updateRecipe(newRecipe);

    let message = <p>Recipe updated!</p>;
    showNotification(message, 3000);

    onClose();
  };

  return (
    <Modal show={modalActive} onClose={onClose}>
      <RecipeForm
        recipe={recipe}
        title='Edit Recipe'
        submitButtonText='Update'
        onFormSubmit={onRecipeUpdate}
        loading={loading}
      />

      <Button
        style={{ marginTop: '16px' }}
        color='text'
        outlined
        fullwidth
        onClick={onClose}
      >
        Cancel
      </Button>
    </Modal>
  );
};

EditRecipeModal.propTypes = {
  recipe: PropTypes.object.isRequired,
  modalActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default EditRecipeModal;
