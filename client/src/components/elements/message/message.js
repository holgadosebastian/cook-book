import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MessageList from './components/list';

const Message = ({ className, children, ...props }) => {
  return (
    <article
      {...props}
      className={classnames('message', 'is-danger', className)}
    >
      <div className='message-body'>{children}</div>
    </article>
  );
};

Message.List = MessageList;

Message.defaultProps = {
  style: undefined,
  className: undefined,
  children: undefined
};

Message.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  children: PropTypes.node
};

export default Message;
