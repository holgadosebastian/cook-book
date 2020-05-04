import React, { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Notification from '../elements/notification';
import UiContext from '../../context/ui/uiContext';

const notificationsRoot = document.getElementById('notifications-root');

const Notifications = () => {
  const uiContext = useContext(UiContext);
  const { displayNotification, notification, removeNotifications } = uiContext;

  let el = document.createElement('div');

  useEffect(() => {
    notificationsRoot.appendChild(el);

    return () => {
      notificationsRoot.removeChild(el);
    };
  });

  if (!displayNotification) return false;

  return createPortal(
    <Notification
      float='bottom-right'
      type={notification.type}
      onHide={() => removeNotifications()}
    >
      {notification.message}
    </Notification>,
    el
  );
};

export default Notifications;
