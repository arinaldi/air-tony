export function localStorageTest() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (error) {
    return false;
  }
}

export function getHistory() {
  const item = localStorage.getItem("airTony");
  const arrayOfObjects = JSON.parse(item);
  return arrayOfObjects;
}

export function saveToHistory(newLocation) {
  const currentHistory = getHistory();
  let newHistory = [...currentHistory];

  if (currentHistory.length === 5) newHistory.pop();
  newHistory.unshift(newLocation);
  
  localStorage.setItem("airTony", JSON.stringify(newHistory));
}

export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const newDate = {
    date: date.toDateString().substring(4),
    time: date.toLocaleTimeString()
  };
  return newDate;
}
