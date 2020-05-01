import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

const MessageList = ({ className, messageList, ...props }) => {
  return (
    <ul {...props} className={className}>
      {messageList.map((message) => {
        // TODO: Should be only {message}
        let id = v4();

        return (
          <li className='is-size-7' key={id}>
            {message.msg}
          </li>
        );
      })}
    </ul>
  );
};

MessageList.defaultProps = {
  style: undefined,
  className: undefined,
  messageList: []
};

MessageList.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  messageList: PropTypes.array.isRequired
};

export default MessageList;
