const path = require("path")
const terms = require("./src/data/terms.json")

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  const termTemplate = path.resolve("./src/templates/term.js")

  terms.forEach((term) => {
    createPage({
      path: `/term/${term.id}`,
      component: termTemplate,
      context: {
        term,
      },
    })
  })
}
