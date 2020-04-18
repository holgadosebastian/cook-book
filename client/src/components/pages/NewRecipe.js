import React, { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { parseInstructionsToHtml } from '../../utils/recipeUtils';
import RecipeContext from '../../context/recipe/recipeContext';

const NewRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [formErrors, setFormErrors] = useState([]);

  const recipeContext = useContext(RecipeContext);
  const { addRecipe, loading } = recipeContext;

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
    console.log(parseInstructionsToHtml(instructions));

    setFormErrors([]);
    let newFormErrors = [];

    if (title === '') {
      newFormErrors.push({
        msg: 'Recipe title is required'
      });
    }

    if (!ingredients.length) {
      newFormErrors.push({
        msg: 'At least one ingredient is required'
      });
    }

    if (instructions === '') {
      newFormErrors.push({
        msg: 'Basic instructions are required'
      });
    }

    if (!!newFormErrors.length) {
      setFormErrors(newFormErrors);
      return false;
    }

    const recipe = {
      title,
      ingredients,
      instructions: parseInstructionsToHtml(instructions),
      servingSize: parseInt(servingSize),
      cookingTime: parseInt(cookingTime)
    };

    addRecipe(recipe);

    // TODO: Redirect to recipe after creation
    setTitle('');
    setIngredients([]);
    setNewIngredient('');
    setInstructions('');
    setCookingTime('');
    setServingSize('');
  };

  return (
    <div
      style={{ paddingTop: '24px', paddingBottom: '48px' }}
      className='container is-fluid'
    >
      <div className='box'>
        <p
          className='is-size-4 has-text-centered has-text-weight-light is-uppercase has-text-grey-light'
          style={{ marginBottom: '24px' }}
        >
          Create New Recipe
        </p>
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

        {!!formErrors.length && (
          <article className='message is-danger'>
            <div className='message-body'>
              <ul>
                {formErrors.map((error) => (
                  // TODO: Add key
                  <li className='is-size-7'>{error.msg}</li>
                ))}
              </ul>
            </div>
          </article>
        )}

        <span
          style={{ marginTop: '24px' }}
          className={`button is-primary is-uppercase is-fullwidth is-rounded ${
            loading && 'is-loading'
          }`}
          onClick={onSubmit}
        >
          Create
        </span>
      </div>
    </div>
  );
};

export default NewRecipe;
