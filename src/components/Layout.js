import * as React from "react"
import { Link } from "gatsby"
import "../styles/global.css"

const Layout = ({ children }) => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <span className="logo-icon">📚</span>
              <span>DevTerms</span>
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <p>DevTerms - Development Terminology Reference</p>
        </div>
      </footer>
    </>
  )
}

export default Layout
