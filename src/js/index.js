import '../styles/styles.scss';
import '../styles/header.scss';
import '../styles/timer.scss';
import '../styles/settings.scss';
import { Menu } from './components/menu';
import { Settings } from './components/settings';

// import { saveMenuItem } from './data';

// Перенос изображений в папку Dist
require.context('../images', true, /\.(png|jpg|svg|gif)$/);

const menu = document.querySelector('.menu');
const settings = document.querySelector('.settings');

new Menu(menu);
new Settings(settings);
