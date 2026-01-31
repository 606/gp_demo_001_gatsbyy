import * as React from "react"
import { useState, useEffect, useMemo } from "react"
import { Link, navigate } from "gatsby"
import "../styles/global.css"
import termsData from "../data/terms-compiled.json"

const THEMES = [
  { id: "dark", icon: "🌙" },
  { id: "light", icon: "☀️" },
  { id: "ocean", icon: "🌊" },
  { id: "sunset", icon: "🌅" },
  { id: "forest", icon: "🌲" },
]

const Layout = ({ children, activeTerm = null, activeTag = null, onTagChange, searchValue = "", onSearchChange }) => {
  const [theme, setTheme] = useState("dark")
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [localSearch, setLocalSearch] = useState(searchValue)

  const { tags, terms } = termsData

  // Filter terms by search in sidebar
  const filteredTerms = useMemo(() => {
    if (!localSearch) return terms
    const query = localSearch.toLowerCase()
    return terms.filter(t =>
      t.term.toLowerCase().includes(query) ||
      t.fullName?.toLowerCase().includes(query)
    )
  }, [terms, localSearch])

  // Sort terms alphabetically
  const sortedTerms = useMemo(() => {
    return [...filteredTerms].sort((a, b) => a.term.localeCompare(b.term))
  }, [filteredTerms])

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("devterms-theme") || "dark"
    setTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)
  }, [])

  // Sync external search value
  useEffect(() => {
    setLocalSearch(searchValue)
  }, [searchValue])

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem("devterms-theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const handleTagClick = (tagId) => {
    if (onTagChange) {
      onTagChange(tagId === activeTag ? null : tagId)
    } else {
      navigate(tagId === activeTag ? '/' : `/?tag=${tagId}`)
    }
    setSidebarOpen(false)
  }

  const handleSearchChange = (value) => {
    setLocalSearch(value)
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const handleTermClick = () => {
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
              <div className="logo-badge">{terms.length} terms</div>
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
              value={localSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        <nav className="sidebar-nav">
          {/* Tags Section */}
          <div className="nav-section">
            <div className="nav-title">Tags</div>
            <div className="tags-cloud">
              {tags.map((tag) => {
                const count = terms.filter(t => t.tags?.includes(tag.id)).length
                return (
                  <button
                    key={tag.id}
                    className={`tag-chip ${activeTag === tag.id ? 'active' : ''}`}
                    style={{ '--tag-color': tag.color }}
                    onClick={() => handleTagClick(tag.id)}
                  >
                    {tag.name}
                    <span className="tag-chip-count">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Terms Tree */}
          <div className="nav-section">
            <div className="nav-title">
              {localSearch ? `Results (${sortedTerms.length})` : `All Terms (${terms.length})`}
            </div>
            <div className="terms-tree">
              {sortedTerms.map((term) => (
                <Link
                  key={term.id}
                  to={`/term/${term.id}`}
                  className={`tree-node ${activeTerm === term.id ? 'active' : ''}`}
                  onClick={handleTermClick}
                >
                  <span className="tree-icon">📄</span>
                  <span className="tree-label">{term.term}</span>
                </Link>
              ))}
              {sortedTerms.length === 0 && (
                <div style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No terms found
                </div>
              )}
            </div>
          </div>
        </nav>

        {mounted && (
          <div className="sidebar-footer">
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
