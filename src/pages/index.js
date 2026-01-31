import * as React from "react"

const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>Welcome to GP Demo 001</h1>
      <p style={paragraphStyles}>
        This is a Gatsby site deployed to GitHub Pages.
      </p>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home | GP Demo 001</title>

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
}

const paragraphStyles = {
  marginBottom: 48,
}
