// Sets the logged in user session
const setLoggedInUser = (user) => {
  sessionStorage.loggedInUser = JSON.stringify(user);
};

// Retrieves the current logged in user

const getLoggedInUser = () => {
  if (!sessionStorage.loggedInUser) {
    console.error("Error! No logged in user");
    return null;
  }
  return JSON.parse(sessionStorage.loggedInUser);
};

// Get the userbase from local storage
const getUserbase = () => {
  return JSON.parse(localStorage?.userbase);
};

// Get a user from the userbase
const getUserByUsername = (username) => {
  const userbase = getUserbase();
  const users = userbase.filter((user) => user.username === username);
  console.log(users[0]);
  return users[0];
};
export { setLoggedInUser, getLoggedInUser, getUserbase, getUserByUsername };
