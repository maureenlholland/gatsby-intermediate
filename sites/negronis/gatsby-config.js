// need to set env variable up so they are available during build (for Netlify, CI)
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
})

// bad connection, need to retry yarn workspace negronis add @jlengstorf/gatsby-theme-events
module.exports = {
    plugins: [
        'gatsby-plugin-theme-ui',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: 'src/images'
            }
        },
        {
            resolve: 'gatsby-transformer-cloudinary',
            options: {
                cloudName: process.env.CLOUDINARY_CLOUD_NAME,
                apiKey: process.env.CLOUDINARY_API_KEY,
                apiSecret: process.env.CLOUDINARY_API_SECRET,
                uploadFolder: 'fem-workshop'
            }
        },
        {
            resolve: 'gatsby-theme-docs',
            options: {
                basePath: '/recipes',
                contentPath: 'content/recipes',
            }
        },
        {
            resolve: '@jlengstorf/gatsby-theme-events',
            options: {
                basePath: '/events',
                contentPath: 'content/events'
            }
        }
    ]
}
