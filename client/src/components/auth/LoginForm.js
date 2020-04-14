import React, { useState, useContext } from 'react';
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
    <div className='box'>
      <p className='is-size-4' style={{ marginBottom: '16px' }}>
        Login
      </p>
      <form onSubmit={onSubmit}>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
