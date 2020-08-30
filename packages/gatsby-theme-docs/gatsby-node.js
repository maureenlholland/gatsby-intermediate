const path = require('path');
const fs = require('fs');
// default mkdir only does one level at a time, this helps with sub levels 
const mkdirp = require('mkdirp');

const withDefaults = require('./utils/default-options')

exports.onPreBootstrap = ({ store }, options) => {
    const { program } = store.getState();
    const{ contentPath } = withDefaults(options)
    // creates directory of location on fs where content should exist
    const dir = path.join(program.directory, contentPath)

    if (!fs.existsSync(dir)) {
        // create dir
        mkdirp.sync(dir);
    }
};

exports.createSchemaCustomization = ({ actions }) => {
    // allows us to create custom datatype that does exactly what we want it to do
    // Node is Gatsby's core type. Any data that exists will be given Node type.
    actions.createTypes(`
        type DocsPage implements Node @dontInfer {
            id: ID!
            title: String!
            path: String!
            updated: Date! @dateformat
            body: String!
        }
    `)
};

// not all of the node types are fully resolved by the time we reach onCreateNode, so we need a custom Resolver
exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
    const { basePath } = withDefaults(options);
    const parent = getNode(node.parent);
    
    // if not MDX files loaded by this theme, early return (sourceInstanceName set in gatsby-config)
    if (
        node.internal.type !== 'Mdx' ||
        (parent.sourceInstanceName !== 'gatsby-theme-docs')
    ) {
        return
    }

    // treat index.mdx like index.html, plain basepath (ie docs) instead of docs/index
    const pageName = parent.name !== 'index' ? parent.name : '';

    // create the DocsPage node we want to query with GraphQL
    // every gatsby node needs the internal key
    actions.createNode({
        id: createNodeId(`DocsPage-${node.id}`),
        title: node.frontmatter.title || parent.name,
        updated: parent.modifiedTime,
        path: path.join('/', basePath, parent.relativeDirectory, pageName),
        parent: node.id,
        internal: {
            type: 'DocsPage',
            contentDigest: node.internal.contentDigest,
        }
    });
};

// we need to resolve the mdx body
exports.createResolvers = ({ createResolvers }) => {
    createResolvers({
        DocsPage: {
            body: {
                type: 'String!',
                resolve: (source, args, context, info) => {
                    // load the resolver for the MDX type for body field
                    const type = info.schema.getType('Mdx');
                    const mdxFields = type.getFields(); // this is where we get body
                    // passthrough resolver, we are using the existing DocsPage resolver
                    const resolver = mdxFields.body.resolve;

                    const mdxNode = context.nodeModel.getNodeById({ id: source.parent });

                    return resolver(mdxNode, args, context, {
                        fieldName: 'body',
                    });
                } 
            }
        }
    });
};

// inside createPages, graphql is function NOT template tag
exports.createPages = async ({ actions, graphql, reporter }) => {
    const result = await graphql(`
        query {
            allDocsPage {
                nodes {
                    id
                    path
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panic('error loading docs', result.errors);
    }

    const pages = result.data.allDocsPage.nodes;

    pages.forEach(page => {
        // path & component are required
        // whatever name you give in context, will be used in graphQL variable
        actions.createPage({
            path: page.path,
            component: require.resolve('./src/templates/docs-page-template'),
            context: {
                pageID: page.id,
            }
        })
    });
};
