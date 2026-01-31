import * as React from "react"
import { useState, useMemo } from "react"
import Layout from "../components/Layout"
import TermCard from "../components/TermCard"
import terms from "../data/terms.json"

const CATEGORIES = [
  { id: "all", label: "All", icon: "✨" },
  { id: "architecture", label: "Architecture", icon: "🏗️" },
  { id: "devops", label: "DevOps", icon: "🔄" },
  { id: "tools", label: "Tools", icon: "🛠️" },
  { id: "database", label: "Database", icon: "🗄️" },
  { id: "principles", label: "Principles", icon: "📐" },
  { id: "frontend", label: "Frontend", icon: "🎨" },
]

const IndexPage = () => {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      const matchesSearch =
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        term.definition.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        activeCategory === "all" || term.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const stats = useMemo(() => {
    const categories = new Set(terms.map((t) => t.category))
    return {
      total: terms.length,
      categories: categories.size,
    }
  }, [])

  return (
    <Layout>
      <div className="container">
        <section className="hero">
          <div className="hero-badge">
            <span>📚</span>
            <span>Development Glossary</span>
          </div>
          <h1 className="hero-title">Master Dev Terminology</h1>
          <p className="hero-subtitle">
            Your comprehensive glossary for software development terms.
            Search, explore, and understand the language of modern development.
          </p>

          <div className="stats">
            <div className="stat">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Terms</div>
            </div>
            <div className="stat">
              <div className="stat-number">{stats.categories}</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
        </section>

        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search for terms, definitions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {filteredTerms.length > 0 ? (
          <div className="terms-grid">
            {filteredTerms.map((term) => (
              <TermCard key={term.id} term={term} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <p>No terms found. Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>DevTerms — Development Terminology</title>
    <meta name="description" content="A comprehensive glossary for software development terminology" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  </>
)
