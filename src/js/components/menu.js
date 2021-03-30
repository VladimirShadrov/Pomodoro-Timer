import { setItemToStorage } from '../helpers/helpers';
import { getItemFromStorage } from '../helpers/helpers';
import { timerConfig } from '../data/data';
import { getObjectFromStorage } from '../helpers/helpers';
import { writeTimerTime } from '../helpers/helpers';

export class Menu {
  constructor(el) {
    this.el = el;
    this.menuItems = Array.from(this.el.querySelectorAll('.menu__link'));
    this.setItemToStorage = setItemToStorage;
    this.getItemFromStorage = getItemFromStorage;
    this.defaultSettings = timerConfig;
    this.userSettings = getObjectFromStorage;
    this.timerTime = document.querySelector('.timer__time');

    this.init();
    this.setMenuItemClassActive();
  }

  init() {
    this.menuItems.forEach((item) => {
      item.addEventListener('click', menuItemclickHendler.bind(this));
    });
  }

  setMenuItemClassActive() {
    const userSettings =
      this.userSettings('userSettings') || this.defaultSettings;
    const itemFromStorage = this.getItemFromStorage('activeMenuItem');
    const activeMenuItem =
      this.menuItems.find((item) => item.dataset.id === itemFromStorage) ||
      this.menuItems[0];

    this.menuItems.forEach((menuItem) => {
      menuItem.classList.remove('menu__link-active');
      menuItem.style.backgroundColor = 'transparent';
    });

    activeMenuItem.classList.add('menu__link-active');
    activeMenuItem.style.backgroundColor =
      userSettings.color || this.defaultSettings.color;
  }
}

function menuItemclickHendler(event) {
  event.preventDefault();
  const userSettings =
    this.userSettings('userSettings') || this.defaultSettings;

  if (event.target.classList.contains('menu__link')) {
    this.menuItems.forEach((item) => {
      item.classList.remove('menu__link-active');
      item.style.backgroundColor = 'transparent';
    });
    event.target.classList.add('menu__link-active');
    event.target.style.backgroundColor = userSettings.color;
    this.setItemToStorage('activeMenuItem', event.target.dataset.id);
    writeTimerTime(this.timerTime, userSettings, this.defaultSettings);
  }
}
