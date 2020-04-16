import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';
import { GET_USER } from '../types';

const UserState = (props) => {
  const initialState = {
    user: null,
    errors: []
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get user data
  const getUser = async (id) => {
    try {
      const res = await axios.get(`/api/users/${id}`);

      dispatch({
        type: GET_USER,
        payload: res.data
      });
    } catch (error) {
      console.error(error.message);
      // dispatch({
      //   type: AUTH_ERROR,
      //   payload: [
      //     {
      //       msg: 'Auth error'
      //     }
      //   ]
      // });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        errors: state.errors,
        getUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
