import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./Search.css"

const Search = () => {
    const history = useHistory();
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.length) {
            setQuery("")
            history.push(`/search?${query}`)
        }
        return
    }

    return (
        <div className="search">
            <form method="post" onSubmit={handleSubmit}>
                <button className="search-button" type="submit"><i className="fa-solid fa-search" /></button>
                <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ backgroundColor: "transparent", border: "none", color: "rgba(238, 238, 238, 1)" }}
                />

            </form>
        </div>
    )
}

export default Search;
