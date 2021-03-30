import '../styles/styles.scss';
import '../styles/header.scss';
import '../styles/timer.scss';
import '../styles/settings.scss';
import { Menu } from './components/menu';
import { Settings } from './components/settings';
import { Timer } from './components/timer';

// Перенос изображений в папку Dist
require.context('../images', true, /\.(png|jpg|svg|gif)$/);

const menu = document.querySelector('.menu');
const settings = document.querySelector('.settings');
const logo = document.querySelector('.logo');
const timer = document.querySelector('.timer');

new Menu(menu);
new Settings(settings);
new Timer(timer);

logo.addEventListener('click', function (event) {
  event.preventDefault();
});
