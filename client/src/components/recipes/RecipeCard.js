import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe: { title, id } }) => {
  return (
    <li style={{ marginTop: '24px' }}>
      <Link to={`/recipe/${id}`} className='card' style={{ display: 'block' }}>
        <div className='card-image'>
          <figure className='image is-2by1'>
            <img
              src='https://bulma.io/images/placeholders/1280x960.png'
              alt='Placeholder image'
            />
          </figure>
        </div>
        <div className='card-content'>
          <div className='content'>
            <p className='is-size-5 has-text-weight-bold has-text-primary'>
              {title}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default RecipeCard;
