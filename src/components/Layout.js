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

const Layout = ({ children, activeTerm = null, activeTag = null, onTagChange, onSearch, searchValue = "" }) => {
  const [theme, setTheme] = useState("dark")
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedLetters, setExpandedLetters] = useState({})

  const { tags, terms } = termsData

  // Group terms by first letter
  const termsByLetter = useMemo(() => {
    const grouped = {}
    const filteredTerms = searchValue
      ? terms.filter(t =>
          t.term.toLowerCase().includes(searchValue.toLowerCase()) ||
          t.fullName?.toLowerCase().includes(searchValue.toLowerCase())
        )
      : terms

    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase()
      if (!grouped[letter]) {
        grouped[letter] = []
      }
      grouped[letter].push(term)
    })

    // Sort terms within each letter
    Object.keys(grouped).forEach(letter => {
      grouped[letter].sort((a, b) => a.term.localeCompare(b.term))
    })

    return grouped
  }, [terms, searchValue])

  const sortedLetters = useMemo(() => {
    return Object.keys(termsByLetter).sort()
  }, [termsByLetter])

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("devterms-theme") || "dark"
    setTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)

    // Expand letter of active term
    if (activeTerm) {
      const term = terms.find(t => t.id === activeTerm)
      if (term) {
        const letter = term.term[0].toUpperCase()
        setExpandedLetters(prev => ({ ...prev, [letter]: true }))
      }
    }
  }, [activeTerm, terms])

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem("devterms-theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const toggleLetter = (letter) => {
    setExpandedLetters(prev => ({
      ...prev,
      [letter]: !prev[letter]
    }))
  }

  const handleTagClick = (tagId) => {
    if (onTagChange) {
      onTagChange(tagId === activeTag ? null : tagId)
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
              value={searchValue}
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          </div>
        </div>

        <nav className="sidebar-nav">
          {/* All Terms Link */}
          <div className="nav-section">
            <Link
              to="/"
              className={`nav-item nav-item-main ${!activeTerm && !activeTag ? 'active' : ''}`}
            >
              <span className="nav-icon">📚</span>
              <span>All Terms</span>
              <span className="nav-count">{terms.length}</span>
            </Link>
          </div>

          {/* Terms A-Z */}
          <div className="nav-section">
            <div className="nav-title">Terms A-Z</div>

            {sortedLetters.map((letter) => {
              const letterTerms = termsByLetter[letter]
              const isExpanded = expandedLetters[letter]
              const hasActiveTerm = letterTerms.some(t => t.id === activeTerm)

              return (
                <div key={letter} className="tree-item">
                  <button
                    className={`nav-item tree-parent ${hasActiveTerm ? 'has-active' : ''}`}
                    onClick={() => toggleLetter(letter)}
                  >
                    <span className={`tree-arrow ${isExpanded ? 'expanded' : ''}`}>
                      ▶
                    </span>
                    <span className="letter-badge">{letter}</span>
                    <span className="nav-count">{letterTerms.length}</span>
                  </button>

                  {isExpanded && (
                    <div className="tree-children">
                      {letterTerms.map((term) => (
                        <Link
                          key={term.id}
                          to={`/term/${term.id}`}
                          className={`nav-item tree-child ${activeTerm === term.id ? 'active' : ''}`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="term-label">{term.term}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Tags */}
          <div className="nav-section">
            <div className="nav-title">Filter by Tag</div>
            <div className="tags-list">
              {tags.map((tag) => {
                const count = terms.filter(t => t.tags?.includes(tag.id)).length
                return (
                  <button
                    key={tag.id}
                    className={`tag-btn ${activeTag === tag.id ? 'active' : ''}`}
                    style={{ '--tag-color': tag.color }}
                    onClick={() => handleTagClick(tag.id)}
                  >
                    <span className="tag-dot" />
                    <span>{tag.name}</span>
                    <span className="tag-count">{count}</span>
                  </button>
                )
              })}
            </div>
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
