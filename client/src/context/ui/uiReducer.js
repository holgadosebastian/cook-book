import { SHOW_NOTIFICATION, REMOVE_NOTIFICATIONS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
        displayNotification: true
      };
    case REMOVE_NOTIFICATIONS:
      return {
        ...state,
        notification: {
          message: null,
          type: 'primary'
        },
        displayNotification: false
      };
    default:
      return state;
  }
};
