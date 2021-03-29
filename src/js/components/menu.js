import { setItemToStorage } from '../helpers/helpers';
import { getItemFromStorage } from '../helpers/helpers';

export class Menu {
  constructor(el) {
    this.el = el;
    this.menuItems = Array.from(this.el.querySelectorAll('.menu__link'));
    this.setItemToStorage = setItemToStorage;
    this.getItemFromStorage = getItemFromStorage;

    this.init();
    this.setMenuItemClassActive();
  }

  init() {
    this.menuItems.forEach((item) => {
      item.addEventListener('click', menuItemclickHendler.bind(this));
    });
  }

  setMenuItemClassActive() {
    const itemFromStorage = this.getItemFromStorage('activeMenuItem');
    const activeMenuItem = this.menuItems.find(
      (item) => item.dataset.id === itemFromStorage
    );

    this.menuItems.forEach((menuItem) => {
      menuItem.classList.remove('menu__link-active');
    });

    if (!activeMenuItem) {
      this.menuItems[0].classList.add('menu__link-active');
    } else {
      activeMenuItem.classList.add('menu__link-active');
    }
  }
}

function menuItemclickHendler(event) {
  if (event.target.classList.contains('menu__link')) {
    this.menuItems.forEach((item) =>
      item.classList.remove('menu__link-active')
    );
    event.target.classList.add('menu__link-active');
    this.setItemToStorage('activeMenuItem', event.target.dataset.id);
  }
}
