import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import _ from "lodash"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Card from "../components/card"
import StyledHeading from "../components/global-styles/headings.js"
import GridContainer from "../components/global-styles/grid-container.js"
import GridItem from "../components/global-styles/grid-item.js"

const Countries = ({ pageContext, data }) => {
  const { country } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const countryHeader = `${totalCount} Event${
    totalCount === 1 ? "" : "s"
  } in ${country}`

  return (
    <Layout>

      <SEO
        title = {`${data.siteVariables.childMarkdownRemark.frontmatter.site_subtitle} in ${country}`}
        description = {`View the complete list of upcoming ${data.siteVariables.childMarkdownRemark.frontmatter.site_subtitle} in ${country}`}
      />

      <StyledHeading h1>{countryHeader}</StyledHeading>
      <GridContainer>
        {edges.map(({ node }) => {
          return (
            <GridItem key={`${_.kebabCase(node.frontmatter.start_date)}-${_.kebabCase(node.frontmatter.country)}-${_.kebabCase(node.frontmatter.city)}-${_.kebabCase(node.frontmatter.title)}`}>
              <Card
                cardTitle = {node.frontmatter.title}
                cardPath = {`events/${_.kebabCase(node.frontmatter.start_date)}-${_.kebabCase(node.frontmatter.country)}-${_.kebabCase(node.frontmatter.city)}-${_.kebabCase(node.frontmatter.title)}`}
                cardCountry = {node.frontmatter.country}
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
    
      <Link to="/events/countries">All countries</Link>
    </Layout>
  )
}

Countries.propTypes = {
  pageContext: PropTypes.shape({
    country: PropTypes.string.isRequired,
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

export default Countries

export const countryPageQuery = graphql`
  query($country: String) {
    allMarkdownRemark(
      filter: { frontmatter: { country: { in: [$country] } } }
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
            country
            city
          }
        }
      }
    }
    siteVariables: file(dir: {regex: "/(site-variables)/"}, name: {eq: "site-variables"}) {
      dir
      childMarkdownRemark {
        frontmatter {
          site_title
          site_subtitle
          site_description
          site_author
          site_repo
        }
      }
    }
  }
`