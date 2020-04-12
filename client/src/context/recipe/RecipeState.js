import React, { useReducer } from 'react';
import axios from 'axios';
import RecipeContext from './recipeContext';
import recipeReducer from './recipeReducer';
import {
  GET_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  RECIPE_ERROR,
  SET_CURRENT_RECIPE,
  CLEAR_CURRENT_RECIPE,
  UPDATE_RECIPE
} from '../types';

const RecipeState = (props) => {
  const initialState = {
    recipes: [],
    currentRecipe: null,
    error: null
  };

  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Get all recipes
  const getRecipes = async () => {
    try {
      const res = await axios.get('/recipes');

      dispatch({
        type: GET_RECIPES,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      // dispatch({
      //   type: RECIPE_ERROR,
      //   payload: err.response.msg
      // });
    }
  };

  const setCurrentRecipe = async (id) => {
    try {
      const res = await axios.get(`/recipes/${id}`);

      dispatch({
        type: SET_CURRENT_RECIPE,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      // dispatch({
      //   type: RECIPE_ERROR,
      //   payload: err.response.msg
      // });
    }
  };

  const addRecipe = async (recipe) => {
    const config = {
      headers: {
        'Context-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/recipes', recipe, config);

      dispatch({
        type: ADD_RECIPE,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      // dispatch({
      //   type: RECIPE_ERROR,
      //   payload: err.response.msg
      // });
    }
  };

  const removeRecipe = async (id) => {
    try {
      const res = await axios.delete(`/recipes/${id}`);

      dispatch({
        type: DELETE_RECIPE,
        payload: id
      });
    } catch (err) {
      console.log(err);
      // dispatch({
      //   type: RECIPE_ERROR,
      //   payload: err.response.msg
      // });
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        currentRecipe: state.currentRecipe,
        error: state.error,
        getRecipes,
        setCurrentRecipe,
        addRecipe,
        removeRecipe
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
