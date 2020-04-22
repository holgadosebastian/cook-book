import React, { useContext, useEffect } from 'react';
import LoginForm from '../auth/LoginForm';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated, clearErrors } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);

  useEffect(() => {
    console.log(clearErrors);
    !isAuthenticated && loadUser();
    // eslint-disable-next-line
  }, []);

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
