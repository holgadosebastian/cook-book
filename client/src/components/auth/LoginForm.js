import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const { loginUser, setUserErrors, errors } = authContext;

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const { username, password } = user;

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
    }

    if (!!submitErrors.length) {
      setUserErrors(submitErrors);
      return false;
    }

    loginUser({
      username,
      password
    });
  };

  return (
    <Fragment>
      <div className='box'>
        <p
          className='is-size-4 has-text-centered has-text-weight-light is-uppercase has-text-grey-light'
          style={{ marginBottom: '24px' }}
        >
          Login to{' '}
          <span className='has-text-grey-darker has-text-weight-normal'>
            Cook Book
          </span>
        </p>
        <form onSubmit={onSubmit}>
          <div className='field'>
            <label
              className='label is-uppercase has-text-weight-light has-text-grey-darker'
              htmlFor='username'
            >
              Username
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
              Password
            </label>
            <div className='control'>
              <input
                className='input'
                id='password'
                name='password'
                type='password'
                value={password}
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
                    <li className='is-size-6'>{error.msg}</li>
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
            Login
          </button>
        </form>
      </div>
      <p className='has-text-centered has-text-grey has-font-weight-light'>
        Don't have an account yet?{' '}
        <Link
          to='/register'
          style={{ textDecoration: 'underline' }}
          className='has-text-primary'
        >
          Register
        </Link>
      </p>
    </Fragment>
  );
};

export default LoginForm;
