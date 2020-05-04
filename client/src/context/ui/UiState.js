import React, { useReducer } from 'react';
import UiContext from './uiContext';
import uiReducer from './uiReducer';
import { SHOW_NOTIFICATION, REMOVE_NOTIFICATIONS } from '../types';

const UiState = (props) => {
  const initialState = {
    notification: {
      message: null,
      type: 'primary'
    },
    displayNotification: false
  };

  const [state, dispatch] = useReducer(uiReducer, initialState);

  const showNotification = (message, timeout, type) => {
    let notification = {
      message,
      type: 'primary'
    };

    if (type) notification.type = type;

    dispatch({
      type: SHOW_NOTIFICATION,
      payload: notification
    });

    setTimeout(() => {
      removeNotifications();
    }, timeout);
  };

  const removeNotifications = () => {
    dispatch({
      type: REMOVE_NOTIFICATIONS
    });
  };

  return (
    <UiContext.Provider
      value={{
        notification: state.notification,
        displayNotification: state.displayNotification,
        showNotification,
        removeNotifications
      }}
    >
      {props.children}
    </UiContext.Provider>
  );
};

export default UiState;
