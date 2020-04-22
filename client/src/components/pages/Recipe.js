import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Interweave from 'interweave';
import Button from '../elements/Button';
import Spinner from '../common/Spinner';
import RecipeContext from '../../context/recipe/recipeContext';
import AuthContext from '../../context/auth/authContext';
import EditRecipeModal from '../recipes/EditRecipeModal';
import DeleteRecipeModal from '../recipes/DeleteRecipeModal';
import { parseCookingTime } from '../../utils/recipeUtils';
import { getUserName } from '../../utils/userUtils';

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

  const onDelete = () => {
    removeRecipe(currentRecipe._id);
  };

  if (loading)
    return (
      <div className='container has-text-centered'>
        <Spinner />
        <p>Loading recipe</p>
      </div>
    );

  if (currentRecipe === null) return <p>No recipe found</p>;

  let heroStyles = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  if (currentRecipe.mainImage)
    heroStyles.backgroundImage = `url(/${currentRecipe.mainImage.imageData})`;

  return (
    <div>
      <section className='hero is-medium is-primary is-bold' style={heroStyles}>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title is-spaced has-text-weight-light is-uppercase has-text-centered'>
              {currentRecipe.title}
            </h1>
            <p className='subtitle has-text-centered has-text-weight-light'>
              by{' '}
              <Link
                to={`/users/${currentRecipe.author._id}`}
                className='has-text-white'
                style={{ textDecoration: 'underline' }}
              >
                {getUserName(
                  currentRecipe.author.firstName,
                  currentRecipe.author.lastName,
                  currentRecipe.author.username
                )}
              </Link>
            </p>
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

            {isAuthenticated && user._id === currentRecipe.author._id && (
              <div className='is-hidden-touch'>
                <p className='is-size-5 has-text-weight-light is-uppercase has-text-grey-darker'>
                  Actions
                </p>
                <div style={{ marginTop: '12px' }} className='buttons'>
                  <Button
                    color='info'
                    outlined
                    onClick={() => setEditModalActive(true)}
                  >
                    Edit Recipe
                  </Button>
                  <Button
                    color='danger'
                    outlined
                    onClick={() => setDeleteModalActive(true)}
                  >
                    Delete Recipe
                  </Button>
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
              <Interweave content={currentRecipe.instructions} />
            </p>
          </div>
        </div>

        {isAuthenticated && user._id === currentRecipe.author._id && (
          <Fragment>
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

            <DeleteRecipeModal
              modalActive={deleteModalActive}
              setModalActive={setDeleteModalActive}
              onDelete={onDelete}
            />

            <EditRecipeModal
              modalActive={editModalActive}
              recipe={currentRecipe}
              setModalActive={setEditModalActive}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Recipe;
