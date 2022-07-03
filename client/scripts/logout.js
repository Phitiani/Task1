// Logs the user out
const logout = () => {
  if (!sessionStorage.loggedInUser || sessionStorage.loggedInUser === "") {
    console.error("Error! No logged in user");
    return;
  }

  sessionStorage.loggedInUser = "";
  window.location.href = "../index.html";
};

export { logout };
