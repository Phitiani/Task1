import {
  getData,
  removeItem,
  convertToQuery,
  setElementContent,
} from "./scripts/functions.js";
import { API_URL, popularAuhtors, popularCategories } from "./config/config.js";

// Get random author from the popular authors array
const generateRandomAuthor = () => {
  const selectedAuthor =
    popularAuhtors[Math.floor(Math.random() * popularAuhtors.length)];
  return convertToQuery(selectedAuthor);
};

// Get random category from the popular categories array
const generateRandomCategory = (categories) => {
  const selectedCategory =
    categories[Math.floor(Math.random() * categories.length)];
  return [selectedCategory, convertToQuery(selectedCategory)];
};

// Get the current most featured book for an authors
const getFeaturedBook = async () => {
  const featuredAuthor = generateRandomAuthor();
  const featuredBook = await getData(
    `${API_URL}?q=inauthor:${featuredAuthor}&maxResults=1`
  );
  return featuredBook;
};

// Set the featured book data
const setFeaturedBook = async () => {
  const featuredBook = await getFeaturedBook();

  const featuredBookThumbnail = document.getElementById("featured-book-cover");
  const featuredBookTitle = document.getElementById("featured-book-title");
  const featuredBookDescription = document.getElementById(
    "featured-book-description"
  );
  const featuredBookAuthor = document.getElementById("featured-book-author");
  const featuredBookYear = document.getElementById("featured-book-year");
  const featuredBookCategories = document.getElementById(
    "featured-book-categories"
  );

  const { imageLinks, title, description, authors, categories, publishedDate } =
    featuredBook.items[0].volumeInfo;
  const publishedYear = new Date(publishedDate);

  setElementContent(featuredBookThumbnail, imageLinks.thumbnail);
  setElementContent(featuredBookTitle, title);
  setElementContent(featuredBookDescription, description);
  setElementContent(featuredBookAuthor, authors);
  setElementContent(featuredBookCategories, categories);
  setElementContent(featuredBookYear, publishedYear.getFullYear());
};

// Generate 4 random
const setCategories = async () => {
  let categories = popularCategories;
  for (let i = 0; i < 4; i++) {
    const [category, queryData] = generateRandomCategory(categories);
    categories = removeItem(categories, category);
    const categoryEntries = await getData(
      `${API_URL}?q=${queryData}&maxResults=10&orderBy=relevance`
    );
    displayCategory(i, category, categoryEntries);
  }
};

// Set the featured book data
const displayCategory = async (index, category, entries) => {
  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("book-category");
  categoryContainer.setAttribute("id", `book-category-${index + 1}`);

  const categoryHeader = document.createElement("div");
  categoryHeader.classList.add("book-category-header");

  const categoryTitle = document.createElement("div");
  categoryTitle.classList.add("category-title");
  setElementContent(categoryTitle, category);

  const categoryBtn = document.createElement("button");
  categoryBtn.classList.add("btn", "btn-primary", "category-btn");
  categoryBtn.setAttribute("id", `category-btn-${index + 1}`);
  setElementContent(categoryBtn, "View More");

  document.getElementById("book-area").appendChild(categoryContainer);
  categoryContainer.appendChild(categoryHeader);
  categoryHeader.appendChild(categoryTitle);
  categoryHeader.appendChild(categoryBtn);

  const booksDiv = document.createElement("div");
  booksDiv.classList.add("category-books");

  for (let entry of entries.items) {
    const { imageLinks, title } = entry.volumeInfo;
    const entryID = entry.id;

    const link = document.createElement("a");
    link.setAttribute("href", "./pages/book.html?id=" + entryID);

    const book = document.createElement("div");
    book.classList.add("category-books-entry");

    const cover = document.createElement("img");
    cover.classList.add("entry-cover");
    setElementContent(cover, imageLinks.thumbnail);

    const name = document.createElement("h4");
    name.classList.add("entry-name", "center-content");
    setElementContent(name, title);

    book.appendChild(cover);
    book.appendChild(name);
    link.appendChild(book);
    booksDiv.appendChild(link);
    document.getElementById(`book-category-${index + 1}`).appendChild(booksDiv);
  }
};

setFeaturedBook();
setCategories();
