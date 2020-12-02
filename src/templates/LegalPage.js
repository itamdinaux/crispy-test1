import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"

const LegalPage = ({ data }) => {
  console.log(data)
  const option = {
    renderMark: {
      [MARKS.BOLD]: text => <strong>{text}</strong>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.EMBEDDED_ASSET]: node => (
        <img
          src={node.data.target.fields.file["fr"].url}
          alt={node.data.target.fields.file["fr"].fileName}
          className="image"
        />
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a href={`${node.data.uri}`} target="_blank" rel="noreferrer">
          {children}
        </a>
      ),
      [INLINES.ENTRY_HYPERLINK]: (node, children) => (
        <Link to={`${node.data.target.fields.slug["fr"]}`}>{children}</Link>
      ),
    },
  }
  return (
    <div className={`container`}>
      <div className="fullWidth">
        content
        {documentToReactComponents(data.c.content.raw, option)}
      </div>
    </div>
  )
}
export const query = graphql`
  query($id: String) {
    c: contentfulLegalInfo(id: { eq: $id }) {
      content {
        raw
      }
    }
  }
`

export default LegalPage
