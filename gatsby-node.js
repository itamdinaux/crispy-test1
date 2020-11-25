const path = require("path")

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      c: allStripePrice(
        filter: { product: { metadata: { type: { ne: "ingredient" } } } }
      ) {
        nodes {
          product {
            name
            metadata {
              type
            }
          }
        }
      }
    }
  `)
}
