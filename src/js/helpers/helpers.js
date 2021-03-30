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

export function writeTimerTime(timerValue, userSettings, defaultSettings) {
  const tabFromStorage = localStorage.getItem('activeMenuItem') || 'pomodoro';

  switch (tabFromStorage) {
    case 'pomodoro':
      timerValue.textContent =
        `${userSettings.pomodoroTime}:00` ||
        `${defaultSettings.pomodoroTime}:00`;
      break;
    case 'short break':
      timerValue.textContent =
        `${userSettings.shortBreak}:00` || `${defaultSettings.shortBreak}:00`;
      break;
    case 'long break':
      timerValue.textContent =
        `${userSettings.longBreak}:00` || `${defaultSettings.longBreak}:00`;
  }
}
