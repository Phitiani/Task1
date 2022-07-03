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

// Checks if value is not "undefined" and not "null"
const hasValue = (value) => value !== undefined && value != null;

//Handles output based on value
const handleValue = (node, value, outputIfValid, outputIfInvalid) => {
  if (hasValue(value)) {
    setElementContent(node, outputIfValid);
  } else {
    setElementContent(node, outputIfInvalid);
  }
};

//Exports
export { getData, setElementContent, removeItem, convertToQuery, handleValue };
