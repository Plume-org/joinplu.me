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
