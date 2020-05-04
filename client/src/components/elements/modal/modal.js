import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ESC_KEYCODE = 27;
const modalsRoot = document.getElementById('modals-root');

const Modal = ({ className, children, show, onClose, ...props }) => {
  const elRef = useRef(null);

  useEffect(() => {
    const el = document.createElement('div');
    modalsRoot.appendChild(el);
    elRef.current = el;

    return () => {
      modalsRoot.removeChild(el);
    };
    // eslint-disable-next-line
  }, []);

  // Needs to update event listeners when updating show prop
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line
  }, [show]);

  // Close modal when pressing ESC key
  const onKeyDown = (e) => {
    if (e.keyCode === ESC_KEYCODE && show) {
      onClose();
    }
  };

  if (!elRef.current) return null;

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
    elRef.current
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
