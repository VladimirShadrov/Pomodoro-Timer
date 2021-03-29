export class Settings {
  constructor(el) {
    this.el = el;
    this.overlay = this.el.querySelector('.overlay');
    this.settingsModal = this.el.querySelector('.modal');

    this.init();
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
}

function settingsClickHendler(event) {
  if (event.target.classList.contains('settings__settings-link')) {
    this.showSettingsWindow();
  }

  if (
    event.target.dataset.id === 'close-settings' ||
    event.target.classList.contains('overlay')
  ) {
    this.hideSettingsWindow();
  }
}
