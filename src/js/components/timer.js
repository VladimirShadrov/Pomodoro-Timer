import { timerConfig } from '../data/data';
import { getItemFromStorage } from '../helpers/helpers';
import { getObjectFromStorage } from '../helpers/helpers';

export let interval;

export class Timer {
  constructor(el) {
    this.el = el;
    this.startButton = this.el.querySelector('.timer__button');
    this.minutes = this.el.querySelector('.timer__minute');
    this.separator = this.el.querySelector('.timer__separator');
    this.seconds = this.el.querySelector('.timer__seconds');
    this.minutesValueForPause;
    this.secondsValueForPause;
    this.userSettings;
    this.minutesValue;
    this.secondsValue;

    this.init();
    this.addHoverEffectToStartButton();
    this.removeHoverEffectFromButton();
  }

  init() {
    this.el.addEventListener('click', controlTheTimer.bind(this));
  }

  getTimeValueForPause(item) {
    const time = parseInt(item.textContent);
    return time;
  }

  getTimeValueForTimer() {
    const userSettings = getObjectFromStorage('userSettings') || thimerConfig;
    const activeTab = getItemFromStorage('activeMenuItem');
    let result;

    switch (activeTab) {
      case 'pomodoro':
        result = parseInt(userSettings.pomodoroTime);
        break;
      case 'short break':
        result = parseInt(userSettings.shortBreak);
        break;
      case 'long break':
        result = parseInt(userSettings.longBreak);
    }

    return result;
  }

  getTimerTimeWhenSwichingTabs() {
    const activeTab = localStorage.getItem('activeMenuItem');

    if (activeTab) {
      return;
    } else {
      this.minutesValue = this.getTimeValueForTimer();
      this.secondsValue = 0;
    }
  }

  addHoverEffectToStartButton() {
    this.startButton.addEventListener('mouseenter', (event) => {
      const settings = getObjectFromStorage('userSettings') || timerConfig;

      if (event.target.classList.contains('timer__button')) {
        this.startButton.style.color = settings.color;
      }
    });
  }

  removeHoverEffectFromButton() {
    this.startButton.addEventListener('mouseleave', (event) => {
      if (event.target.classList.contains('timer__button')) {
        this.startButton.style.color = 'rgba(215, 224, 255, 1)';
      }
    });
  }

  writeTimerValue() {
    this.minutes = this.el.querySelector('.timer__minute');
    this.seconds = this.el.querySelector('.timer__seconds');
    this.runSeparator();

    this.secondsValue--;

    if (this.secondsValue === -1) {
      this.secondsValue = 59;
    }

    if (this.secondsValue === 59) {
      this.minutesValue--;
    }

    this.seconds.textContent = this.secondsValue;
    if (this.secondsValue < 10) {
      this.seconds.textContent = `0${this.secondsValue}`;
    }
    this.minutes.textContent = this.minutesValue;

    if (this.minutesValue < 10) {
      this.minutes.textContent = `0${this.minutesValue}`;
    }

    if (this.minutesValue === 0 && this.secondsValue === 0) {
      clearInterval(interval);
      this.startButton.textContent = 'restart';
      this.playSound();
      this.stopSeparator();
    }
  }

  startTimer() {
    interval = setInterval(this.writeTimerValue.bind(this), 1000);
  }

  pauseTimer() {
    this.minutesValueForPause = this.minutes.textContent;
    this.secondsValueForPause = this.seconds.textContent;
    this.startButton.dataset.id = 'pause';
  }

  playSound() {
    const audio = new Audio();
    audio.src = '../sound/timer-end.mp3';
    audio.play();
  }

  runSeparator() {
    this.separator = this.el.querySelector('.timer__separator');
    this.separator.classList.toggle('timer__separator-transparent');
  }

  stopSeparator() {
    this.separator = this.el.querySelector('.timer__separator');
    this.separator.classList.remove('timer__separator-transparent');
  }
}

function controlTheTimer(event) {
  event.preventDefault();

  if (
    (event.target.classList.contains('timer__button') &&
      event.target.textContent.toLowerCase() === 'start') ||
    event.target.textContent === 'restart'
  ) {
    this.minutesValue = this.getTimeValueForTimer();
    this.secondsValue = 0;
    this.startTimer();
    setTimeout(() => (this.startButton.textContent = 'pause'), 10);
  }

  if (event.target.dataset.id === 'pause') {
    this.minutesValue = parseInt(this.minutesValueForPause);
    this.secondsValue = parseInt(this.secondsValueForPause);
    setTimeout(() => {
      this.startButton.removeAttribute('data-id');
      this.startTimer();
    }, 0);
  }

  if (
    event.target.classList.contains('timer__button') &&
    event.target.textContent.toLowerCase() === 'pause'
  ) {
    clearInterval(interval);
    this.pauseTimer();
    this.stopSeparator();
  }
}
