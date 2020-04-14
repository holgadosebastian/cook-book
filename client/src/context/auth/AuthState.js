import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_CLEAR_ERRORS,
  USER_SET_ERRORS,
  USER_LOADED,
  AUTH_ERROR
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: null,
    loading: true,
    errors: []
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.getItem('token'));
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  // Register User
  const registerUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (error) {
      console.error(error.response);
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data
      });
    }
  };

  // Login User
  const loginUser = () => {
    console.log('Login User');
  };

  // Logout
  const logoutUser = () => {
    console.log('Logout User');
  };

  // Set Errors
  const setUserErrors = (errors) => {
    dispatch({
      type: USER_SET_ERRORS,
      payload: errors
    });
  };

  // Clear Errors
  const clearUserErrors = () => {
    console.log('Clear Errors');
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        errors: state.errors,
        loadUser,
        registerUser,
        loginUser,
        logoutUser,
        clearUserErrors,
        setUserErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
