import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';
import Button from '../elements/button';
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
    <Modal modalActive={modalActive} setModalActive={setModalActive}>
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
        onClick={() => setModalActive(false)}
      >
        Cancel
      </Button>
    </Modal>
  );
};

EditRecipeModal.propTypes = {
  recipe: PropTypes.object.isRequired,
  modalActive: PropTypes.bool.isRequired,
  setModalActive: PropTypes.func.isRequired
};

export default EditRecipeModal;
