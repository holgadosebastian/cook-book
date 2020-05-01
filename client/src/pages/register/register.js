import React, { useEffect, useContext } from 'react';
import RegisterForm from '../../components/auth/RegisterForm';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
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
      <RegisterForm />
    </div>
  );
};

export default Register;
