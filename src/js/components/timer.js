import { timerConfig } from '../data/data';
import { getObjectFromStorage } from '../helpers/helpers';

export class Timer {
  constructor(el) {
    this.el = el;
    this.startButton = this.el.querySelector('.timer__button');

    this.init();
    this.addHoverEffectToStartButton();
    this.removeHoverEffectFromButton();
  }

  init() {
    this.el.addEventListener('click', controlTheTimer.bind(this));
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
}

function controlTheTimer(event) {
  event.preventDefault();

  if (event.target.classList.contains('timer__button')) {
    this.startButton.textContent = 'pause';
  }
}
