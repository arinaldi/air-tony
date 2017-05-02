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
  const history = localStorage.getItem('airTony');
  if (history) {
    return JSON.parse(history);
  }
  localStorage.setItem('airTony', '');
  return [];
}

export function saveToHistory(newLocation) {
  const currentHistory = getHistory();
  const newHistory = [...currentHistory];

  if (currentHistory.length === 5) newHistory.pop();
  newHistory.unshift(newLocation);

  localStorage.setItem('airTony', JSON.stringify(newHistory));
}

export function formatDate(isoDate) {
  const date = new Date(isoDate);
  return {
    date: date.toDateString().substring(4),
    time: date.toLocaleTimeString(),
  };
}

export function changeStatusColor(status) {
  switch (status) {
    case 'success':
      return 'green';
    case 'error':
      return 'red';
    default:
      return 'black';
  }
}
