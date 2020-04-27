import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ modalActive, setModalActive, children }) => {
  return (
    <div className={`modal ${modalActive && 'is-active'}`}>
      <div
        className='modal-background'
        onClick={() => setModalActive(false)}
      ></div>
      <div className='modal-content'>
        <div className='box'>{children}</div>
        <button
          className='modal-close is-large'
          onClick={() => setModalActive(false)}
          aria-label='close'
        ></button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalActive: PropTypes.bool.isRequired,
  setModalActive: PropTypes.func.isRequired
};

export default Modal;
