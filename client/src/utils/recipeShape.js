import PropTypes from 'prop-types';

const recipeShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  instructions: PropTypes.string.isRequired,
  description: PropTypes.string,
  servingSize: PropTypes.number,
  cookingTime: PropTypes.number,
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  mainImage: PropTypes.shape({}),
  isPrivate: PropTypes.bool
});

export default recipeShape;
