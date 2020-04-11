import React from 'react';

const RecipeCard = ({ recipe: { title } }) => {
  return (
    <li style={{ marginTop: '24px' }}>
      <div className='card'>
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
            <p className='is-size-4'>{title}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RecipeCard;
