import { useHistory } from "react-router-dom";
import { useState } from "react";

const Search = () => {
    const history = useHistory();
    const [query, setQuery] = useState("");

    const handleclick = (e) => {
        setQuery("")
        e.preventDefault()
        history.push(`/search?${query}`)
    }

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Songs, albums, or artists..."
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
            />
            <button onClick={handleclick}>Search</button>
        </div>
    )
}

export default Search;
