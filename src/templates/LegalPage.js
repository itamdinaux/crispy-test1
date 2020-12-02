import React from "react"
import { graphql, Link } from "gatsby"
import * as propTypes from "prop-types"
import Img from "gatsby-image"

import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
const options = {
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: ({
      data: {
        target: { slug, title },
      },
    }) => <Link to={`/${slug}`}>{title}</Link>,
    [BLOCKS.EMBEDDED_ASSET]: node => <Img {...node.data.target} />,
  },
}

const LegalPage = ({ data }) => {
  const { title, contenu } = data.contentfulLegalInfo

  return (
    <div className={`container`}>
      <div className="fullWidth">
        content
        {contenu && renderRichText(contenu, options)}
      </div>
    </div>
  )
}

LegalPage.propTypes = {
  data: propTypes.object.isRequired,
}

export default LegalPage

export const query = graphql`
  query($id: String) {
    contentfulLegalInfo(id: { eq: $id }) {
      contenu {
        raw
        references {
          ... on ContentfulLegalInfo {
            contentful_id
            slug
            title
          }
          ... on ContentfulAsset {
            contentful_id
            fluid(maxWidth: 600) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
