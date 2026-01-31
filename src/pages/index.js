import * as React from "react"
import { useState, useMemo, useEffect } from "react"
import { Link, navigate } from "gatsby"
import Layout from "../components/Layout"
import TermCard from "../components/TermCard"
import termsData from "../data/terms-compiled.json"

const IndexPage = ({ location }) => {
  const [search, setSearch] = useState("")
  const [activeTag, setActiveTag] = useState(null)

  const { tags, terms } = termsData

  // Read tag from URL
  useEffect(() => {
    const params = new URLSearchParams(location?.search || "")
    const tagParam = params.get("tag")
    setActiveTag(tagParam)
  }, [location?.search])

  const handleTagChange = (tagId) => {
    if (tagId) {
      navigate(`/?tag=${tagId}`)
    } else {
      navigate('/')
    }
    setActiveTag(tagId)
  }

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

  const sortedTerms = useMemo(() => {
    return [...filteredTerms].sort((a, b) => a.term.localeCompare(b.term))
  }, [filteredTerms])

  const activeTagData = activeTag ? tags.find(t => t.id === activeTag) : null

  return (
    <Layout
      activeTag={activeTag}
      onTagChange={handleTagChange}
      onSearch={setSearch}
      searchValue={search}
    >
      <header className="page-header">
        {activeTagData ? (
          <>
            <div className="page-tag-header">
              <span
                className="page-tag-dot"
                style={{ background: activeTagData.color }}
              />
              <h1 className="page-title">{activeTagData.name}</h1>
              <button
                className="clear-tag-btn"
                onClick={() => handleTagChange(null)}
              >
                ✕
              </button>
            </div>
            <p className="page-subtitle">
              {sortedTerms.length} terms with this tag
            </p>
          </>
        ) : (
          <>
            <h1 className="page-title">All Terms</h1>
            <p className="page-subtitle">
              {search
                ? `${sortedTerms.length} results for "${search}"`
                : `${sortedTerms.length} development terms`}
            </p>
          </>
        )}
      </header>

      {sortedTerms.length > 0 ? (
        <div className="terms-grid">
          {sortedTerms.map((term) => (
            <TermCard key={term.id} term={term} tags={tags} onTagClick={handleTagChange} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p className="empty-text">No terms found.</p>
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
  </>
)
