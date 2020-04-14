import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const RegisterForm = () => {
  const authContext = useContext(AuthContext);
  const { registerUser, setUserErrors, errors } = authContext;

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    password2: ''
  });

  const { firstName, lastName, username, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let submitErrors = [];

    if (username === '') {
      submitErrors.push({
        msg: 'Username is required'
      });
    }

    if (password === '') {
      submitErrors.push({
        msg: 'Password is required'
      });
    } else if (password !== password2) {
      console.log(password, password2);
      submitErrors.push({
        msg: 'Passwords do not match'
      });
    }

    if (!!submitErrors.length) {
      setUserErrors(submitErrors);
      return false;
    }

    registerUser({
      firstName,
      lastName,
      username,
      password
    });
  };

  return (
    <div className='box'>
      <p className='is-size-4' style={{ marginBottom: '16px' }}>
        Register User
      </p>
      <form onSubmit={onSubmit}>
        <div className='field'>
          <label className='label'>First Name</label>
          <div className='control'>
            <input
              className='input'
              name='firstName'
              type='text'
              placeholder='Text input'
              value={firstName}
              onChange={onChange}
            />
          </div>
        </div>

        <div className='field'>
          <label className='label'>Last Name</label>
          <div className='control'>
            <input
              className='input'
              name='lastName'
              type='text'
              placeholder='Text input'
              value={lastName}
              onChange={onChange}
            />
          </div>
        </div>

        <div className='field'>
          <label className='label'>Username</label>
          <div className='control'>
            <input
              className='input'
              name='username'
              type='text'
              placeholder='Text input'
              value={username}
              onChange={onChange}
            />
          </div>
        </div>

        <div className='field'>
          <label className='label'>Password</label>
          <div className='control'>
            <input
              className='input'
              name='password'
              type='password'
              placeholder='Text input'
              value={password}
              onChange={onChange}
            />
          </div>
        </div>

        <div className='field'>
          <label className='label'>Confirm password</label>
          <div className='control'>
            <input
              className='input'
              name='password2'
              type='password'
              placeholder='Text input'
              value={password2}
              onChange={onChange}
            />
          </div>
        </div>

        {!!errors.length && (
          <article className='message is-danger'>
            <div className='message-body'>
              <ul>
                {errors.map((error) => (
                  // TODO: Add key
                  <li className='is-size-7'>{error.msg}</li>
                ))}
              </ul>
            </div>
          </article>
        )}

        <button
          className='button is-primary is-rounded is-fullwidth'
          type='submit'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
