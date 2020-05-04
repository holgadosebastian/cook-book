import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CardImage from './components/image';
import CardContent from './components/content';

const Card = ({ className, children, loading, ...props }) => {
  const Elem = loading ? 'div' : Link;

  return (
    <Elem
      {...props}
      className={classnames('card', className, {
        'is-loading': loading
      })}
    >
      {children}
    </Elem>
  );
};

Card.Image = CardImage;
Card.Content = CardContent;

Card.defaultProps = {
  style: undefined,
  className: undefined,
  children: null,
  loading: false
};

Card.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool
};

export default Card;
