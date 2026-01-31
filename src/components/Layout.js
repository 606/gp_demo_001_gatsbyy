import * as React from "react"
import { useState, useEffect, useMemo } from "react"
import { Link } from "gatsby"
import "../styles/global.css"
import termsData from "../data/terms-compiled.json"

const THEMES = [
  { id: "dark", icon: "🌙" },
  { id: "light", icon: "☀️" },
  { id: "ocean", icon: "🌊" },
  { id: "sunset", icon: "🌅" },
  { id: "forest", icon: "🌲" },
]

const Layout = ({ children, activeCategory = "all", activeTerm = null, onCategoryChange, onSearch, searchValue = "" }) => {
  const [theme, setTheme] = useState("dark")
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})

  const { categories, terms } = termsData

  // Group terms by category
  const termsByCategory = useMemo(() => {
    const grouped = {}
    categories.forEach(cat => {
      grouped[cat.id] = terms.filter(t => t.category === cat.id)
    })
    return grouped
  }, [categories, terms])

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("devterms-theme") || "dark"
    setTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)

    // Expand active category by default
    if (activeCategory && activeCategory !== "all") {
      setExpandedCategories(prev => ({ ...prev, [activeCategory]: true }))
    }
  }, [activeCategory])

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem("devterms-theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }))
  }

  const handleCategoryClick = (catId, e) => {
    e.stopPropagation()
    if (onCategoryChange) {
      onCategoryChange(catId)
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
          {/* All Terms */}
          <div className="nav-section">
            <button
              className={`nav-item nav-item-main ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={(e) => handleCategoryClick('all', e)}
            >
              <span className="nav-icon">📚</span>
              <span>All Terms</span>
              <span className="nav-count">{terms.length}</span>
            </button>
          </div>

          {/* Categories Tree */}
          <div className="nav-section">
            <div className="nav-title">Categories</div>

            {categories.map((cat) => {
              const catTerms = termsByCategory[cat.id] || []
              const isExpanded = expandedCategories[cat.id]
              const isActive = activeCategory === cat.id

              return (
                <div key={cat.id} className="tree-item">
                  <button
                    className={`nav-item tree-parent ${isActive ? 'active' : ''}`}
                    onClick={() => toggleCategory(cat.id)}
                  >
                    <span className={`tree-arrow ${isExpanded ? 'expanded' : ''}`}>
                      ▶
                    </span>
                    <span
                      className="cat-dot"
                      style={{ background: cat.color }}
                    />
                    <span
                      className="nav-label"
                      onClick={(e) => handleCategoryClick(cat.id, e)}
                    >
                      {cat.name}
                    </span>
                    <span className="nav-count">{catTerms.length}</span>
                  </button>

                  {isExpanded && catTerms.length > 0 && (
                    <div className="tree-children">
                      {catTerms.map((term) => (
                        <Link
                          key={term.id}
                          to={`/term/${term.id}`}
                          className={`nav-item tree-child ${activeTerm === term.id ? 'active' : ''}`}
                        >
                          <span className="tree-line" />
                          <span className="term-label">{term.term}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
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
