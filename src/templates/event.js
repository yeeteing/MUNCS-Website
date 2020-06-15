import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const EventTemplate = ({ data, pageContext, location }) => {
	const event = data.markdownRemark;
	const siteTitle = data.site.siteMetadata.title;
	const { previous, next } = pageContext;

	return (
		<Layout location={location} title={siteTitle}>
			<SEO
				title={event.frontmatter.title}
				description={event.excerpt}
			/>
			<article>
				<header>
					<h1
						style={{
							marginBottom: 0,
						}}
					>
						{event.frontmatter.title}
					</h1>
					<p
						style={{
							display: `block`,
						}}
					>
						{event.frontmatter.date}
					</p>
				</header>
				<section dangerouslySetInnerHTML={{ __html: event.html }} />
				<hr />
			</article>
			<nav>
				<ul
					style={{
						display: `flex`,
						flexWrap: `wrap`,
						justifyContent: `space-between`,
						listStyle: `none`,
						padding: 0,
					}}
				>
					<li>
						{previous && (
							<Link to={previous.fields.slug} rel="prev">
								← {event.frontmatter.title}
							</Link>
						)}
					</li>
					<li>
						{next && (
							<Link to={next.fields.slug} rel="next">
								{event.frontmatter.title} →
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</Layout>
	);
};

export default EventTemplate;

export const pageQuery = graphql`
	query EventBySlug($slug: String!) {
		site {
			siteMetadata {
				title
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
			}
		}
	}
`;
