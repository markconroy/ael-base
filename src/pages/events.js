import React, { Fragment } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"
import StyledHeading from "../components/global-styles/headings.js"
import GridContainer from "../components/global-styles/grid-container.js"
import GridItem from "../components/global-styles/grid-item.js"

const EventsPage = ({ data }) => (
  <Layout>
    
    <SEO title="Free Developer Events" />

    <StyledHeading h1>Free Developer Events</StyledHeading>

    <p>{data.allMarkdownRemark.edges.length} Upcoming Developer Events</p>
    <p>Click an event for more information.</p>
    
    <GridContainer>
      {data.allMarkdownRemark.edges.map(edge => (
        <Fragment>
          <GridItem>
            <Card
              cardTitle = {edge.node.frontmatter.title}
              cardPath = {edge.node.frontmatter.path}
              cardCountry = {edge.node.frontmatter.country}
              cardCity = {edge.node.frontmatter.city}
              cardStartDate = {edge.node.frontmatter.start_date}
              cardEndDate = {edge.node.frontmatter.end_date}
              cardStartDateString = {edge.node.frontmatter.start_date_as_string}
              cardEndDateString = {edge.node.frontmatter.end_date_as_string}
            />
          </GridItem>
        </Fragment>
      ))}
    </GridContainer>

  </Layout>
)

export default EventsPage

export const EventsPageQuery = graphql`
  {
    allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___start_date] }
      ) {
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
            path
          }
          excerpt
        }
      }
    }
  }
`