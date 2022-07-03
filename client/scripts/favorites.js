import { getLoggedInUser, getUserbase, setLoggedInUser } from "./session.js";
import { setElementContent, getData, handleValue } from "./functions.js";
import { API_URL } from "../config/config.js";

const getFavorites = () => {
  const user = getLoggedInUser();
  let favorites = user.favorites;
  if (!Array.isArray(favorites)) {
    favorites = [];
  }
  return favorites;
};

const addToFavorites = (bookid) => {
  const loggedInUser = getLoggedInUser();
  const userbase = getUserbase();

  if (bookAlreadyInFavorites(bookid)) {
    return;
  }
  //  Add changes to localStorage
  const updatedUserbase = userbase.map((user) => {
    if (user.username === loggedInUser.username) {
      user.favorites.push(bookid);
      setLoggedInUser(user);
    }
    return user;
  });

  localStorage.userbase = JSON.stringify(updatedUserbase);
  document.location.href = "../pages/favorites.html";
};

const bookAlreadyInFavorites = (bookid) => {
  const currentFavorites = getFavorites();
  for (let favoriteID of currentFavorites) {
    if (favoriteID === bookid) {
      return true;
    }
  }
  return false;
};

const removeFromFavorites = (bookidToRemove) => {
  const loggedInUser = getLoggedInUser();
  const userbase = getUserbase();

  //  Add changes to localStorage
  const updatedUserbase = userbase.map((user) => {
    if (user.username === loggedInUser.username) {
      const updatedUserFavorites = user.favorites.filter(
        (favoriteID) => favoriteID !== bookidToRemove
      );
      user.favorites = updatedUserFavorites;
      setLoggedInUser(user);
    }
    return user;
  });

  localStorage.userbase = JSON.stringify(updatedUserbase);
  document.location.href = "../pages/favorites.html";
};

const clearFavorites = () => {
  const loggedInUser = getLoggedInUser();
  const userbase = getUserbase();

  //  Add changes to localStorage
  const updatedUserbase = userbase.map((user) => {
    if (user.username === loggedInUser.username) {
      user.favorites = [];
      setLoggedInUser(user);
    }
    return user;
  });

  localStorage.userbase = JSON.stringify(updatedUserbase);
};

const getBooks = async (favorites) => {
  try {
    let resultArray = [];
    for (let favItemID of favorites) {
      let book = await getBook(favItemID);
      const { imageLinks, title } = book?.volumeInfo;
      resultArray.push({
        id: favItemID,
        title: title,
        thumbnail: imageLinks?.thumbnail,
      });
    }
    return resultArray;
  } catch (e) {
    console.error("Unable to fetch all books " + e);
  }
};

const displayFavorites = async () => {
  const favorites = getFavorites();
  let books = await getBooks(favorites);

  const favAreaNode = document.getElementById("fav-area");

  if (!favorites || favorites.length === 0) {
    const itemNode = document.createElement("div");
    itemNode.classList.add("fav-item");
    setElementContent(itemNode, "No Favorites");
    favAreaNode.appendChild(itemNode);

    return;
  }

  for (let book of books) {
    const { id, title, thumbnail } = book;
    const itemNode = document.createElement("div");
    itemNode.classList.add("fav-item");

    const link = document.createElement("a");
    link.setAttribute("href", "../pages/book.html?id=" + book.id);

    const entryNode = document.createElement("div");
    entryNode.classList.add("category-books-entry");

    const coverNode = document.createElement("img");
    coverNode.classList.add("entry-cover");
    handleValue(coverNode, thumbnail, thumbnail, "");

    const titleNode = document.createElement("h4");
    titleNode.classList.add("entry-name", "center-content");
    handleValue(titleNode, title, title, "Unknown");

    const btnNode = document.createElement("button");
    btnNode.classList.add("unfavorite-btn", "btn", "btn-primary");
    handleValue(btnNode, btnNode, "Unfavorite");

    const handleClick = () => {
      removeFromFavorites(id);
    };
    btnNode.addEventListener("click", handleClick);

    entryNode.appendChild(coverNode);
    entryNode.appendChild(titleNode);
    link.appendChild(entryNode);
    itemNode.appendChild(link);
    itemNode.appendChild(btnNode);
    favAreaNode.appendChild(itemNode);
  }
};

const getBook = async (id) => {
  try {
    const book = await getData(API_URL + "/" + id);
    return book;
  } catch (e) {
    console.error("Book not found " + e);
  }
};

if (window.location.pathname === "/pages/favorites.html") {
  displayFavorites();
}

export { bookAlreadyInFavorites, addToFavorites, removeFromFavorites };
