document.addEventListener('DOMContentLoaded', () => {
  for (const switcher of document.getElementsByClassName('language-switcher')) {
    const control = switcher.querySelector('[aria-haspopup]');
    control.addEventListener('click', event => {
      const popupId = control.getAttribute('aria-controls');
      if (! popupId) return;
      const popup = document.getElementById(popupId);
      if (! popup) return;
      if (control.getAttribute('aria-expanded') === 'true') {
        control.setAttribute('aria-expanded', 'false');
        popup.setAttribute('aria-hidden', 'true');
      } else {
        control.setAttribute('aria-expanded', 'true');
        popup.setAttribute('aria-hidden', 'false');

      }
    });
  }
});
