import 'regenerator-runtime'; /* for async await transpile */
import '../styles/index.css';

// Import App
import App from './views/app';

// sw register
import swRegister from './utils/sw-register';

// lazy loading images
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('.menu-toggle'),
  drawer: document.querySelector('.app-bar__nav'),
  content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
