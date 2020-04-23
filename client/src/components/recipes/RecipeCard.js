import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ loader, recipe }) => {
  const LinkElem = loader ? 'div' : Link;

  let cardImageStyles = {};
  if (recipe && recipe.mainImage)
    cardImageStyles.backgroundImage = `url(${recipe.mainImage.imageUrl})`;

  return (
    <li style={{ marginTop: '24px' }} className='column is-one-third'>
      <LinkElem
        to={recipe && `/recipe/${recipe._id}`}
        className={`card ${loader && 'is-loading'}`}
        style={{ display: 'block' }}
      >
        <div
          className='card-image has-background-grey-lighter'
          style={cardImageStyles}
        >
          <figure className='image is-2by1'>
            {recipe && !recipe.mainImage && (
              <img src='https://bulma.io/images/placeholders/1280x960.png' />
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
                recipe.title
              )}
            </p>
          </div>
        </div>
      </LinkElem>
    </li>
  );
};

export default RecipeCard;
