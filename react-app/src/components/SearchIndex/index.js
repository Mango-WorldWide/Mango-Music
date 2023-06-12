const SearchIndex = ({ match, location }) => {
    const searchTerms = location.search.slice(1);

    return (
        <div style={{"margin-left": "15px", "margin-top": "15px"}} className="search-index">
            <h1>This feature is under maintenance currently!</h1>
            <img src={process.env.PUBLIC_URL + '/construction.gif'}></img>
            {searchTerms && <p>You searched for: {searchTerms}</p>}
            {/* <h2>Albums</h2>
            <h2>Songs</h2> */}
        </div>
    )
}

export default SearchIndex;
