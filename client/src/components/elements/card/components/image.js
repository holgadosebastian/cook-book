import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const CardImage = ({ className, children, size, image, ...props }) => {
  return (
    <div {...props} className={classnames('card-image', className)}>
      <figure
        style={{ backgroundImage: `url(${image})` }}
        className={classnames(
          'image',
          'has-background-grey-lighter',
          'background-image-centered',
          {
            [`is-${size}`]: size
          }
        )}
      >
        {children}
      </figure>
    </div>
  );
};

CardImage.defaultProps = {
  style: undefined,
  className: undefined,
  size: '2by1',
  image: null
};

CardImage.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.string,
  image: PropTypes.string
};

export default CardImage;
