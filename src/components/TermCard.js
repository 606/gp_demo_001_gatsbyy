import * as React from "react"
import { Link } from "gatsby"

const TermCard = ({ term, tags = [], onTagClick }) => {
  const termTags = term.tags
    ? term.tags.map(tagId => tags.find(t => t.id === tagId)).filter(Boolean)
    : []

  const handleTagClick = (e, tagId) => {
    e.preventDefault()
    e.stopPropagation()
    if (onTagClick) {
      onTagClick(tagId)
    }
  }

  return (
    <article className="term-card-wrapper">
      <Link to={`/term/${term.id}`} className="term-card">
        <h2 className="term-name">{term.term}</h2>
        {term.fullName && (
          <p className="term-fullname">{term.fullName}</p>
        )}
        <p className="term-definition">{term.definition}</p>
      </Link>
      {termTags.length > 0 && (
        <div className="term-tags">
          {termTags.slice(0, 4).map((tag) => (
            <button
              key={tag.id}
              className="term-tag"
              onClick={(e) => handleTagClick(e, tag.id)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </article>
  )
}

export default TermCard
