import React from 'react';
import { Link } from 'gatsby';

const Index = () => (
    <>
        <h1>Rick & Morty Character Lookup</h1>
        <p>
            Look up your favorite character from <em>Rick & Morty</em>
        </p>
        <Link to="/search">Search</Link>
    </>
);

export default Index