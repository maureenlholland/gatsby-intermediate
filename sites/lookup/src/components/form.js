import React, { useState } from 'react';
import { navigate } from 'gatsby';

const Form = () => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // change search string into search friendly query
        // since we know api is text-based search, that simplifies the job
        // regex: take out any special characters
        // regex 2: replace space with hyphen
        const query = value
            .toLowerCase()
            .trim()
            .replace(/[^\w ]/g, '')
            .replace(/\s+/g, '-');

        // change url to match search result
        // use gatsby helper
        navigate(`/search/${query}`, { state: { query } });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search by Name: </label>
            <input id="search" type="text" name="name" onChange={(e) => setValue(e.target.value)}></input>
            <button type="submit">Submit</button>
        </form>
    )
};

export default Form;