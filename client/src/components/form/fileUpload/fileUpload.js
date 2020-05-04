import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../elements/spinner';

const FileUpload = ({ name, onChange, loading, uploadedImage }) => {
  let ctaStyles = {};
  if (uploadedImage) ctaStyles.backgroundImage = `url(${uploadedImage})`;

  return (
    <div className='field'>
      <div className='file is-small is-boxed'>
        <label className='file-label' style={{ width: '100%' }}>
          <input
            className='file-input'
            type='file'
            name='resume'
            onChange={onChange}
          />
          <span className='file-cta' style={ctaStyles}>
            {loading ? (
              <Spinner size='medium' />
            ) : (
              uploadedImage === null && (
                <Fragment>
                  <span className='file-icon'>
                    <i className='fas fa-image'></i>
                  </span>
                  <span className='file-label is-uppercase'>{name}</span>
                </Fragment>
              )
            )}
          </span>
        </label>
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  uploadedImage: PropTypes.string
};

export default FileUpload;
