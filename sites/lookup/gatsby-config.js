// gatsby helper & simple api allow this to work, usually you need to manually configure the graphql client
// to use an api with a secret, you want to use serverless functions (to say this function can only be called from my domain), client side is not secure
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