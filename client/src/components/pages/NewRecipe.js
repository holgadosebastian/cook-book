import React, { useContext, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { storage } from '../../config/firebase-config';
import FormField from '../form/FormField';
import FileUpload from '../form/FileUpload';
import Button from '../elements/Button';
import Message from '../common/Message';
import { parseInstructionsToHtml } from '../../utils/recipeUtils';
import RecipeContext from '../../context/recipe/recipeContext';

const NewRecipe = (props) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [formErrors, setFormErrors] = useState([]);

  const recipeContext = useContext(RecipeContext);
  const { createRecipe, loading } = recipeContext;

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

  const onFileUpload = async (e) => {
    let currentImageName = 'firebase-image-' + Date.now();

    const config = {
      headers: {
        'Context-Type': 'application/json'
      }
    };

    try {
      let uploadImage = storage
        .ref(`images/${currentImageName}`)
        .put(e.target.files[0]);

      uploadImage.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.error(error);
        },
        () => {
          storage
            .ref('images')
            .child(currentImageName)
            .getDownloadURL()
            .then(async (url) => {
              setImageUrl(url);

              // store image object in the database
              let imageObj = {
                imageName: currentImageName,
                imageUrl: url
              };

              let res = await axios.post('/api/image', imageObj, config);
              setImage(res.data.image._id);
            });
        }
      );
    } catch (error) {
      console.log(error);
    }
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

    const recipe = {
      title,
      ingredients,
      instructions: parseInstructionsToHtml(instructions),
      servingSize: parseInt(servingSize),
      cookingTime: parseInt(cookingTime),
      mainImage: image
    };

    let newRecipe = await createRecipe(recipe);

    // Redirects to the newly created recipe
    if (newRecipe) {
      props.history.push(`/recipe/${newRecipe._id}`);
    }
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

        <div className='columns'>
          <div className='column is-one-quarter'>
            <FileUpload
              name='Recipe Image'
              onChange={onFileUpload}
              uploadedImage={imageUrl}
            />
          </div>
          <div className='column is-three-quarters'>
            <FormField
              id='title'
              name='Title'
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
            <FormField
              id='servingsize'
              name='Serving Size'
              value={servingSize}
              onChange={setServingSize}
              type='number'
            />
          </div>
          <div style={{ paddingBottom: 0 }} className='column'>
            <FormField
              id='cookingtime'
              name='Cooking Time'
              value={cookingTime}
              onChange={setCookingTime}
              type='number'
            />
          </div>
        </div>

        <FormField
          id='instructions'
          name='Instructions'
          value={instructions}
          onChange={setInstructions}
          type='textarea'
          required
        />

        <Message messageList={formErrors} />

        <Button
          style={{ marginTop: '24px' }}
          cssClasses='is-fullwidth'
          loading={loading}
          onClick={onSubmit}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default NewRecipe;
