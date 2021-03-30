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
      timerValue.innerHTML = `
        <span class="timer__minute">${
          userSettings.pomodoroTime || defaultSettings.pomodoroTime
        }</span>
        <span class="timer__separator">:</span>
        <span class="timer__seconds">00</span>
        `;
      break;
    case 'short break':
      timerValue.innerHTML = `
        <span class="timer__minute">${
          userSettings.shortBreak || defaultSettings.shortBreak
        }</span>
        <span class="timer__separator">:</span>
        <span class="timer__seconds">00</span>    
      `;
      break;
    case 'long break':
      timerValue.innerHTML = `
        <span class="timer__minute">${
          userSettings.longBreak || defaultSettings.longBreak
        }</span>
        <span class="timer__separator">:</span>
        <span class="timer__seconds">00</span>    
        `;
  }
}
