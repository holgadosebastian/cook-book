import {
  GET_RECIPES,
  GET_USER_RECIPES,
  SEARCH_RECIPES,
  CREATE_RECIPE,
  DELETE_RECIPE,
  RECIPE_ERROR,
  SET_CURRENT_RECIPE,
  UPDATE_RECIPE,
  RECIPE_LOADING
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_RECIPES:
    case GET_USER_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false
      };
    case SEARCH_RECIPES:
      return {
        ...state,
        searchResults: action.payload,
        loading: false
      };
    case CREATE_RECIPE:
      return {
        ...state,
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
        loading: false
      };
    case SET_CURRENT_RECIPE:
      return {
        ...state,
        currentRecipe: action.payload,
        loading: false
      };
    case RECIPE_ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false
      };
    case RECIPE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
