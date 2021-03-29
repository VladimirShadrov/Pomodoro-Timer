import '../styles/styles.scss';
import '../styles/header.scss';
import '../styles/timer.scss';
import '../styles/settings.scss';

// Перенос изображений в папку Dist
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
