import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import Button from '../../../elements/button';

const FormAddons = ({ buttonColor, buttonText, onClick, ...props }) => {
  return (
    <Fragment>
      <div className='field has-addons'>
        <div className='control is-expanded'>
          <Input {...props} />
        </div>
        <div className='control'>
          <Button color={buttonColor} rounded={false} onClick={onClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

FormAddons.defaultProps = {
  id: null,
  buttonColor: 'primary',
  error: false,
  errorMessage: null
};

FormAddons.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default FormAddons;
