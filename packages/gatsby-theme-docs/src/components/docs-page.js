/** @jsx jsx */
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from './layout';
import Toc from './table-of-contents';
import { jsx } from 'theme-ui';

const DocsPage = ({ page }) => {

    return (
        <Layout>
            <h1>{page.title}</h1>
            <MDXRenderer>{page.body}</MDXRenderer>
            <p
                sx={{
                    borderTop: theme => `1px solid ${theme.colors.muted}`,
                    color: 'muted',
                    fontSize: 14,
                    mt: 2,
                    pt: 2,
                }}
            >This page was updated {page.updated}</p>
            <Toc/>
        </Layout>
    );
}

export default DocsPage;