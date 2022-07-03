import { getLoggedInUser } from "./session.js";

const checkAuthorization = () => {
  if (getLoggedInUser() === null || getLoggedInUser === "") {
    window.location.href = "../index.html";
  }
};

checkAuthorization();
