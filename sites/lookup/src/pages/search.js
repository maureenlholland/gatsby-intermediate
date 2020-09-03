import React from 'react';
import Form from '../components/form';
import Results from '../components/results';

const Search = ({ location }) => {
    // for pages in Gatsby (with createPage action), location is supplied as an object with metadata
    const query = 
    (location.state && location.state.query) ||
    location.pathname.replace(/^\/search\/?/, '') || ''

    const name = query.replace('/\-+/g', ' ')

    return (
        <>
            <h1>{name ? `Results for "${name}"` : 'Rick & Morty Character Lookup: Search'}</h1>
            <p>
                Look up your favorite character from <em>Rick & Morty</em>
            </p>
            <Form/>
            {name && <Results name={name}/>}
        </>
    )
};

export default Search;