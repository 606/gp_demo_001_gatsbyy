import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from "gatsby"
import "../styles/global.css"

const THEMES = [
  { id: "dark", icon: "🌙", label: "Dark" },
  { id: "light", icon: "☀️", label: "Light" },
  { id: "ocean", icon: "🌊", label: "Ocean" },
  { id: "sunset", icon: "🌅", label: "Sunset" },
  { id: "forest", icon: "🌲", label: "Forest" },
]

const Layout = ({ children }) => {
  const [theme, setTheme] = useState("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("devterms-theme") || "dark"
    setTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)
  }, [])

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem("devterms-theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <span className="logo-icon">{"</>"}</span>
              <span>DevTerms</span>
            </Link>
            {mounted && (
              <div className="theme-switcher">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    className={`theme-btn ${theme === t.id ? "active" : ""}`}
                    onClick={() => handleThemeChange(t.id)}
                    title={t.label}
                    aria-label={`Switch to ${t.label} theme`}
                  >
                    {t.icon}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <p>DevTerms — Development Terminology Reference</p>
        </div>
      </footer>
    </>
  )
}

export default Layout
