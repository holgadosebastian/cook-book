export const getUserName = (firstName, lastName, username) => {
  if (firstName || lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return username;
  }
};
