import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_SET_ERRORS,
  USER_LOADED,
  AUTH_LOADING,
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

      try {
        const res = await axios.get('/api/auth');

        dispatch({
          type: USER_LOADED,
          payload: res.data
        });
      } catch (error) {
        dispatch({
          type: AUTH_ERROR,
          payload: [
            {
              msg: 'Auth error'
            }
          ]
        });
      }
    } else {
      setLoading(false);
    }
  };

  // Register User
  const registerUser = async (formData) => {
    setLoading(true);

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
        payload: error.response.data.errors
      });
    }
  };

  // Login User
  const loginUser = async (formData) => {
    setLoading(true);

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (error) {
      console.error(error.response);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data
      });
    }
  };

  // Logout
  const logoutUser = () => {
    dispatch({
      type: LOGOUT,
      payload: []
    });
  };

  // Sets loading to true
  const setLoading = (loading) => {
    dispatch({
      type: AUTH_LOADING,
      payload: loading
    });
  };

  // Set Errors
  const setUserErrors = (errors) => {
    dispatch({
      type: USER_SET_ERRORS,
      payload: errors
    });
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
        setLoading,
        setUserErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
