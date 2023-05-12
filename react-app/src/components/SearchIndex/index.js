const SearchIndex = ({ match, location }) => {
    const searchTerms = location.search.slice(1);

    return (
        <div className="search-index">
            <h1>Search coming soon!</h1>
            <p>You searched for: {searchTerms}</p>
            {/* <h2>Albums</h2>
            <h2>Songs</h2> */}
        </div>
    )
}

export default SearchIndex;
