// Zet het thema vóór de eerste paint, zodat er geen flits van het verkeerde thema is.
// Bewust een los bestand (geen inline script), zodat de CSP script-src 'self' kan blijven.
;(function () {
  var theme = 'dark'
  try {
    var stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      theme = stored
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      theme = 'light'
    }
  } catch {
    // localStorage geblokkeerd: val terug op het donkere standaardthema.
  }
  document.documentElement.dataset.theme = theme
})()
