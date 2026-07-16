export function navegar(ruta) {
  window.history.pushState({}, '', ruta)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}
