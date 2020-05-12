import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { FormField, FormAddons, FileUpload, Radio, Label } from '../../form';
import Columns from '../../elements/columns';
import Button from '../../elements/button';
import validate from '../../../utils/validate';
import recipeShape from '../../../utils/recipeShape';
import {
  parseInstructionsFromHtml,
  parseInstructionsToHtml
} from '../../../utils/recipeUtils';
import { uploadImage } from '../../../utils/firebaseUtils';

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

  const onValidateInput = (type, value) => {
    let error = {};

    error[type] = validate(type, value);

    setFormErrors({
      ...formErrors,
      ...error
    });
  };

  const onSubmit = async () => {
    let hasErrors = false;
    let errors = {
      title: validate('title', title),
      ingredients: validate('ingredients', ingredients),
      instructions: validate('instructions', instructions)
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

    let newRecipe = {
      mainImage: image,
      title,
      ingredients,
      instructions: parseInstructionsToHtml(instructions),
      // Serving size and cooking time should be null
      servingSize: servingSize === '' ? null : servingSize,
      cookingTime: cookingTime === '' ? null : cookingTime,
      isPrivate
    };

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

      <Columns>
        <Columns.Column size={3}>
          <FileUpload
            name='Image'
            onChange={onFileUpload}
            uploadedImage={imageUrl}
            loading={imageUploading}
          />
        </Columns.Column>
        <Columns.Column size={9}>
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
        </Columns.Column>
      </Columns>

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

      <Columns breakpoint='mobile'>
        <Columns.Column style={{ paddingBottom: 0 }}>
          <FormField
            id='servingsize'
            name='Serving Size'
            placeholder='Portions'
            value={servingSize}
            onChange={setServingSize}
            type='number'
            min='1'
          />
        </Columns.Column>
        <Columns.Column style={{ paddingBottom: 0 }}>
          <FormField
            id='cookingtime'
            name='Cooking Time'
            placeholder='In minutes'
            value={cookingTime}
            onChange={setCookingTime}
            type='number'
            min='1'
          />
        </Columns.Column>
      </Columns>

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
        loading={loading}
        onClick={onSubmit}
        fullwidth
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
  recipe: recipeShape,
  submitButtonText: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default RecipeForm;
