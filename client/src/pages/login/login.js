import React, { useContext, useEffect } from 'react';
import LoginForm from '../../components/auth/loginForm';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated, setUserErrors } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);

  useEffect(() => {
    setUserErrors([]);
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
