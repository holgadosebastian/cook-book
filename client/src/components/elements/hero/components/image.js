import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const HeroImage = ({
  style,
  className,
  children,
  imageUrl,
  rounded,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classnames(
        'hero-image',
        'square-image',
        'has-border',
        'has-bacgrkound-lighter',
        {
          'is-rounded': rounded
        }
      )}
      style={{ ...style, backgroundImage: `url(${imageUrl})` }}
    >
      {children}
    </div>
  );
};

HeroImage.defaultProps = {
  style: undefined,
  className: undefined,
  children: null,
  imageUrl: undefined,
  rounded: false
};

HeroImage.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node,
  imageUrl: PropTypes.string.isRequired,
  rounded: PropTypes.bool
};

export default HeroImage;
