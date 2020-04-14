import React, { useEffect, useContext } from 'react';
import RegisterForm from '../auth/RegisterForm';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);

  return (
    <div className='container is-fluid' style={{ paddingTop: '80px' }}>
      <RegisterForm />
    </div>
  );
};

export default Register;
