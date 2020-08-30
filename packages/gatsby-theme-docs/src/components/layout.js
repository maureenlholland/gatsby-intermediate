import React, { Fragment } from 'react';

const Layout = ({ children }) => {
    console.log(children);
    return (
        <Fragment>
            <header>gatsby-theme-docs</header>
            <main>{children}</main>
        </Fragment>
    );
}

export default Layout;