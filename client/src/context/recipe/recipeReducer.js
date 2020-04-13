import {
  GET_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  RECIPE_ERROR,
  SET_CURRENT_RECIPE,
  CLEAR_CURRENT_RECIPE,
  UPDATE_RECIPE
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: state.recipes.push(action.payload),
        currentRecipe: action.payload,
        loading: false
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        currentRecipe: action.payload,
        loading: false
      };
    case DELETE_RECIPE:
      return {
        ...state,
        currentRecipe: null,
        recipes: state.recipes.filter((recipe) => {
          return recipe.id !== action.payload;
        }),
        loading: false
      };
    case SET_CURRENT_RECIPE:
      return {
        ...state,
        currentRecipe: action.payload,
        loading: true
      };
    default:
      return state;
  }
};
