export const getUserName = (firstName, lastName, username) => {
  if (firstName || lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return username;
  }
};

export const isLoggedInUser = (loggedUser, id) => {
  if (!loggedUser) {
    return false;
  } else if (loggedUser._id !== id) {
    return false;
  }

  return true;
};
