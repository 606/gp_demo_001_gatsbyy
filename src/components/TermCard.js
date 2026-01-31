import * as React from "react"
import { Link } from "gatsby"

const TermCard = ({ term, tags = [] }) => {
  const termTags = term.tags
    ? term.tags.map(tagId => tags.find(t => t.id === tagId)).filter(Boolean)
    : []

  return (
    <Link to={`/term/${term.id}`} className="term-card">
      <div className="term-header">
        <h2 className="term-name">{term.term}</h2>
      </div>
      {term.fullName && (
        <p className="term-fullname">{term.fullName}</p>
      )}
      <p className="term-definition">{term.definition}</p>
      {termTags.length > 0 && (
        <div className="term-tags">
          {termTags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="term-tag"
              style={{ '--tag-color': tag.color }}
            >
              {tag.name}
            </span>
          ))}
          {termTags.length > 3 && (
            <span className="term-tag" style={{ '--tag-color': 'var(--text-muted)' }}>
              +{termTags.length - 3}
            </span>
          )}
        </div>
      )}
      <div className="term-footer">
        <span className="term-more">
          View details <span className="term-arrow">→</span>
        </span>
      </div>
    </Link>
  )
}

export default TermCard
