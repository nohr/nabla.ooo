import { useRef, useState, useEffect } from "react";
import { state } from "./state";
// import db from "../../firebase";
// import { useSnapshot } from "valtio";
import { SearchWrapper, SearchBar } from "./style";
import { SearchIcon, ClearIcon } from "./svg";
import { useHistory } from "react-router-dom";
import useSound from "use-sound";
import sound1 from '../Sounds/select.mp3'



// Search
function Search() {
    const [enter] = useSound(sound1, { volume: state.sfxVolume });
    const [query, setQuery] = useState("");
    const Bar = useRef(null);
    const history = useHistory();
    useEffect(() => {
        Bar.current && Bar.current.focus();
        let keys = {};
        state.query = '';

        function handleKeyPress(e) {

            let { keyCode, type } = e || Event;
            const isKeyDown = (type === 'keydown');
            // const isKeyUp = (type === 'keyup');
            keys[keyCode] = isKeyDown;

            if (e.key === "Escape") {
                Bar.current.focus();
            } else if (e.key === "Enter" && !query) {
                state.query = query;
                Bar.current.blur()
                console.log(keys);
                setQuery('')
                history.push(`/${state.query}-results`);
                enter()
            } else if (isKeyDown && keys[18] && keys[70]) {
                keys = {};
                Bar.current.focus();
                setQuery(query - 'ƒ')
                console.log(keys[18], keys[70]);
            }
        }
        window.addEventListener("keyup", handleKeyPress);
        window.addEventListener("keydown", handleKeyPress);
    }, [enter, history, query])

    return (
        <SearchWrapper id="search">
            <SearchIcon />
            {query &&
                <div
                    onClick={() => {
                        setQuery("")
                        Bar.current.focus()
                    }}
                >
                    <ClearIcon />
                </div>}
            <SearchBar
                placeholder="Search (alt + f)"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                // onKeyUp={handleKeyPress.bind(this)}
                // onKeyDown={handleKeyPress.bind(this)}
                ref={Bar}
            >
            </SearchBar>
        </SearchWrapper>
    )
}

export default Search;