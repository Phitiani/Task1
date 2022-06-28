// Send GET request with a url
const getData = async (url) => {
  try {
    const jsonData = await fetch(url);
    const data = await jsonData.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

// Set DOM element content
const setElementContent = (element, content) => {
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
const convertToQuery = (name) => name.toLowerCase().replace(" ", "+");

//Exports
export { getData, setElementContent, removeItem, convertToQuery };
