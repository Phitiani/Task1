import { handleValue } from "./functions.js";
import { getLoggedInUser } from "./session.js";
import { logout } from "./logout.js";

function toggleMenu() {
  const menu = document.getElementById("menu");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
    hamburgerBtn.classList.toggle("hamburger-btn-active");
  } else {
    menu.style.display = "flex";
    hamburgerBtn.classList.toggle("hamburger-btn-active");
  }
}

document
  .getElementById("menu-btn")
  .addEventListener("click", toggleMenu, false);

window.addEventListener(
  "resize",
  () => {
    const menu = document.getElementById("menu");
    const hamburgerBtn = document.getElementById("hamburger-btn");

    if (window.innerWidth > 425) {
      menu.style.display = "none";
      hamburgerBtn.classList.remove("hamburger-btn-active");
    }
  },
  false
);
document.getElementById("logout-btn").addEventListener("click", logout);
document.getElementById("menu-logout-btn").addEventListener("click", logout);

window.onload = () => {
  // Username label node
  const usernameLabelNode = document.getElementById("username-lbl");

  const username = getLoggedInUser().username;
  handleValue(
    usernameLabelNode,
    usernameLabelNode,
    username.toUpperCase(),
    "Unknown"
  );
};
