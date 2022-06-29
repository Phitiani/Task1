// Send GET request with a url
const getData = async (url) => {
  try {
    const jsonData = await fetch(url);
    const data = await jsonData.json();
    return data;
  } catch (e) {
    console.error("Unable to execute GET request. " + e);
  }
};

/// Set the element content
const setElementContent = (element, content) => {
  if (!(element instanceof Element)) {
    console.error(element + " is not a DOM element");
    return;
  }
  if (element.nodeName === "IMG") {
    element.src = content;
  } else {
    element.innerHTML = content;
    element.classList.remove("loading-skeleton");
  }
};

// Remove item from array
const removeItem = (array, itemToRemove) => {
  return array.filter((item) => item !== itemToRemove);
};

// Convert a spaced author name into query format
const convertToQuery = (name) =>
  name?.toLowerCase().replace(" ", "+") ?? "random";

//Exports
export { getData, setElementContent, removeItem, convertToQuery };
