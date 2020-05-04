import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../../elements/card';
import Tag from '../../elements/tag';
import recipeCardPlaceholder from '../../../assets/recipe_card_placeholder.png';
import { parseCookingTime } from '../../../utils/recipeUtils';
import recipeShape from '../../../utils/recipeShape';

const RecipeCard = ({ loader, recipe }) => {
  const LinkElem = loader ? 'div' : Link;

  const { _id, title, mainImage, cookingTime, servingSize, isPrivate } = recipe;

  let cardImageStyles = {};
  if (mainImage) cardImageStyles.backgroundImage = `url(${mainImage.imageUrl})`;

  return (
    <li style={{ marginTop: '24px' }} className='column is-one-third'>
      <LinkElem
        to={_id && `/recipe/${_id}`}
        className={`card ${loader && 'is-loading'}`}
        style={{ display: 'block' }}
      >
        <div
          className='card-image has-background-grey-lighter'
          style={cardImageStyles}
        >
          <figure className='image is-2by1'>
            {!mainImage && <img src={recipeCardPlaceholder} alt={title} />}

            {isPrivate && (
              <Tag className='card-badge' color='danger' label='Private' />
            )}
          </figure>
        </div>
        <div className='card-content'>
          <div className='content'>
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
          </div>
        </div>
      </LinkElem>
    </li>
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
