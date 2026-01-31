const path = require("path")
const fs = require("fs")
const yaml = require("js-yaml")

// Load terms from YAML
const loadTermsData = () => {
  const yamlPath = path.resolve(__dirname, "./src/data/terms.yaml")
  const fileContents = fs.readFileSync(yamlPath, "utf8")
  return yaml.load(fileContents)
}

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  const termTemplate = path.resolve("./src/templates/term.js")

  const data = loadTermsData()

  data.terms.forEach((term) => {
    createPage({
      path: `/term/${term.id}`,
      component: termTemplate,
      context: {
        term,
        categories: data.categories,
      },
    })
  })
}

// Make data available at build time
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@data": path.resolve(__dirname, "src/data"),
      },
    },
  })
}

// Create JSON from YAML for client-side use
exports.onPreBuild = async () => {
  const data = loadTermsData()
  const jsonPath = path.resolve(__dirname, "./src/data/terms-compiled.json")
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2))
}

exports.onPreBootstrap = async () => {
  const data = loadTermsData()
  const jsonPath = path.resolve(__dirname, "./src/data/terms-compiled.json")
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2))
}
