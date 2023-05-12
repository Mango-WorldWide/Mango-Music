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
            <button className="search-button" onClick={handleclick}><i className="fa-solid fa-search"/></button>
            <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                style={{backgroundColor:"transparent", border:"none"}}
            />
        </div>
    )
}

export default Search;
