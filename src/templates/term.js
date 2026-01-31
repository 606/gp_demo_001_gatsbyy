import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

const TermTemplate = ({ pageContext }) => {
  const { term } = pageContext

  return (
    <Layout activeCategory={term.category} activeTerm={term.id}>
      <div className="term-detail">
        <Link to="/" className="back-link">
          ← Back to all terms
        </Link>

        <div className={`term-detail-card cat-${term.category}`}>
          <div className="term-detail-header">
            <div className="term-detail-meta">
              <h1 className="term-detail-name">{term.term}</h1>
              <span className="term-badge">{term.category}</span>
            </div>
            {term.fullName && (
              <p className="term-detail-fullname">{term.fullName}</p>
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
  <>
    <title>{pageContext.term.term} — DevTerms</title>
    <meta name="description" content={pageContext.term.definition} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  </>
)
