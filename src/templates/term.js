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
          ← Back
        </Link>

        <article className="term-detail-card">
          <header className="term-detail-header">
            <h1 className="term-detail-name">{term.term}</h1>
            {term.fullName && (
              <p className="term-detail-fullname">{term.fullName}</p>
            )}
            {termTags.length > 0 && (
              <div className="term-tags" style={{ marginTop: '24px', padding: 0, border: 'none' }}>
                {termTags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/?tag=${tag.id}`}
                    className="term-tag"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <section className="term-detail-section">
            <h2 className="term-detail-label">Definition</h2>
            <p className="term-detail-content">{term.definition}</p>
          </section>

          {term.example && (
            <section className="term-detail-section">
              <h2 className="term-detail-label">Example</h2>
              <pre className="term-example">{term.example}</pre>
            </section>
          )}
        </article>
      </div>
    </Layout>
  )
}

export default TermTemplate

export const Head = ({ pageContext }) => (
  <title>{pageContext.term.term} — DevTerms</title>
)
