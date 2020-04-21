import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ messageList }) => {
  return (
    <article className='message is-danger'>
      <div className='message-body'>
        <ul>
          {messageList.map((message) => (
            // TODO: Add key
            // TODO: Should be only {message}
            <li className='is-size-7'>{message.msg}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

Message.propTypes = {
  messageList: PropTypes.array.isRequired
};

export default Message;
