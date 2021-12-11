import { useRef, useState, useEffect } from "react";
import { state } from "./state";
// import db from "../../firebase";
// import { useSnapshot } from "valtio";
import { SearchWrapper, SearchBar } from "./Theme";
import { SearchIcon, ClearIcon } from "./svg";
import { useHistory } from "react-router-dom";
import useSound from "use-sound";
import sound1 from '../Sounds/select.mp3'



// Search
function Search() {
    const [enter] = useSound(sound1, { volume: state.sfxVolume });
    const [query, setQuery] = useState("");
    const Bar = useRef(null)
    const history = useHistory();
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (query) {
                state.query = query;
                history.push(`/${state.query}-results`);
                setQuery('')
                Bar.current.blur()
                enter()
            }
        } else if (e.key === 'Escape') {
            Bar.current.blur()
        }
    }
    return (
        <SearchWrapper id="search">
            <SearchIcon />
            {query &&
                <div
                    onClick={() => { setQuery('') }}
                >
                    <ClearIcon />
                </div>}
            <SearchBar
                placeholder="Search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleKeyPress.bind(this)}
                ref={Bar}
            >
            </SearchBar>
        </SearchWrapper>
    )
}

export default Search;