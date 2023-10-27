export const API_BASE_URL = "https://www.boredapi.com/api/activity";

export const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export const checkIfDuplicateAvailable = (array, obj, keyToCheck) => {
  const availableObjIndex = array.findIndex(
    (itemObj) => itemObj[keyToCheck] === obj[keyToCheck]
  );
  if (availableObjIndex !== -1) {
    return true;
  }
  return false;
};

export const sortByPrice = (array) => {
  return [...array].sort((a, b) => a.price - b.price);
};
