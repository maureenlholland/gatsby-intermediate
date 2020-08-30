const withDefaults = require('./utils/default-options')

// in theme, config is function with options arg
module.exports = options => {
    const { contentPath, useExternalMDX } = withDefaults(options);

    // now you can return reg config object
    return {
        plugins: [
            {
                // always resolve
                resolve: 'gatsby-source-filesystem',
                options: {
                    // we want to be able to identify which files were loaded by this theme
                    name: 'gatsby-theme-docs',
                    path: contentPath
                }
            },
            ! useExternalMDX && {
                resolve: 'gatsby-plugin-mdx',
                options: {
                    defaultLayouts: {
                        default: require.resolve('./src/components/layout.js'),
                    }
                }
            },
            'gatsby-plugin-theme-ui'
        ].filter(Boolean) // need to cut out the potential false value
    }
}