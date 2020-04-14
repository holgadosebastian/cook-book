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
      const res = await axios.get('/api/recipes');

      dispatch({
        type: GET_RECIPES,
        payload: res.data.recipes
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
      const res = await axios.get(`/api/recipes/${id}`);

      dispatch({
        type: SET_CURRENT_RECIPE,
        payload: res.data.recipe
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
      const res = await axios.post('/api/recipes', recipe, config);

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

  const updateRecipe = async (recipe) => {
    const config = {
      headers: {
        'Context-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/recipes/${recipe.id}`, recipe, config);

      dispatch({
        type: UPDATE_RECIPE,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
      // dispatch({
      //   type: RECIPE_ERROR,
      //   payload: error.response.msg
      // });
    }
  };

  const removeRecipe = async (id) => {
    try {
      await axios.delete(`/api/recipes/${id}`);

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
        updateRecipe,
        removeRecipe
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
