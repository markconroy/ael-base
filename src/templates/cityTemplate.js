import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/card"
import StyledHeading from "../components/global-styles/headings.js"
import GridContainer from "../components/global-styles/grid-container.js"
import GridItem from "../components/global-styles/grid-item.js"

const Cities = ({ pageContext, data }) => {
  const { city } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const cityHeader = `${totalCount} event${
    totalCount === 1 ? "" : "s"
  } in "${city}"`

  return (
    <Layout>

      <StyledHeading h1 reversed hasMetaData>{cityHeader}</StyledHeading>
      <GridContainer>
        {edges.map(({ node }) => {
          return (
            <GridItem key={node.frontmatter.path}>
              <Card
              cardTitle = {node.frontmatter.title}
              cardPath = {node.frontmatter.path}
              cardCountry = {node.frontmatter.city}
              cardCity = {node.frontmatter.city}
              cardStartDate = {node.frontmatter.start_date}
              cardEndDate = {node.frontmatter.end_date}
              cardStartDateString = {node.frontmatter.start_date_as_string}
              cardEndDateString = {node.frontmatter.end_date_as_string}
            />
            </GridItem>
          )
        })}
      </GridContainer>
    
      <Link to="/cities">All cities</Link>
    </Layout>
  )
}

Cities.propTypes = {
  pageContext: PropTypes.shape({
    city: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Cities

export const cityPageQuery = graphql`
  query($city: String) {
    allMarkdownRemark(
      filter: { frontmatter: { city: { in: [$city] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            start_date: start_date
            end_date: end_date
            path_date: start_date(formatString: "YYYY-MM-DD")
            start_date_as_string: start_date(formatString: "Do MMMM YYYY")
            end_date_as_string: end_date(formatString: "Do MMMM YYYY")
            city
            city
            path
          }
        }
      }
    }
  }
`