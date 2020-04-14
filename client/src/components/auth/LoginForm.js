import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const { loginUser, errors } = authContext;

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
    console.log('Form submit');
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
