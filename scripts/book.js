import { getData, setElementContent } from "./functions.js";
import { API_URL } from "../config/config.js";

const getBook = async () => {
  //Add handling for no id provided
  const queryParams = new URLSearchParams(window.location.search);
  const { id } = Object.fromEntries(queryParams.entries());

  try {
    const book = await getData(API_URL + "/" + id);
    return book;
  } catch (e) {
    console.error("Book not found " + e);
  }
};

const setBook = async () => {
  try {
    const book = await getBook();

    const {
      authors,
      imageLinks,
      language,
      publishedDate,
      publisher,
      title,
      categories,
      averageRating,
      ratingsCount,
      description,
    } = book?.volumeInfo;

    const publishedYear = new Date(publishedDate);

    const coverNode = document.getElementById("b-book-cover");
    const titleNode = document.getElementById("book-title");
    const authorNode = document.getElementById("author-val");
    const publishedYearNode = document.getElementById("year-val");
    const categoriesNode = document.getElementById("categories-val");
    const publisherNode = document.getElementById("publisher-val");
    const languageNode = document.getElementById("language-val");
    const averageRatingNode = document.getElementById("average-rating-val");
    const ratingCountNode = document.getElementById("rating-count-val");
    const descriptionNode = document.getElementById("description-text-val");

    setElementContent(coverNode, imageLinks?.thumbnail ?? "");
    setElementContent(titleNode, title ?? "Unknown");
    setElementContent(authorNode, authors ?? "Unknown");
    setElementContent(categoriesNode, categories ?? "Unknown");
    setElementContent(publisherNode, publisher ?? "Unknown");
    setElementContent(languageNode, language ?? "Unknown");
    setElementContent(averageRatingNode, averageRating ?? "N/A");
    setElementContent(ratingCountNode, ratingsCount ?? "N/A");
    setElementContent(
      descriptionNode,
      description ?? "Description unavailable"
    );
    if (!isNaN(publishedYear))
      setElementContent(publishedYearNode, publishedYear.getFullYear());
    else setElementContent(publishedYearNode, "Unknown");
  } catch (e) {
    console.error("Unable to set book" + e);
  }
};

setBook();
