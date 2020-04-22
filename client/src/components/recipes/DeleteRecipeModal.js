import React from 'react';
import Button from '../elements/Button';

const DeleteRecipeModal = ({ onDelete, modalActive, setModalActive }) => {
  return (
    <div className={`modal ${modalActive && 'is-active'}`}>
      <div
        className='modal-background'
        onClick={() => setModalActive(false)}
      ></div>
      <div className='modal-content'>
        <div className='box'>
          <p className='is-size-5 has-text-weight-light has-text-grey-darker has-text-centered'>
            Are you sure you want to delete this recipe?
          </p>
          <Button
            style={{ marginTop: '24px' }}
            color='danger'
            outlined
            cssClasses='is-fullwidth'
            onClick={onDelete}
          >
            Delete
          </Button>

          <Button
            style={{ marginTop: '16px' }}
            color='text'
            outlined
            cssClasses='is-fullwidth'
            onClick={() => setModalActive(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
      <button
        className='modal-close is-large'
        onClick={() => setModalActive(false)}
        aria-label='close'
      ></button>
    </div>
  );
};

export default DeleteRecipeModal;
