const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true' || false;
      button.setAttribute('aria-expanded', !expanded);
      drawer.classList.toggle('open');
    });

    content.addEventListener('click', () => {
      drawer.classList.remove('open');
      button.setAttribute('aria-expanded', false);
    });
  },
};

export default DrawerInitiator;
