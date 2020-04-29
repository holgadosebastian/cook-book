import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import FormField from '../form/FormField';
import FileUpload from '../form/FileUpload';
import Radio from '../form/Radio';
import Label from '../form/Label';
import Button from '../elements/Button';
import Message from '../common/Message';
import {
  parseInstructionsFromHtml,
  parseInstructionsToHtml
} from '../../utils/recipeUtils';
import { uploadImage } from '../../utils/firebaseUtils';

const RecipeForm = ({
  formTitle,
  recipe,
  submitButtonText,
  onFormSubmit,
  loading
}) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    if (!!recipe) {
      setTitle(recipe.title);
      setIngredients(recipe.ingredients);
      setInstructions(parseInstructionsFromHtml(recipe.instructions));
      !!recipe.cookingTime && setCookingTime(recipe.cookingTime);
      !!recipe.servingSize && setServingSize(recipe.servingSize);
      setIsPrivate(recipe.isPrivate);
    }
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
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const onFileUpload = (e) => {
    setImageUploading(true);

    uploadImage(e.target.files[0], 'recipes', (url, id) => {
      setImageUrl(url);
      setImage(id);
      setImageUploading(false);
    });
  };

  const onSubmit = async () => {
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

    const newRecipe = {
      mainImage: image,
      title,
      ingredients,
      instructions: parseInstructionsToHtml(instructions),
      isPrivate
    };

    if (!!servingSize) {
      newRecipe.servingSize = parseInt(servingSize);
    }

    if (!!servingSize) {
      newRecipe.cookingTime = parseInt(cookingTime);
    }

    // If the recipe already exists add the id
    if (recipe) {
      newRecipe.id = recipe._id;
    }

    onFormSubmit(newRecipe);
  };

  return (
    <Fragment>
      <p
        className='is-size-4 has-text-centered has-text-weight-light is-uppercase has-text-grey-light'
        style={{ marginBottom: '24px' }}
      >
        {formTitle}
      </p>

      <div className='columns'>
        <div className='column is-one-quarter'>
          <FileUpload
            name='Image'
            onChange={onFileUpload}
            uploadedImage={imageUrl}
            loading={imageUploading}
          />
        </div>
        <div className='column is-three-quarters'>
          <FormField
            id='title'
            name='Title'
            placeholder='Something creative'
            value={title}
            onChange={setTitle}
            required
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
            style={{ marginBottom: '12px' }}
          >
            <div className='tags has-addons'>
              <span className='tag'>{ingredient.name}</span>
              <span
                className='tag is-delete'
                onClick={() => removeIngredient(ingredient.id)}
              ></span>
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
            placeholder='Onions, garlic...'
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyDown={(e) =>
              (e.keyCode === 13 || e.keyCode === 188) && addIngredient()
            }
          />
        </div>
        <div className='control'>
          <span className='button is-info is-uppercase' onClick={addIngredient}>
            Add
          </span>
        </div>
      </div>

      <FormField
        id='instructions'
        name='Instructions'
        placeholder='From start to finish'
        value={instructions}
        onChange={setInstructions}
        type='textarea'
        required
      />

      <div className='columns is-mobile'>
        <div style={{ paddingBottom: 0 }} className='column'>
          <FormField
            id='servingsize'
            name='Serving Size'
            placeholder='Portions'
            value={servingSize}
            onChange={setServingSize}
            type='number'
            min='1'
          />
        </div>
        <div style={{ paddingBottom: 0 }} className='column'>
          <FormField
            id='cookingtime'
            name='Cooking Time'
            placeholder='In minutes'
            value={cookingTime}
            onChange={setCookingTime}
            type='number'
            min='1'
          />
        </div>
      </div>

      <div className='control'>
        <Label name='Recipe Availability' />
        <Radio
          label='Private'
          value='true'
          checked={isPrivate}
          onChange={setIsPrivate}
        />
        <Radio
          label='Public'
          value='false'
          checked={!isPrivate}
          onChange={setIsPrivate}
        />
      </div>

      <Message messageList={formErrors} />

      <Button
        style={{ marginTop: '24px' }}
        cssClasses='is-fullwidth'
        loading={loading}
        onClick={onSubmit}
      >
        {submitButtonText}
      </Button>
    </Fragment>
  );
};

RecipeForm.propTypes = {
  formTitle: PropTypes.string,
  recipe: PropTypes.object,
  submitButtonText: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func,
  loading: PropTypes.bool
};

export default RecipeForm;
