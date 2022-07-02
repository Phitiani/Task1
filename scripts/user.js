import { handleValue } from "./functions.js";

//Register function
const register = (e) => {
  e.preventDefault();

  if (!localStorage.userbase) {
    console.error("Local storage is inaccessible");
    return;
  }

  // Input Nodes
  const usernameNode = document.getElementById("register-username");
  const passwordNode = document.getElementById("register-password");
  const confirmPasswordNode = document.getElementById(
    "register-confirm-password"
  );

  const username = usernameNode.value.toLowerCase();
  const password = passwordNode.value;
  const confirmationPassword = confirmPasswordNode.value;

  const registrationIsValid = validateRegistration(
    username,
    password,
    confirmationPassword
  );

  // Add user to localStorage userbase
  if (registrationIsValid) {
    addUserToUserbase(username, password);
    window.location.href = "../index.html";
  }
};

// Adds the user the local storage user base
const addUserToUserbase = (username, password) => {
  let userbase = JSON.parse(localStorage?.userbase);
  userbase.push({
    username,
    password,
  });
  localStorage.userbase = JSON.stringify(userbase);
};

// Checks if the entered username already exists
const usernameInUserbase = (username) => {
  const userbase = JSON.parse(localStorage?.userbase);
  return userbase.some((user) => user.username === username);
};

const validateRegistration = (username, password, confirmationPassword) => {
  // Validation Nodes
  const usernameValidationNode = document.getElementById("username-v-msg");
  const passwordValidationNode = document.getElementById("password-v-msg");
  const confirmationPasswordValidationNode = document.getElementById(
    "confirm-password-v-msg"
  );
  const usernameIsValid = validateUsername(username);
  const passwordIsValid = validatePassword(password);
  const confirmationPasswordIsValid = validateConfirmationPassword(
    password,
    confirmationPassword
  );

  if (!usernameIsValid.result) {
    usernameValidationNode.classList.remove("hidden");
    handleValue(
      usernameValidationNode,
      usernameIsValid.message,
      usernameIsValid.message,
      "Error"
    );
  } else {
    usernameValidationNode.classList.add("hidden");
  }

  if (!passwordIsValid.result) {
    passwordValidationNode.classList.remove("hidden");
    handleValue(
      passwordValidationNode,
      passwordIsValid.message,
      passwordIsValid.message,
      "Error"
    );
  } else {
    passwordValidationNode.classList.add("hidden");
  }
  if (!confirmationPasswordIsValid.result) {
    confirmationPasswordValidationNode.classList.remove("hidden");
    handleValue(
      confirmationPasswordValidationNode,
      confirmationPasswordIsValid.message,
      confirmationPasswordIsValid.message,
      "Error"
    );
  } else {
    confirmationPasswordValidationNode.classList.add("hidden");
  }

  return (
    usernameIsValid.result &&
    passwordIsValid.result &&
    confirmationPasswordIsValid.result
  );
};

// Function which performs validation on the username
const validateUsername = (username) => {
  let error = "";
  if (username === undefined || username === null) {
    error = "Username is null or undefined";
    // console.error("Error: " + error);
    return { result: false, message: error };
  }

  if (username === "") {
    error = "No username was entered";
    // console.error("Error: " + error);
    return { result: false, message: error };
  }

  if (username.length < 6) {
    error = "Username is less than 6 characters";
    // console.error("Error: " + error);
    return { result: false, message: error };
  }

  if (usernameInUserbase(username)) {
    error = `The username ${username} already exists. Choose a different one`;
    //   console.error(error);
    return { result: false, message: error };
  }
  //   console.log("Valid username");
  //   Add validation for existing username
  return { result: true, message: "Valid username" };
};

