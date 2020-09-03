// gatsby helper & simple api allow this to work, usually you need to manually configure the graphql client
module.exports  = {
    plugins: [
        {
            resolve: 'gatsby-plugin-apollo',
            options: {
                uri: 'https://rickandmortyapi.com/graphql/'
            }
        }
    ]
}