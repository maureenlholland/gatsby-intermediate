import React from 'react';
import { graphql } from 'gatsby';
import DocsPage from '../components/docs-page';

// page query
// gatsby requires that it is exported, can be named anything
// only works with files that will be parsed by as part of gatsby's page creation process
export const query = graphql`
    query ($pageID:String!) {
	    docsPage(id:{eq:$pageID}) {
        title
        updated(fromNow:true)
        body
    }
}`;

// will inject this info as data prop to the component
const DocsPageTemplate = ({ data }) => <DocsPage page={data.docsPage} />

export default DocsPageTemplate;