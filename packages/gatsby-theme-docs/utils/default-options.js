module.exports = ({
    // when we create pages, we're going to create them at root
    basePath = '/',
    // content lives in docs folder
    contentPath = 'docs',
    // need to know whether or not site is already using MDX (b/c we can only use one instance at a time)
    useExternalMDX = false
}) => ({ basePath, contentPath, useExternalMDX })