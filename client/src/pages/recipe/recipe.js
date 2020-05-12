import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Interweave from 'interweave';
import NotFound from '../notFound';
import Hero from '../../components/elements/hero/hero';
import Columns from '../../components/elements/columns';
import Button from '../../components/elements/button';
import Tag from '../../components/elements/tag';
import Spinner from '../../components/elements/spinner';
import EditRecipeModal from '../../components/recipes/editRecipeModal';
import DeleteRecipeModal from '../../components/recipes/deleteRecipeModal';
import { parseCookingTime } from '../../utils/recipeUtils';
import { getUserName, isLoggedInUser } from '../../utils/userUtils';
import RecipeContext from '../../context/recipe/recipeContext';
import AuthContext from '../../context/auth/authContext';
import UiContext from '../../context/ui/uiContext';
import recipeCardPlaceholder from '../../assets/recipe_card_placeholder.png';

const Recipe = ({ match, history }) => {
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
  const { user, loadUser } = authContext;

  const uiContext = useContext(UiContext);
  const { showNotification } = uiContext;

  useEffect(() => {
    setCurrentRecipe(match.params.id);
    loadUser();
    // eslint-disable-next-line
  }, []);

  // Deletes recipe and redirects to user page
  const onDelete = async () => {
    await removeRecipe(currentRecipe._id);
    history.push(`/users/${user._id}`);

    let message = <p>Recipe deleted!</p>;
    showNotification(message, 3000, 'danger');
  };

  if (loading)
    return (
      <Spinner.Container message='Loading recipe'>
        <Spinner size='medium' />
      </Spinner.Container>
    );

  if (currentRecipe === null) return <NotFound />;

  let recipeImage = currentRecipe.mainImage
    ? currentRecipe.mainImage.imageUrl
    : recipeCardPlaceholder;

  return (
    <Fragment>
      <Hero color='light'>
        <div className='hero-container with-image'>
          <Hero.Image imageUrl={recipeImage} />
          <div>
            {currentRecipe.isPrivate && (
              <p>
                <Tag color='danger'>Private</Tag>
              </p>
            )}
            <h1 className='is-size-3 is-uppercase has-text-weight-light has-text-grey-darker'>
              {currentRecipe.title}
            </h1>
            <p>
              by{' '}
              <Link
                to={`/users/${currentRecipe.author.username}`}
                className='has-text-primary'
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
      </Hero>

      <div style={{ paddingBottom: '48px' }} className='container is-fluid'>
        <hr />
        <Columns>
          <Columns.Column size={4}>
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

            {isLoggedInUser(user, currentRecipe.author._id) && (
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
          </Columns.Column>

          <Columns.Column>
            <p
              style={{ marginBottom: '20px' }}
              className='is-size-5 has-text-weight-light is-uppercase has-text-grey-darker'
            >
              Instructions
            </p>
            <p className='is-size-6 has-text-weight-light has-text-grey-darker'>
              <Interweave content={currentRecipe.instructions} />
            </p>
          </Columns.Column>
        </Columns>

        {isLoggedInUser(user, currentRecipe.author._id) && (
          <Fragment>
            <div className='is-hidden-desktop'>
              <p className='is-size-5 has-text-weight-light is-uppercase has-text-grey-darker'>
                Actions
              </p>
              <div style={{ marginTop: '12px' }}>
                <Button
                  color='info'
                  outlined
                  onClick={() => setEditModalActive(true)}
                >
                  Edit Recipe
                </Button>
              </div>
              <div style={{ marginTop: '12px' }}>
                <Button
                  color='danger'
                  outlined
                  onClick={() => setDeleteModalActive(true)}
                >
                  Delete Recipe
                </Button>
              </div>
            </div>
          </Fragment>
        )}
      </div>

      <DeleteRecipeModal
        modalActive={deleteModalActive}
        onClose={() => setDeleteModalActive(false)}
        onDelete={onDelete}
      />

      <EditRecipeModal
        recipe={currentRecipe}
        modalActive={editModalActive}
        onClose={() => setEditModalActive(false)}
      />
    </Fragment>
  );
};

export default Recipe;
