import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

const Message = ({ messageList }) => {
  return (
    <article className='message is-danger'>
      <div className='message-body'>
        <ul>
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
      </div>
    </article>
  );
};

Message.propTypes = {
  messageList: PropTypes.array.isRequired
};

export default Message;
