const path = require("path")

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query GetPages {
      page: allContentfulTypeProduct {
        nodes {
          slug
          title
          id
        }
      }
      legal: allContentfulLegalInfo {
        nodes {
          slug
          title
          id
        }
      }
      pizza: allContentfulPizza {
        nodes {
          slug
          title
          id
        }
      }
      boisson: allContentfulBoisson {
        nodes {
          slug
          type
          title
          id
        }
      }
    }
  `)
  result.data.page.nodes.forEach(page => {
    if (page.slug === "pain") {
      createPage({
        path: `/${page.slug}`,
        component: path.resolve(`./src/templates/PainPage.js`),
        context: {
          id: page.id,
          type: "productPage",
        },
      })
    }
    if (page.slug === "pizza") {
      createPage({
        path: `/${page.slug}`,
        component: path.resolve(`./src/templates/PizzaPage.js`),
        context: {
          id: page.id,
          type: "productPage",
        },
      })
    }
    if (page.slug === "pate") {
      createPage({
        path: `/${page.slug}`,
        component: path.resolve(`./src/templates/PatePage.js`),
        context: {
          id: page.id,
          type: "productPage",
        },
      })
    }
    if (page.slug === "salade") {
      createPage({
        path: `/${page.slug}`,
        component: path.resolve(`./src/templates/SaladePage.js`),
        context: {
          id: page.id,
          type: "productPage",
        },
      })
    }
    if (page.slug === "boisson") {
      createPage({
        path: `/${page.slug}`,
        component: path.resolve(`./src/templates/BoissonPage.js`),
        context: {
          id: page.id,
          type: "productPage",
        },
      })
    }
    if (page.slug === "dessert") {
      createPage({
        path: `/${page.slug}`,
        component: path.resolve(`./src/templates/DessertPage.js`),
        context: {
          id: page.id,
          type: "productPage",
        },
      })
    }
  })
  result.data.legal.nodes.forEach(legal => {
    createPage({
      path: `/${legal.slug}`,
      component: path.resolve(`./src/templates/LegalPage.js`),
      context: {
        id: legal.id,
        type: "legalPage",
      },
    })
  })
  result.data.pizza.nodes.forEach(pizza => {
    createPage({
      path: `/pizza/${pizza.slug}`,
      component: path.resolve(`./src/templates/PizzaPageOption.js`),
      context: {
        id: pizza.id,
        type: "pizzaOption",
      },
    })
  })
  result.data.boisson.nodes.forEach(boisson => {
    if(boisson.type.length >1){
    createPage({
      path: `/boisson/${boisson.slug}`,
      component: path.resolve(`./src/templates/BoissonPageOption.js`),
      context: {
        id: boisson.id,
        type: "boissonOption",
      },
    })
    }
  })
}
