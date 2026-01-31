import * as React from "react"
import { useState, useMemo } from "react"
import Layout from "../components/Layout"
import TermCard from "../components/TermCard"
import terms from "../data/terms.json"

const IndexPage = ({ location }) => {
  const params = new URLSearchParams(location?.search || "")
  const initialCategory = params.get("category") || "all"

  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState(initialCategory)

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
      filtered: filteredTerms.length,
    }
  }, [filteredTerms])

  const getCategoryLabel = () => {
    if (activeCategory === "all") return "All Terms"
    return activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
  }

  return (
    <Layout
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
      onSearch={setSearch}
      searchValue={search}
    >
      <header className="page-header">
        <h1 className="page-title">{getCategoryLabel()}</h1>
        <p className="page-subtitle">
          {search
            ? `${stats.filtered} results for "${search}"`
            : `Browse ${stats.filtered} development terms`}
        </p>
      </header>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon">📖</div>
          <div className="stat-info">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Terms</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div className="stat-info">
            <span className="stat-number">{stats.categories}</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✨</div>
          <div className="stat-info">
            <span className="stat-number">{stats.filtered}</span>
            <span className="stat-label">Showing</span>
          </div>
        </div>
      </div>

      {filteredTerms.length > 0 ? (
        <div className="terms-grid">
          {filteredTerms.map((term) => (
            <TermCard key={term.id} term={term} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p className="empty-text">No terms found. Try adjusting your search.</p>
        </div>
      )}
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
