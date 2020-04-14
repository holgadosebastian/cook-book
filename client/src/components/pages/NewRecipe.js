import React, { Fragment, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import RecipeContext from '../../context/recipe/recipeContext';

const NewRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [formError, setFormError] = useState('');

  const recipeContext = useContext(RecipeContext);
  const { addRecipe } = recipeContext;

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

    if (
      title === '' ||
      !ingredients.length ||
      instructions === '' ||
      cookingTime === '' ||
      servingSize === ''
    ) {
      setFormError('Some fields are empty');
      return false;
    }

    const recipe = {
      title,
      ingredients,
      instructions,
      servingSize: parseInt(servingSize),
      cookingTime: parseInt(cookingTime)
    };

    addRecipe(recipe);

    setTitle('');
    setIngredients([]);
    setNewIngredient('');
    setInstructions('');
  };

  return (
    <Fragment>
      <div className='container is-fluid'>
        <p className='is-size-4'>Create New Recipe</p>
      </div>
      <div className='container is-fluid'>
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
            <span className='button is-info is-rounded' onClick={addIngredient}>
              Add
            </span>
          </p>
        </div>

        <div className='columns is-mobile'>
          <div className='column'>
            <div className='field'>
              <label className='label'>Serving Size</label>
              <div className='control'>
                <input
                  className='input'
                  type='number'
                  value={servingSize}
                  onChange={(e) => setServingSize(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='column'>
            <div className='field'>
              <label className='label'>Cooking Time (min)</label>
              <div className='control'>
                <input
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
          <label className='label'>Instructions</label>
          <div className='control'>
            <textarea
              className='textarea'
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
          Create
        </span>
      </div>
    </Fragment>
  );
};

export default NewRecipe;
