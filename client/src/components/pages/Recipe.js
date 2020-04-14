import React, { Fragment, useEffect, useContext, useState } from 'react';
import RecipeContext from '../../context/recipe/recipeContext';
import AuthContext from '../../context/auth/authContext';
import EditRecipeModal from '../recipes/EditRecipeModal';

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
  const { isAuthenticated, user } = authContext;

  useEffect(() => {
    setCurrentRecipe(match.params.id);
    // eslint-disable-next-line
  }, []);

  const onRemove = () => {
    removeRecipe(currentRecipe._id);
  };

  if (currentRecipe === null || loading) return <p>Loading...</p>;

  return (
    <Fragment>
      <section className='hero is-medium is-primary is-bold'>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title'>{currentRecipe.title}</h1>
          </div>
        </div>

        <div className='hero-foot'>
          <nav className='tabs'>
            <div className='container'>
              <ul>
                {currentRecipe.yield && (
                  <li>
                    <a href='#'>{currentRecipe.yield} servings</a>
                  </li>
                )}
                {currentRecipe.totalTime && (
                  <li>
                    <a href='#'>{currentRecipe.totalTime} minutes</a>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </section>
      <div className='container is-fluid'>
        <div>
          <p className='is-size-5'>Ingredients:</p>
          <ul>
            {currentRecipe.ingredients &&
              currentRecipe.ingredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))}
          </ul>
        </div>
        <div>
          <p className='is-size-5'>Instructions:</p>
          <p>{currentRecipe.instructions}</p>
        </div>

        {isAuthenticated && user._id === currentRecipe.creatorId && (
          <Fragment>
            <div
              style={{ marginTop: '12px' }}
              onClick={() => setEditModalActive(true)}
            >
              <span className='button is-info is-fullwidth is-rounded'>
                Edit
              </span>
            </div>
            <div style={{ marginTop: '12px' }}>
              <span
                className='button is-danger is-fullwidth is-rounded'
                onClick={() => setDeleteModalActive(true)}
              >
                Delete
              </span>
            </div>
          </Fragment>
        )}
      </div>

      <div className={`modal ${deleteModalActive && 'is-active'}`}>
        <div className='modal-background'></div>
        <div className='modal-content'>
          <div className='box'>
            <p>Are you sure you want to delete this recipe?</p>
            <span
              className='button is-danger is-fullwidth is-rounded'
              onClick={onRemove}
            >
              Delete
            </span>

            <span
              className='button is-outlined is-fullwidth is-rounded'
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
    </Fragment>
  );
};

export default Recipe;
