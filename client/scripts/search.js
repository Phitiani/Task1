import {
  getData,
  convertToQuery,
  setElementContent,
  handleValue,
} from "./functions.js";
import { API_URL } from "../config/config.js";

const mainSearchBarNode = document.getElementById("main-search-bar");
const menuSearchBarNode = document.getElementById("menu-search");
const mainResultsNode = document.getElementById("search-results");
const menuResultsNode = document.getElementById("menu-search-results");

const getSearchResults = async (resultsNode, searchInput) => {
  try {
    const searchQuery = convertToQuery(searchInput);
    resultsNode.classList.remove("hidden");

    const searchResults = await getData(
      `${API_URL}?q=${searchQuery}&maxResults=4`
    );

    return searchResults;
  } catch (e) {
    console.error("Unable to get search query results" + e);
  }
};

const displaySearchResults = async (searchInput, searchNode, resultsNode) => {
  try {
    const results = await getSearchResults(resultsNode, searchInput);
    clearSearchResults(resultsNode);
    for (let index = 0; index < 4; index++) {
      const resultID = results?.items[0]?.id;
      const { title, publishedDate, authors, imageLinks } =
        results?.items[index]?.volumeInfo;

      const publishedYear = new Date(publishedDate);

      const resultLink = document.createElement("a");
      resultLink.setAttribute("href", "../pages/book.html?id=" + resultID);
      resultLink.classList.add("search-result-link");

      const resultNode = document.createElement("div");
      resultNode.classList.add("search-result");
      resultNode.setAttribute("id", `search-result-${index + 1}`);

      const resultImageNode = document.createElement("img");
      resultImageNode.classList.add("result-img");
      resultImageNode.setAttribute("src", "");
      resultImageNode.setAttribute("id", `result-img-${index + 1}`);
      setElementContent(resultImageNode, imageLinks?.thumbnail ?? "");

      const resultInfoNode = document.createElement("h5");
      resultInfoNode.classList.add("result-info");
      resultInfoNode.setAttribute("id", `result-info-${index + 1}`);

      const resultTitleNode = document.createElement("span");
      resultTitleNode.setAttribute("id", `result-title-${index + 1}`);
      handleValue(resultTitleNode, title, title, "Unknown");

      const resultYearNode = document.createElement("span");
      resultYearNode.setAttribute("id", `result-year-${index + 1}`);

      if (!isNaN(publishedYear)) {
        handleValue(
          resultYearNode,
          publishedYear,
          ` (${publishedYear.getFullYear()})`,
          " (Unknown) "
        );
      } else {
        setElementContent(resultYearNode, " (Unknown) ");
      }

      const resultAuthorNode = document.createElement("span");
      resultAuthorNode.setAttribute("id", `result-author-${index + 1}`);
      handleValue(resultAuthorNode, authors, ` - ${authors}`, " - Unknown");

      //Display the results
      resultInfoNode.appendChild(resultTitleNode);
      resultInfoNode.appendChild(resultYearNode);
      resultInfoNode.appendChild(resultAuthorNode);

      resultNode.appendChild(resultImageNode);
      resultNode.appendChild(resultInfoNode);

      resultLink.appendChild(resultNode);

      resultsNode.appendChild(resultLink);
    }
  } catch (e) {
    console.error("Unable to display search results" + e);
  }
};

const clearSearchResults = (resultsNode) => {
  setElementContent(resultsNode, "");
};

const processSearchInput = (e, searchNode, resultsNode) => {
  let searchInput = e.target.value;
  let nodeID = searchNode.id;
  if (nodeID === "menu-search") {
    mainSearchBarNode.value = searchInput;
  } else if (nodeID === "main-search-bar") {
    menuSearchBarNode.value = searchInput;
  }
  clearSearchResults(resultsNode);
  if (searchInput !== "") {
    displaySearchResults(searchInput, searchNode, resultsNode);
  } else {
    resultsNode.classList.add("hidden");
  }
};

mainSearchBarNode.addEventListener("input", (e) =>
  processSearchInput(e, mainSearchBarNode, mainResultsNode)
);
menuSearchBarNode.addEventListener("input", (e) =>
  processSearchInput(e, menuSearchBarNode, menuResultsNode)
);
