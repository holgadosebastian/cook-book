import { GET_USER, UPDATE_USER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
