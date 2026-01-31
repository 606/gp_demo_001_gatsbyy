import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import termsData from "../data/terms-compiled.json"

const TermTemplate = ({ pageContext }) => {
  const { term } = pageContext
  const { tags } = termsData

  const termTags = term.tags
    ? term.tags.map(tagId => tags.find(t => t.id === tagId)).filter(Boolean)
    : []

  return (
    <Layout activeTerm={term.id}>
      <div className="term-detail">
        <Link to="/" className="back-link">
          ← Back to all terms
        </Link>

        <div className="term-detail-card">
          <div className="term-detail-header">
            <h1 className="term-detail-name">{term.term}</h1>
            {term.fullName && (
              <p className="term-detail-fullname">{term.fullName}</p>
            )}
            {termTags.length > 0 && (
              <div className="term-tags" style={{ marginTop: '16px', padding: 0, border: 'none' }}>
                {termTags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/?tag=${tag.id}`}
                    className="term-tag"
                    style={{ '--tag-color': tag.color }}
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="term-detail-section">
            <p className="term-detail-label">Definition</p>
            <p className="term-detail-content">{term.definition}</p>
          </div>

          {term.example && (
            <div className="term-detail-section">
              <p className="term-detail-label">Example</p>
              <div className="term-example">{term.example}</div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default TermTemplate

export const Head = ({ pageContext }) => (
  <title>{pageContext.term.term} — DevTerms</title>
)
