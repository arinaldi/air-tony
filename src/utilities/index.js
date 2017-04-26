export function localStorageTest() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (error) {
    return false;
  }
}

export function getHistory() {
  const item = localStorage.getItem('airTony');
  return JSON.parse(item);
}

export function saveToHistory(newLocation) {
  const currentHistory = getHistory();
  let newHistory = [...currentHistory];

  if (currentHistory.length === 5) newHistory.pop();
  newHistory.unshift(newLocation);
  
  localStorage.setItem('airTony', JSON.stringify(newHistory));
}

export function formatDate(isoDate) {
  const date = new Date(isoDate);
  return {
    date: date.toDateString().substring(4),
    time: date.toLocaleTimeString()
  };
}
