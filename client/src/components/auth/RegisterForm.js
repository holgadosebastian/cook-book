import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const RegisterForm = () => {
  const authContext = useContext(AuthContext);
  const { registerUser, setUserErrors, errors } = authContext;

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    password2: '',
    secret: ''
  });

  const { firstName, lastName, username, password, password2, secret } = user;

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
      submitErrors.push({
        msg: 'Passwords do not match'
      });
    }

    if (secret === '') {
      submitErrors.push({
        msg: 'Secret is required'
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
      password,
      secret
    });
  };

  return (
    <Fragment>
      <div className='box'>
        <p
          className='is-size-4 has-text-centered has-text-weight-light is-uppercase has-text-grey-light'
          style={{ marginBottom: '24px' }}
        >
          Register an Account
        </p>
        <form onSubmit={onSubmit}>
          <div className='columns is-mobile'>
            <div
              style={{
                paddingBottom: '0px'
              }}
              className='column'
            >
              <div className='field'>
                <label
                  className='label is-uppercase has-text-weight-light has-text-grey-darker'
                  htmlFor='firstname'
                >
                  First Name
                </label>
                <div className='control'>
                  <input
                    id='firstname'
                    className='input'
                    name='firstName'
                    type='text'
                    value={firstName}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                paddingBottom: '0px'
              }}
              className='column'
            >
              <div className='field'>
                <label
                  className='label is-uppercase has-text-weight-light has-text-grey-darker'
                  htmlFor='lastname'
                >
                  Last Name
                </label>
                <div className='control'>
                  <input
                    id='lastname'
                    className='input'
                    name='lastName'
                    type='text'
                    value={lastName}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='field'>
            <label
              className='label is-uppercase has-text-weight-light has-text-grey-darker'
              htmlFor='username'
            >
              Username <span className='has-text-danger'>*</span>
            </label>
            <div className='control'>
              <input
                id='username'
                className='input'
                name='username'
                type='text'
                value={username}
                onChange={onChange}
              />
            </div>
          </div>

          <div className='field'>
            <label
              className='label is-uppercase has-text-weight-light has-text-grey-darker'
              htmlFor='password'
            >
              Password <span className='has-text-danger'>*</span>
            </label>
            <div className='control'>
              <input
                id='password'
                className='input'
                name='password'
                type='password'
                value={password}
                onChange={onChange}
              />
            </div>
          </div>

          <div className='field'>
            <label
              className='label is-uppercase has-text-weight-light has-text-grey-darker'
              htmlFor='password2'
            >
              Confirm password <span className='has-text-danger'>*</span>
            </label>
            <div className='control'>
              <input
                className='input'
                name='password2'
                type='password'
                value={password2}
                onChange={onChange}
              />
            </div>
          </div>

          <div className='field'>
            <label
              className='label is-uppercase has-text-weight-light has-text-grey-darker'
              htmlFor='secret'
            >
              Secret <span className='has-text-danger'>*</span>
            </label>
            <div className='control'>
              <input
                className='input'
                name='secret'
                type='text'
                value={secret}
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
            style={{ marginTop: '24px' }}
            className='button is-primary is-rounded is-fullwidth is-uppercase'
            type='submit'
          >
            Register
          </button>
        </form>
      </div>
      <p className='has-text-centered has-text-grey has-font-weight-light'>
        Already have an account?{' '}
        <Link
          to='/login'
          style={{ textDecoration: 'underline' }}
          className='has-text-primary'
        >
          Login
        </Link>
      </p>
    </Fragment>
  );
};

export default RegisterForm;
