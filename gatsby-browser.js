export const onClientEntry = () => {
  const theme = localStorage.getItem('devterms-theme') || 'dark'
  document.documentElement.setAttribute('data-theme', theme)
}
