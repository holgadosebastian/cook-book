const validate = (type, value, options) => {
  let error = null;

  switch (type) {
    case 'username':
      if (value === '') {
        error = 'Username is required';
      } else if (value.length < 6) {
        error = 'Username is too short, minimum 6 characters';
      }
      break;
    case 'password':
      if (value === '') {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'Password is too short, minimum 6 characters';
      }
      break;
    case 'password2':
      if (value !== options.password) {
        error = 'Passwords do not match';
      }
      break;
    case 'secret':
      if (value === '') {
        error = 'Secret is required to make an account';
      }
      break;
    case 'title':
      if (value === '') {
        error = 'Title is required';
      }
      break;
    case 'ingredients':
      if (value.length === 0) {
        error = 'At least 1 ingredient is required';
      }
      break;
    case 'instructions':
      if (value === '') {
        error = 'Basic instructions are required';
      }
      break;
    default:
      return error;
  }

  return error;
};

export default validate;
