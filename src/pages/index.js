import * as React from "react"
import { useState, useMemo } from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import TermCard from "../components/TermCard"
import termsData from "../data/terms-compiled.json"

const IndexPage = ({ location }) => {
  const params = new URLSearchParams(location?.search || "")
  const initialTag = params.get("tag") || null

  const [search, setSearch] = useState("")
  const [activeTag, setActiveTag] = useState(initialTag)

  const { tags, terms } = termsData

  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      const matchesSearch =
        !search ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        term.definition.toLowerCase().includes(search.toLowerCase())

      const matchesTag = !activeTag || term.tags?.includes(activeTag)

      return matchesSearch && matchesTag
    })
  }, [search, activeTag, terms])

  const stats = useMemo(() => {
    return {
      total: terms.length,
      tags: tags.length,
      filtered: filteredTerms.length,
    }
  }, [terms, tags, filteredTerms])

  const getActiveTagName = () => {
    if (!activeTag) return null
    const tag = tags.find(t => t.id === activeTag)
    return tag ? tag.name : null
  }

  const activeTagData = activeTag ? tags.find(t => t.id === activeTag) : null

  return (
    <Layout
      activeTag={activeTag}
      onTagChange={setActiveTag}
      onSearch={setSearch}
      searchValue={search}
    >
      <header className="page-header">
        <h1 className="page-title">
          {activeTag ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: activeTagData?.color
                }}
              />
              {getActiveTagName()}
            </span>
          ) : (
            'All Terms'
          )}
        </h1>
        <p className="page-subtitle">
          {search
            ? `${stats.filtered} results for "${search}"`
            : activeTag
            ? `${stats.filtered} terms tagged with ${getActiveTagName()}`
            : `Browse ${stats.filtered} development terms`}
        </p>
        {activeTag && (
          <button
            className="clear-filter"
            onClick={() => setActiveTag(null)}
          >
            ✕ Clear filter
          </button>
        )}
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
          <div className="stat-icon">🏷️</div>
          <div className="stat-info">
            <span className="stat-number">{stats.tags}</span>
            <span className="stat-label">Tags</span>
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
            <TermCard key={term.id} term={term} tags={tags} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p className="empty-text">No terms found. Try adjusting your search or filter.</p>
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
