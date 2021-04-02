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

function correctTime(parameter) {
  let value = parameter;
  let result;

  if (value < 10) {
    result = `0${value}`;
  } else {
    result = value;
  }

  return result;
}

export function writeTimerTime(timerValue, userSettings, defaultSettings) {
  const tabFromStorage = localStorage.getItem('activeMenuItem') || 'pomodoro';

  switch (tabFromStorage) {
    case 'pomodoro':
      timerValue.innerHTML = `
        <span class="timer__minute">${
          correctTime(userSettings.pomodoroTime) ||
          correctTime(defaultSettings.pomodoroTime)
        }</span>
        <span class="timer__separator">:</span>
        <span class="timer__seconds">00</span>
        `;

      break;
    case 'short break':
      timerValue.innerHTML = `
        <span class="timer__minute">${
          correctTime(userSettings.shortBreak) ||
          correctTime(defaultSettings.shortBreak)
        }</span>
        <span class="timer__separator">:</span>
        <span class="timer__seconds">00</span>    
      `;
      break;
    case 'long break':
      timerValue.innerHTML = `
        <span class="timer__minute">${
          correctTime(userSettings.longBreak) ||
          correctTime(defaultSettings.longBreak)
        }</span>
        <span class="timer__separator">:</span>
        <span class="timer__seconds">00</span>    
        `;
  }
}

export let timerCounter;
