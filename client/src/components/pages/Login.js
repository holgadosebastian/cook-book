import React, { useContext, useEffect } from 'react';
import LoginForm from '../auth/LoginForm';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);

  return (
    <div
      className='container is-form is-fluid'
      style={{ paddingTop: '80px', paddingBottom: '80px' }}
    >
      <LoginForm />
    </div>
  );
};

export default Login;
