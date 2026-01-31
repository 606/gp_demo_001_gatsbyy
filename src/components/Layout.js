import * as React from "react"
import { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import "../styles/global.css"
import terms from "../data/terms.json"

const THEMES = [
  { id: "dark", icon: "🌙" },
  { id: "light", icon: "☀️" },
  { id: "ocean", icon: "🌊" },
  { id: "sunset", icon: "🌅" },
  { id: "forest", icon: "🌲" },
]

const CATEGORIES = [
  { id: "all", label: "All Terms", icon: "📚" },
  { id: "architecture", label: "Architecture", icon: "🏗️" },
  { id: "devops", label: "DevOps", icon: "🔄" },
  { id: "tools", label: "Tools", icon: "🛠️" },
  { id: "database", label: "Database", icon: "🗄️" },
  { id: "principles", label: "Principles", icon: "📐" },
  { id: "frontend", label: "Frontend", icon: "🎨" },
]

const Layout = ({ children, activeCategory = "all", onCategoryChange, onSearch, searchValue = "" }) => {
  const [theme, setTheme] = useState("dark")
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  const getCategoryCount = (catId) => {
    if (catId === "all") return terms.length
    return terms.filter(t => t.category === catId).length
  }

  const handleCategoryClick = (catId) => {
    if (onCategoryChange) {
      onCategoryChange(catId)
    } else {
      navigate(`/?category=${catId}`)
    }
    setSidebarOpen(false)
  }

  return (
    <div className="app-layout">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="logo">
            <div className="logo-icon">{"</>"}</div>
            <div>
              <div className="logo-text">DevTerms</div>
              <div className="logo-badge">v1.0</div>
            </div>
          </Link>
        </div>

        <div className="sidebar-search">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search terms..."
              value={searchValue}
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-title">Categories</div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`nav-item ${activeCategory === cat.id ? 'active' : ''} ${cat.id !== 'all' ? `cat-${cat.id}` : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.id !== 'all' ? (
                  <span className="cat-dot" />
                ) : (
                  <span className="nav-icon">{cat.icon}</span>
                )}
                <span>{cat.label}</span>
                <span className="nav-count">{getCategoryCount(cat.id)}</span>
              </button>
            ))}
          </div>
        </nav>

        {mounted && (
          <div className="sidebar-footer">
            <div className="theme-label">Theme</div>
            <div className="theme-switcher">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  className={`theme-btn ${theme === t.id ? "active" : ""}`}
                  onClick={() => handleThemeChange(t.id)}
                  title={t.id}
                >
                  {t.icon}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>

      <button
        className="mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>
    </div>
  )
}

export default Layout
