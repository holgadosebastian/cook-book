import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Modal = ({
  className,
  children,
  modalActive,
  setModalActive,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classnames('modal', {
        'is-active': modalActive
      })}
    >
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

Modal.defaultProps = {
  style: undefined,
  className: undefined,
  modalActive: false,
  setModalActive: () => null
};

Modal.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  modalActive: PropTypes.bool.isRequired,
  setModalActive: PropTypes.func.isRequired
};

export default Modal;
