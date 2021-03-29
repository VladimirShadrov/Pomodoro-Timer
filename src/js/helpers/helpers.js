export function setItemToStorage(key, item) {
  localStorage.setItem(key, item);
}

export function getItemFromStorage(key) {
  const item = localStorage.getItem(key);

  return item;
}

export function setObjectToStorage(key, object) {
  localStorage.setItem(key, JSON.stringify(object));
}

export function getObjectFromStorage(key) {
  const item = JSON.parse(localStorage.getItem(key));

  return item;
}
