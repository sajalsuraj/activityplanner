export const API_BASE_URL = "https://www.boredapi.com/api/activity";

// Returns a boolean value when a duplicate entry found in an array
export const checkIfDuplicateAvailable = (array, obj, keyToCheck) => {
  const availableObjIndex = array.findIndex(
    (itemObj) => itemObj[keyToCheck] === obj[keyToCheck]
  );
  if (availableObjIndex !== -1) {
    return true;
  }
  return false;
};

// Sorting in ascending order based on price
export const sortByPrice = (array) => {
  return [...array].sort((a, b) => a.price - b.price);
};
