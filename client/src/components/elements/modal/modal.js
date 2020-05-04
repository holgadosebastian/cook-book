import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const modalsRoot = document.getElementById('modals-root');

const Modal = ({ className, children, show, onClose, ...props }) => {
  let el = document.createElement('div');

  useEffect(() => {
    modalsRoot.appendChild(el);

    return () => {
      modalsRoot.removeChild(el);
    };
  });

  return createPortal(
    <div
      {...props}
      className={classnames('modal', {
        'is-active': show
      })}
    >
      <div className='modal-background' onClick={onClose}></div>
      <div className='modal-content'>
        <div className='box'>{children}</div>
        <button
          className='modal-close is-large'
          onClick={onClose}
          aria-label='close'
        ></button>
      </div>
    </div>,
    el
  );
};

Modal.defaultProps = {
  style: undefined,
  className: undefined,
  show: false,
  onClose: () => null
};

Modal.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
