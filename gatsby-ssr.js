import * as React from "react"

const ThemeScript = () => {
  const codeToRunOnClient = `
    (function() {
      const theme = localStorage.getItem('devterms-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    })();
  `
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ThemeScript key="theme-script" />)
}
