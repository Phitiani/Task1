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
