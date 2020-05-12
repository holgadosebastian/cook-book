import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Columns from '../../elements/columns';
import RecipeCard from '../recipeCard';
import noRecipesImage from '../../../assets/no_recipes.png';

const RecipeList = ({ loading, recipes, noRecipesMessage }) => {
  return (
    <Fragment>
      {loading ? (
        <Columns multiline>
          <Columns.Column style={{ marginTop: '24px' }} size={4}>
            <RecipeCard loader />
          </Columns.Column>
          <Columns.Column style={{ marginTop: '24px' }} size={4}>
            <RecipeCard loader />
          </Columns.Column>
          <Columns.Column style={{ marginTop: '24px' }} size={4}>
            <RecipeCard loader />
          </Columns.Column>
        </Columns>
      ) : !!recipes.length ? (
        <Columns multiline>
          {recipes.map((recipe) => (
            <Columns.Column
              style={{ marginTop: '24px' }}
              key={recipe._id}
              size={4}
            >
              <RecipeCard recipe={recipe} />
            </Columns.Column>
          ))}
        </Columns>
      ) : (
        <div style={{ marginTop: '24px' }} className='has-text-centered'>
          <span className='square-image'>
            <img src={noRecipesImage} alt='No Recipes' />
          </span>

          <p className='is-size-6 has-text-grey'>{noRecipesMessage}</p>
        </div>
      )}
    </Fragment>
  );
};

RecipeList.defaultProps = {
  loading: false,
  noRecipesMessage: 'No recipes found'
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  noRecipesMessage: PropTypes.string
};

export default RecipeList;
