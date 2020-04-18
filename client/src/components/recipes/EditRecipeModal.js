import React, { useEffect, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import RecipeContext from '../../context/recipe/recipeContext';

const EditRecipeModal = ({ recipe, modalActive, setModalActive }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [formError, setFormError] = useState('');

  const recipeContext = useContext(RecipeContext);
  const { updateRecipe } = recipeContext;

  useEffect(() => {
    setTitle(recipe.title);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setCookingTime(recipe.cookingTime);
    setServingSize(recipe.servingSize);
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

    // TODO: Close modal after recipe has been updated
    setModalActive(false);
  };

  return (
    <div className={`modal ${modalActive && 'is-active'}`}>
      <div className='modal-background'></div>
      <div className='modal-content'>
        <div className='box'>
          <div className='field'>
            <label
              className='label is-uppercase has-text-weight-light has-text-grey-darker'
              htmlFor='title'
            >
              Title <span className='has-text-danger'>*</span>
            </label>
            <div className='control'>
              <input
                id='title'
                className='input'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <label
            className='label is-uppercase has-text-weight-light has-text-grey-darker'
            htmlFor='ingredients'
          >
            Ingredients <span className='has-text-danger'>*</span>
          </label>
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

          <div className='field has-addons'>
            <div className='control is-expanded'>
              <input
                id='ingredients'
                className='input'
                type='text'
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyDown={(e) => e.keyCode === 13 && addIngredient()}
              />
            </div>
            <div className='control'>
              <span
                className='button is-info is-uppercase'
                onClick={addIngredient}
              >
                Add
              </span>
            </div>
          </div>

          <div className='columns is-mobile'>
            <div style={{ paddingBottom: 0 }} className='column'>
              <div className='field'>
                <label
                  className='label is-uppercase has-text-weight-light has-text-grey-darker'
                  htmlFor='servingsize'
                >
                  Serving Size
                </label>
                <div className='control'>
                  <input
                    id='servingsize'
                    className='input'
                    type='number'
                    value={servingSize}
                    onChange={(e) => setServingSize(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div style={{ paddingBottom: 0 }} className='column'>
              <div className='field'>
                <label
                  className='label is-uppercase has-text-weight-light has-text-grey-darker'
                  htmlFor='cookingtime'
                >
                  Cooking Time
                </label>
                <div className='control'>
                  <input
                    id='cookingtime'
                    className='input'
                    type='number'
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='field'>
            <label
              className='label is-uppercase has-text-weight-light has-text-grey-darker'
              htmlFor='instructions'
            >
              Instructions <span className='has-text-danger'>*</span>
            </label>
            <div className='control'>
              <textarea
                id='instructions'
                className='textarea'
                onChange={(e) => setInstructions(e.target.value)}
                value={instructions}
              ></textarea>
            </div>
          </div>

          {formError !== '' && <div>All fields are mandatory</div>}

          <span
            style={{ marginTop: '24px' }}
            className='button is-primary is-fullwidth is-rounded is-uppercase'
            onClick={onSubmit}
          >
            Update
          </span>

          <span
            style={{ marginTop: '12px' }}
            className='button is-text is-fullwidth is-rounded is-uppercase'
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
