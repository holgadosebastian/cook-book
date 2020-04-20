import React, { useReducer } from 'react';
import axios from 'axios';
import RecipeContext from './recipeContext';
import recipeReducer from './recipeReducer';
import {
  GET_RECIPES,
  GET_USER_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  RECIPE_ERROR,
  SET_CURRENT_RECIPE,
  UPDATE_RECIPE,
  RECIPE_LOADING
} from '../types';

const RecipeState = (props) => {
  const initialState = {
    recipes: [],
    currentRecipe: null,
    errors: null,
    loading: false
  };

  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Get all recipes
  const getRecipes = async () => {
    setRecipesLoading();

    try {
      const res = await axios.get('/api/recipes');

      dispatch({
        type: GET_RECIPES,
        payload: res.data.recipes
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: RECIPE_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Get all recipes from a user
  const getUserRecipes = async (id) => {
    setRecipesLoading();

    try {
      const res = await axios.get(`/api/recipes/user/${id}`);

      dispatch({
        type: GET_USER_RECIPES,
        payload: res.data.recipes
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: RECIPE_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Gets a recipe and sets it as current recipe
  const setCurrentRecipe = async (id) => {
    setRecipesLoading();

    try {
      const res = await axios.get(`/api/recipes/${id}`);

      dispatch({
        type: SET_CURRENT_RECIPE,
        payload: res.data.recipe
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: RECIPE_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Creates a recipe
  const addRecipe = async (recipe) => {
    setRecipesLoading();

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
    } catch (error) {
      console.log(error);
      dispatch({
        type: RECIPE_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Updates a recipe
  const updateRecipe = async (recipe) => {
    setRecipesLoading();

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
      dispatch({
        type: RECIPE_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Removes a recipe
  const removeRecipe = async (id) => {
    setRecipesLoading();

    try {
      await axios.delete(`/api/recipes/${id}`);

      dispatch({
        type: DELETE_RECIPE,
        payload: id
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: RECIPE_ERROR,
        payload: error.response.errors
      });
    }
  };

  const setRecipesLoading = () => {
    dispatch({
      type: RECIPE_LOADING
    });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        currentRecipe: state.currentRecipe,
        errors: state.errors,
        loading: state.loading,
        getRecipes,
        getUserRecipes,
        setCurrentRecipe,
        addRecipe,
        updateRecipe,
        removeRecipe,
        setRecipesLoading
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
