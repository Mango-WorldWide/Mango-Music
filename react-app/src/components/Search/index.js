import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./Search.css"

const Search = () => {
    const history = useHistory();
    const [query, setQuery] = useState("");

    const handleclick = (e) => {
        e.preventDefault()
        if (query.length){
            setQuery("")
            history.push(`/search?${query}`)
        }
        return
    }

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Songs, albums, or artists..."
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
            />
            <button className="search-button" onClick={handleclick}><i className="fa-solid fa-search"/></button>
        </div>
    )
}

export default Search;
