import React from 'react';
import { useQuery } from '@apollo/react-hooks';
// this is diff. from the one gatsby uses. THIS WILL SHIP TO THE BROWSER! (gatsby gql is removed at build time)
import gql from 'graphql-tag';

// create search query
// (since we are on client side, we can use variables)
const SEARCH_QUERY = gql`
    query($name: String!) {
        characters(filter: { name: $name }) {
            results {
                id
                name
                species
                origin {
                    name
                }
                location {
                    name
                    dimension
                }
                image
            }
        }
    }
`;

const Results = ({ name }) => {
    // send query
    const { loading, error, data } = useQuery(SEARCH_QUERY, { variables: { name } });
    const hasResults = data && (data.characters.results || []).length > 0;

    return (
        <div style={{ maxWidth: 500, margin: '50px auto'}}>
            <h2>Search Results</h2>
            {loading && <p>loading...</p>}
            {error && (
                <pre style={{overflowX: 'scroll'}}>
                    {JSON.stringify(error, null, 2)}
                </pre>
            )}
            {hasResults
                ? data.characters.results.map(character => (
                    <div
                        key={character.id}
                        style={{ display: 'flex', marginBottom: 40 }}
                    >
                        <div style={{ marginRight: 20, width: 100 }}>
                            <img src={character.image} alt={character.name} style={{width: '100%'}} />
                        </div>
                        <div>
                            <h3 style={{ marginTop: 0 }}>{character.name}</h3>
                            <p>Species: {character.species}</p>
                            <p>Origin: {character.origin.name}</p>
                            <p>Location: {character.location.name}</p>
                        </div>
                    </div>
                ))
                : <p>No results</p>
            }
        </div>
    )

};

export default Results;