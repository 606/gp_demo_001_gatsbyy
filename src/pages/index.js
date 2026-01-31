import * as React from "react"
import { useState, useMemo } from "react"
import Layout from "../components/Layout"
import TermCard from "../components/TermCard"
import terms from "../data/terms.json"

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "architecture", label: "Architecture" },
  { id: "devops", label: "DevOps" },
  { id: "tools", label: "Tools" },
  { id: "database", label: "Database" },
  { id: "principles", label: "Principles" },
  { id: "frontend", label: "Frontend" },
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
          <h1 className="hero-title">DevTerms</h1>
          <p className="hero-subtitle">
            Your comprehensive glossary for software development terminology.
            Learn and master the language of modern development.
          </p>
        </section>

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

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search terms..."
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
              {cat.label}
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

export const Head = () => <title>DevTerms - Development Terminology</title>
