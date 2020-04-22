import React from 'react';
import PropTypes from 'prop-types';

const FileUpload = ({ name, onChange }) => {
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
          <span className='file-cta'>
            <span className='file-icon'>
              <i className='fas fa-upload'></i>
            </span>
            <span className='file-label'>{name}</span>
          </span>
        </label>
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default FileUpload;
