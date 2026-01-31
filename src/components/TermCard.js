import * as React from "react"
import { Link } from "gatsby"

const TermCard = ({ term }) => {
  return (
    <Link
      to={`/term/${term.id}`}
      className={`term-card category-${term.category}`}
    >
      <div className="term-header">
        <h2 className="term-name">{term.term}</h2>
        <span className={`term-category`}>
          {term.category}
        </span>
      </div>
      {term.fullName && (
        <p className="term-fullname">{term.fullName}</p>
      )}
      <p className="term-definition">{term.definition}</p>
      <div className="term-footer">
        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          View details
        </span>
        <span className="term-arrow">→</span>
      </div>
    </Link>
  )
}

export default TermCard
