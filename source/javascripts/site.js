const instancesList = document.getElementById('instances')
if (instancesList) {
  fetch('/javascripts/instances.json')
    .then(r => r.json())
    .then(res => {
      for (const inst of res.instances) {
        const li = document.createElement('li')
        const link = document.createElement('a')
        link.href = inst.url
        link.title = inst.url
        link.appendChild(document.createTextNode(inst.name || inst.url))
        li.appendChild(link)
        if (inst.description) {
          li.appendChild(document.createTextNode(` — ${inst.description}`))
        }
        instancesList.appendChild(li)
      }
    })
    .catch(e => {
      instancesList.appendChild(document.createTextNode('Error retriving instances'))
    })
}

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
