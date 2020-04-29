import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import FormField from '../form/FormField';
import FormAddons from '../form/FormAddons';
import FileUpload from '../form/FileUpload';
import Radio from '../form/Radio';
import Label from '../form/Label';
import Button from '../elements/Button';
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
  const [formErrors, setFormErrors] = useState({
    title: null,
    ingredients: null,
    instructions: null
  });

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
    setFormErrors({ ...formErrors, ingredients: null });
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

  const validate = (type, value) => {
    let errors = {};

    switch (type) {
      case 'title':
        if (value === '') {
          errors[type] = 'Title is required';
        } else {
          errors[type] = null;
        }
        break;
      case 'ingredients':
        if (value.length === 0) {
          errors[type] = 'At least 1 ingredient is required';
        } else {
          errors[type] = null;
        }
        break;
      case 'instructions':
        if (value === '') {
          errors[type] = 'Basic instructions are required';
        } else {
          errors[type] = null;
        }
        break;
      default:
        return errors;
    }

    return errors;
  };

  const onValidateInput = (type, value) => {
    let error = validate(type, value);

    setFormErrors({
      ...formErrors,
      ...error
    });
  };

  const onSubmit = async () => {
    let hasErrors = false;
    let errors = {
      ...validate('title', title),
      ...validate('ingredients', ingredients),
      ...validate('instructions', instructions)
    };

    // eslint-disable-next-line
    Object.values(errors).map((error) => {
      if (error !== null) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setFormErrors(errors);
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
            onBlur={(e) => onValidateInput('title', e.target.value)}
            error={formErrors.title !== null}
            errorMessage={formErrors.title}
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

      <FormAddons
        id='ingredients'
        placeholder='Onions, garlic...'
        value={newIngredient}
        onChange={setNewIngredient}
        onKeyDown={(e) => e.keyCode === 13 && addIngredient()}
        onBlur={(e) => onValidateInput('ingredients', ingredients)}
        error={formErrors.ingredients !== null}
        errorMessage={formErrors.ingredients}
        buttonText='Add'
        buttonColor='info'
        onClick={addIngredient}
      />

      <FormField
        id='instructions'
        name='Instructions'
        placeholder='From start to finish'
        value={instructions}
        onChange={setInstructions}
        onBlur={(e) => onValidateInput('instructions', e.target.value)}
        error={formErrors.instructions !== null}
        errorMessage={formErrors.instructions}
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

RecipeForm.defaultProps = {
  formTitle: 'Create New Recipe',
  recipe: null,
  loading: false
};

RecipeForm.propTypes = {
  formTitle: PropTypes.string,
  recipe: PropTypes.object,
  submitButtonText: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default RecipeForm;
