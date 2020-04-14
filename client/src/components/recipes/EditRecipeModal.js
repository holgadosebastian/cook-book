import React, { useEffect, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import RecipeContext from '../../context/recipe/recipeContext';

const EditRecipeModal = ({ recipe, modalActive, setModalActive }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [formError, setFormError] = useState('');

  const recipeContext = useContext(RecipeContext);
  const { updateRecipe } = recipeContext;

  useEffect(() => {
    setTitle(recipe.title);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
  }, [recipe]);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        name: newIngredient,
        id: uuid()
      }
    ]);

    setNewIngredient('');
  };

  const removeIngredient = (id) => {
    setIngredients(
      ingredients.filter((ingredient) => {
        return ingredient.id !== id;
      })
    );
  };

  const onSubmit = () => {
    setFormError('');

    if (title === '' || !ingredients.length || instructions === '') {
      setFormError('Some fields are empty');
      return false;
    }

    const updatedRecipe = {
      id: recipe._id,
      title: title,
      ingredients: ingredients,
      instructions: instructions
    };

    updateRecipe(updatedRecipe);
    setModalActive(false);
  };

  return (
    <div className={`modal ${modalActive && 'is-active'}`}>
      <div className='modal-background'></div>
      <div className='modal-content'>
        <div className='box'>
          <div className='field'>
            <label className='label'>Title</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <label className='label'>Ingredients</label>
          <div>
            {ingredients.map((ingredient) => (
              <div
                className='control'
                key={ingredient.id}
                onClick={() => removeIngredient(ingredient.id)}
                style={{ marginBottom: '12px' }}
              >
                <div className='tags has-addons'>
                  <span className='tag'>{ingredient.name}</span>
                  <span className='tag is-delete'></span>
                </div>
              </div>
            ))}
          </div>

          <div className='field is-grouped'>
            <p className='control is-expanded'>
              <input
                className='input'
                type='text'
                placeholder='Ingredient'
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyDown={(e) => e.keyCode === 13 && addIngredient()}
              />
            </p>
            <p className='control'>
              <span
                className='button is-info is-rounded'
                onClick={addIngredient}
              >
                Add
              </span>
            </p>
          </div>

          <div className='field'>
            <label className='label'>Instructions</label>
            <div className='control'>
              <textarea
                className='textarea'
                placeholder='Textarea'
                onChange={(e) => setInstructions(e.target.value)}
                value={instructions}
              ></textarea>
            </div>
          </div>

          {formError !== '' && <div>All fields are mandatory</div>}

          <span
            className='button is-primary is-fullwidth is-rounded'
            onClick={onSubmit}
          >
            Update
          </span>

          <span
            style={{ marginTop: '12px' }}
            className='button is-outlined is-fullwidth is-rounded'
            onClick={onSubmit}
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

export default EditRecipeModal;
