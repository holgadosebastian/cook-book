import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from '../../elements/card';
import Tag from '../../elements/tag';
import recipeCardPlaceholder from '../../../assets/recipe_card_placeholder.png';
import { parseCookingTime } from '../../../utils/recipeUtils';
import recipeShape from '../../../utils/recipeShape';

const RecipeCard = ({ loader, recipe }) => {
  const { _id, title, mainImage, cookingTime, servingSize, isPrivate } = recipe;

  return (
    <Card to={_id && `/recipe/${_id}`} loading={loader}>
      <Card.Image
        image={mainImage ? mainImage.imageUrl : recipeCardPlaceholder}
      >
        {isPrivate && (
          <Tag className='card-badge' color='danger'>
            Private
          </Tag>
        )}
      </Card.Image>
      <Card.Content className='content'>
        <p className='is-size-5 has-text-weight-lighter has-text-centered is-uppercase has-text-primary'>
          {loader ? (
            <Fragment>
              <span
                style={{
                  display: 'inline-block',
                  height: '1.25rem',
                  width: '80%'
                }}
                className='has-background-primary'
              ></span>
              <span
                style={{
                  display: 'inline-block',
                  height: '1.25rem',
                  width: '40%'
                }}
                className='has-background-primary'
              ></span>
            </Fragment>
          ) : (
            title
          )}
        </p>
        {(cookingTime || servingSize) && (
          <p className='is-size-6 has-text-grey has-text-centered'>
            {servingSize && (
              <Fragment>
                <span className='icon va-b'>
                  <i className='fas fa-utensils'></i>
                </span>{' '}
                {servingSize}
              </Fragment>
            )}
            {cookingTime && servingSize && (
              <span className='vertical-divider'></span>
            )}
            {cookingTime && (
              <Fragment>
                <span className='icon va-b'>
                  <i className='fas fa-clock'></i>
                </span>{' '}
                {parseCookingTime(cookingTime)}
              </Fragment>
            )}
          </p>
        )}
      </Card.Content>
    </Card>
  );
};

RecipeCard.defaultProps = {
  loader: false,
  recipe: {}
};

RecipeCard.propType = {
  loader: PropTypes.bool,
  recipe: recipeShape
};

export default RecipeCard;
