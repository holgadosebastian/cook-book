import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../elements/modal';
import Button from '../../elements/button';

const DeleteRecipeModal = ({ onDelete, modalActive, onClose }) => {
  return (
    <Modal show={modalActive} onClose={onClose}>
      <p className='is-size-5 has-text-weight-light has-text-grey-darker has-text-centered'>
        Are you sure you want to delete this recipe?
      </p>
      <Button
        style={{ marginTop: '24px' }}
        color='danger'
        outlined
        fullwidth
        onClick={onDelete}
      >
        Delete
      </Button>

      <Button
        style={{ marginTop: '16px' }}
        color='text'
        outlined
        fullwidth
        onClick={onClose}
      >
        Cancel
      </Button>
    </Modal>
  );
};

DeleteRecipeModal.propTypes = {
  onDelete: PropTypes.func.isRequired,
  modalActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DeleteRecipeModal;
