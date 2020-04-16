import React, { Fragment, useEffect, useContext, useState } from 'react';
import RecipeContext from '../../context/recipe/recipeContext';
import AuthContext from '../../context/auth/authContext';
import EditRecipeModal from '../recipes/EditRecipeModal';
import { parseCookingTime } from '../../utils/recipeUtils';

const Recipe = ({ match }) => {
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [editModalActive, setEditModalActive] = useState(false);

  const recipeContext = useContext(RecipeContext);
  const {
    currentRecipe,
    setCurrentRecipe,
    removeRecipe,
    loading
  } = recipeContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, loadUser } = authContext;

  useEffect(() => {
    setCurrentRecipe(match.params.id);
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onRemove = () => {
    removeRecipe(currentRecipe._id);
  };

  if (currentRecipe === null || loading) return <p>Loading...</p>;

  return (
    <div>
      <section className='hero is-medium is-primary is-bold'>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title has-text-weight-light is-uppercase has-text-centered'>
              {currentRecipe.title}
            </h1>
          </div>
        </div>
      </section>

      <div style={{ paddingTop: '24px' }} className='container is-fluid'>
        <div className='columns'>
          <div className='column is-one-third'>
            {(!!currentRecipe.servingSize || !!currentRecipe.cookingTime) && (
              <div>
                <p
                  style={{ marginBottom: '16px' }}
                  className='is-size-5 has-text-weight-light is-uppercase has-text-grey-darker'
                >
                  Info
                </p>
                {currentRecipe.servingSize && (
                  <div className='recipe-info-item'>
                    <span className='recipe-info-item__icon icon is-medium has-text-grey'>
                      <i className='fas fa-utensils'></i>
                    </span>
                    <p className='is-size-7 has-text-grey is-uppercase has-text-weight-light'>
                      Serving size
                    </p>
                    <p className='has-text-grey has-text-weight-light'>
                      {currentRecipe.servingSize} portions
                    </p>
                  </div>
                )}
                {currentRecipe.cookingTime && (
                  <div className='recipe-info-item'>
                    <span className='recipe-info-item__icon icon is-medium has-text-grey'>
                      <i className='fas fa-clock'></i>
                    </span>
                    <p className='is-size-7 has-text-grey is-uppercase has-text-weight-light'>
                      Cooking time
                    </p>
                    <p className='has-text-grey has-text-weight-light'>
                      {parseCookingTime(currentRecipe.cookingTime)}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className='content'>
              <p className='is-size-5 has-text-weight-light is-uppercase has-text-grey-darker'>
                Ingredients
              </p>
              <ul>
                {currentRecipe.ingredients &&
                  currentRecipe.ingredients.map((ingredient) => (
                    <li
                      className='has-text-grey has-text-weight-light'
                      key={ingredient.id}
                    >
                      {ingredient.name}
                    </li>
                  ))}
              </ul>
            </div>

            {isAuthenticated && user._id === currentRecipe.creatorId && (
              <div className='is-hidden-touch'>
                <p className='is-size-5 has-text-weight-light is-uppercase has-text-grey-darker'>
                  Actions
                </p>
                <div style={{ marginTop: '12px' }} className='buttons'>
                  <span
                    className='button is-info is-outlined is-rounded is-uppercase'
                    onClick={() => setEditModalActive(true)}
                  >
                    Edit Recipe
                  </span>
                  <span
                    className='button is-danger is-outlined is-rounded is-uppercase'
                    onClick={() => setDeleteModalActive(true)}
                  >
                    Delete Recipe
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className='column'>
            <p
              style={{ marginBottom: '20px' }}
              className='is-size-5 has-text-weight-light is-uppercase has-text-grey-darker'
            >
              Instructions
            </p>
            <p className='is-size-6 has-text-weight-light has-text-grey-darker'>
              {currentRecipe.instructions}
            </p>
          </div>
        </div>

        {isAuthenticated && user._id === currentRecipe.creatorId && (
          <div className='is-hidden-desktop'>
            <p className='is-size-5 has-text-weight-light is-uppercase has-text-grey-darker'>
              Actions
            </p>
            <div style={{ marginTop: '12px' }}>
              <span
                className='button is-info is-fullwidth is-outlined is-rounded'
                onClick={() => setEditModalActive(true)}
              >
                Edit Recipe
              </span>
            </div>
            <div style={{ marginTop: '12px' }}>
              <span
                className='button is-danger is-fullwidth  is-outlined is-rounded'
                onClick={() => setDeleteModalActive(true)}
              >
                Delete Recipe
              </span>
            </div>
          </div>
        )}
      </div>

      <div className={`modal ${deleteModalActive && 'is-active'}`}>
        <div
          className='modal-background'
          onClick={() => setDeleteModalActive(false)}
        ></div>
        <div className='modal-content'>
          <div className='box'>
            <p className='is-size-5 has-text-weight-light has-text-grey-darker has-text-centered'>
              Are you sure you want to delete this recipe?
            </p>
            <span
              style={{ marginTop: '24px' }}
              className='button is-danger is-fullwidth is-outlined is-rounded is-uppercase'
              onClick={onRemove}
            >
              Delete
            </span>

            <span
              style={{ marginTop: '16px' }}
              className='button is-text is-outlined is-fullwidth is-outlined is-rounded'
              onClick={() => setDeleteModalActive(false)}
            >
              Cancel
            </span>
          </div>
        </div>
        <button
          className='modal-close is-large'
          onClick={() => setDeleteModalActive(false)}
          aria-label='close'
        ></button>
      </div>

      <EditRecipeModal
        modalActive={editModalActive}
        recipe={currentRecipe}
        setModalActive={setEditModalActive}
      />
    </div>
  );
};

export default Recipe;
