import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';
import Button from '../elements/button';

const DeleteRecipeModal = ({ onDelete, modalActive, setModalActive }) => {
  return (
    <Modal modalActive={modalActive} setModalActive={setModalActive}>
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
        onClick={() => setModalActive(false)}
      >
        Cancel
      </Button>
    </Modal>
  );
};

DeleteRecipeModal.propTypes = {
  onDelete: PropTypes.func.isRequired,
  modalActive: PropTypes.bool.isRequired,
  setModalActive: PropTypes.func.isRequired
};

export default DeleteRecipeModal;
