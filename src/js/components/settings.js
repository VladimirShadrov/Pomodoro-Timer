import { timerConfig } from '../data/data';
import { setObjectToStorage } from '../helpers/helpers';
import { getObjectFromStorage } from '../helpers/helpers';
import { writeTimerTime } from '../helpers/helpers';

export class Settings {
  constructor(el) {
    this.el = el;
    this.overlay = this.el.querySelector('.overlay');
    this.settingsModal = this.el.querySelector('.modal');
    this.setObjectToStorage = setObjectToStorage;
    this.getObjectFromStorage = getObjectFromStorage;
    this.timerTime = document.querySelector('.timer__time');
    this.settingsColors = Array.from(
      this.el.querySelectorAll('.modal__color-item')
    );
    this.settingsFonts = Array.from(
      this.el.querySelectorAll('.modal__font-item')
    );
    this.settingsTextFields = this.el.querySelectorAll('.modal__time-value');
    this.defaultSettings = timerConfig;
    this.userSettings;

    this.init();
    this.setActiveClassFontOrColorIcon(
      '.modal__font-item',
      'modal__font-item-active'
    );
    this.setActiveClassFontOrColorIcon(
      '.modal__color-item',
      'modal__color-item-active'
    );
    this.inputValidator();
    this.setStylesToTimer();
    this.installSettingsFromStorage();
  }

  init() {
    this.el.addEventListener('click', settingsClickHendler.bind(this));
  }

  showSettingsWindow() {
    this.overlay.style.zIndex = '10';
    this.settingsModal.classList.remove('modal-hide');
  }

  hideSettingsWindow() {
    this.settingsModal.classList.add('modal-hide');
    setTimeout(() => (this.overlay.style.zIndex = '-1'), 300);
  }

  getUserSettings() {
    const timerInputsValue = this.getTimerInputValue();
    const activeFont = this.getFontOrColor('.modal__font-item-active');
    const activeColor = this.getFontOrColor('.modal__color-item-active');

    const newSettings = {
      font: activeFont,
      color: activeColor,
      pomodoroTime: timerInputsValue.pomodoroTime,
      shortBreak: timerInputsValue.shortBreak,
      longBreak: timerInputsValue.longBreak,
    };

    this.setObjectToStorage('userSettings', newSettings);

    return newSettings;
  }

  setActiveClassFontOrColorIcon(selector, activeSelector) {
    const items = document.querySelectorAll(selector);

    items.forEach((fontItem) => {
      fontItem.addEventListener('click', (event) => {
        items.forEach((font) => font.classList.remove(activeSelector));
        event.target.classList.add(activeSelector);
      });
    });
  }

  getFontOrColor(activeSelector) {
    const item = document.querySelector(activeSelector);
    let result = item.dataset.id;

    return result;
  }

  changeTimerInputValue(target) {
    const input = target.parentElement.firstElementChild;
    let currentTime = +input.value;

    if (target.dataset.id === 'increase' && currentTime < 99) {
      input.value = ++currentTime;
    }

    if (target.dataset.id === 'reduce' && currentTime > 1) {
      input.value = --currentTime;
    }
  }

  getTimerInputValue() {
    const inputFields = Array.from(
      this.el.querySelectorAll('.modal__time-value')
    );
    const pomodoro =
      inputFields.find((input) => input.dataset.name === 'pomodoro') ||
      this.defaultSettings.pomodoroTime;
    const short =
      inputFields.find((input) => input.dataset.name === 'short break') ||
      this.defaultSettings.shortBreak;
    const long =
      inputFields.find((input) => input.dataset.name === 'long break') ||
      this.defaultSettings.longBreak;

    return {
      pomodoroTime: pomodoro.value,
      shortBreak: short.value,
      longBreak: long.value,
    };
  }

  inputValidator() {
    const inputs = document.querySelectorAll('.modal__time-value');

    inputs.forEach((input) => {
      input.addEventListener('change', () => {
        input.value = input.value.replace(/[^\d.]/g, '');

        if (input.value > 99) {
          input.value = 99;
        }

        if (input.value < 1) {
          input.value = 1;
        }
      });
    });
  }

  setStylesToTimer() {
    this.setFont();
    this.setColor();
    this.writeTimeToTimer();
  }

  setFont() {
    const settingsFromStorage =
      this.getObjectFromStorage('userSettings') || this.defaultSettings;
    const font = settingsFromStorage.font;

    switch (font) {
      case "'Kumbh Sans', sans-serif":
        this.timerTime.style.letterSpacing = '-5px';
        this.timerTime.style.lineHeight = '100.59px';
        break;
      case "'Roboto Slab', serif":
        this.timerTime.style.letterSpacing = '0';
        this.timerTime.style.lineHeight = '131.88px';

        break;
      case "'Space Mono', monospace":
        this.timerTime.style.letterSpacing = '-10px';
        this.timerTime.style.lineHeight = '148.1px';

        break;
    }

    document.body.style.fontFamily = font;
  }

  setColor() {
    const currentSettings =
      this.getObjectFromStorage('userSettings') || this.defaultSettings;
    const color = currentSettings.color;
    const activeMenuItem = document.querySelector('.menu__link-active');
    const progressBar = document.querySelector('.timer__progress-bar');

    activeMenuItem.style.backgroundColor = color;
    progressBar.style.stroke = color;
  }

  writeTimeToTimer() {
    const settingsFromStorage =
      this.getObjectFromStorage('userSettings') || this.defaultSettings;

    writeTimerTime(this.timerTime, settingsFromStorage, this.defaultSettings);
  }

  installSettingsFromStorage() {
    const settings =
      this.getObjectFromStorage('userSettings') || this.defaultSettings;

    const activeColor = this.settingsColors.find(
      (color) => color.dataset.id === settings.color
    );
    const activeFont = this.settingsFonts.find(
      (font) => font.dataset.id === settings.font
    );

    this.settingsColors.forEach((color) =>
      color.classList.remove('modal__color-item-active')
    );
    activeColor.classList.add('modal__color-item-active');

    this.settingsFonts.forEach((font) =>
      font.classList.remove('modal__font-item-active')
    );
    activeFont.classList.add('modal__font-item-active');

    this.settingsTextFields.forEach((input) => {
      if (input.dataset.name === 'pomodoro') {
        input.value = settings.pomodoroTime;
      } else if (input.dataset.name === 'short break') {
        input.value = settings.shortBreak;
      } else {
        input.value = settings.longBreak;
      }
    });
  }
}

function settingsClickHendler(event) {
  event.preventDefault();

  if (event.target.classList.contains('settings__settings-link')) {
    this.showSettingsWindow();
  }

  if (
    event.target.dataset.id === 'close-settings' ||
    event.target.classList.contains('overlay')
  ) {
    this.hideSettingsWindow();
  }

  if (
    event.target.dataset.id === 'increase' ||
    event.target.dataset.id === 'reduce'
  ) {
    this.changeTimerInputValue(event.target);
  }

  if (event.target.classList.contains('modal__button')) {
    this.userSettings = this.getUserSettings();
    this.getUserSettings();
    this.hideSettingsWindow();
    this.setStylesToTimer();
  }
}