// Function which performs validation on the password
const validatePassword = (password) => {
  let error = "";
  //   Regular expression for password:
  // Rules:
  // 1- 6-16 characters
  // 2- Must include at least one number, other than letters
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;

  if (password === undefined || password === null) {
    error = "Password is null or undefined";
    // console.error("Error: " + error);
    return { result: false, message: error };
  }

  if (password === "") {
    error = "No password was entered";
    // console.error("Error: " + error);
    return { result: false, message: error };
  }

  if (password.length < 6) {
    error = "Password is less than 6 characters";
    // console.error("Error: " + error);
    return { result: false, message: error };
  }

  if (!regex.test(password)) {
    error = "Password must be 6-16 characters, including at least 1 number";
    // console.error("Error: " + error);
    return { result: false, message: error };
  }

  //   console.log("Password is valid");
  return { result: true, message: "Password is valid" };
};

// Function that checks if password confirmation is valid
const validateConfirmationPassword = (password, confirmationPassword) => {
  let error = "";

  // Check if confirm password is valid
  const secondPasswordIsValid = validatePassword(confirmationPassword);

  if (!secondPasswordIsValid.result) {
    error = secondPasswordIsValid.message;
    // console.error("Error: " + error);
    return { result: false, message: error };
  }
  if (confirmationPassword !== password) {
    error = "Second password does not match!";
    // console.error("Error: " + error);
    return { result: false, message: error };
  }

  //   console.log("Password matches and is valid");
  return { result: true, message: "Password matches and is valid" };
};

// Main login function
const login = (e) => {
  e.preventDefault();
  if (!localStorage.userbase) {
    console.error("Local storage is inaccessible");
    return;
  }
  const usernameNode = document.getElementById("login-username");
  const passwordNode = document.getElementById("login-password");

  const username = usernameNode.value.toLowerCase();
  const password = passwordNode.value;

  const loginIsValid = validateLogin(username, password);

  if (loginIsValid) {
    // console.log(`The user ${username} logged in successfully!`);
    window.location.href = "../index.html";
  }
};

const validateLogin = (username, password) => {
  const usernameValidationNode = document.getElementById(
    "login-username-v-msg"
  );
  const passwordValidationNode = document.getElementById(
    "login-password-v-msg"
  );

  let userExists = validateUserOnLogin(username);
  let passwordIsCorrect = false;

  if (!userExists.result) {
    usernameValidationNode.classList.remove("hidden");
    handleValue(
      usernameValidationNode,
      userExists.message,
      userExists.message,
      "Error"
    );
  } else {
    usernameValidationNode.classList.add("hidden");
    let passwordIsValid = validatePasswordOnLogin(username, password);

    if (!passwordIsValid.result) {
      passwordValidationNode.classList.remove("hidden");
      handleValue(
        passwordValidationNode,
        passwordIsValid.message,
        passwordIsValid.message,
        "Error"
      );
    } else {
      passwordValidationNode.classList.add("hidden");
      passwordIsCorrect = true;
    }
  }

  return userExists.result && passwordIsCorrect;
};

const validateUserOnLogin = (username) => {
  let error = "";
  if (username === undefined || username === null) {
    error = "Username is null or undefined";
    // console.error("Error: " + error);
    return { result: false, message: error };
  }

  if (username === "") {
    error = "No username was entered";
    // console.error("Error: " + error);
    return { result: false, message: error };
  }

  let userExists = usernameInUserbase(username);
  if (!userExists) {
    error = `The user ${username} does not exist!`;
    //   console.error(error);
    return { result: false, message: error };
  }
  return { result: true, message: "Username is in userbase" };
};

const validatePasswordOnLogin = (username, password) => {
  let error = "";
  if (password === undefined || password === null) {
    error = "Password is null or undefined";
    // console.error("Error: " + error);
    return { result: false, message: error };
  }

  if (password === "") {
    error = "No password was entered";
    // console.error("Error: " + error);
    return { result: false, message: error };
  }

  const userbase = JSON.parse(localStorage.userbase);
  let user = userbase.filter((user) => user.username === username);
  if (user[0]?.password !== password) {
    error = "Incorrect Password";
    //   console.error(error);
    return { result: false, message: error };
  } else {
    // console.log("Password matched");
    return { result: true, message: "Password matched" };
  }
};

document.getElementById("register-form").addEventListener("submit", register);
document.getElementById("login-form").addEventListener("submit", login);
