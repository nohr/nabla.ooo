import { useRef, useState, useEffect } from "react";
import { state } from "./state";
import { SearchWrapper, SearchBar } from "./style";
import { SearchIcon, ClearIcon } from "./svg";
import { useHistory } from "react-router-dom";
import useSound from "use-sound";
import sound1 from '../Sounds/select.mp3'



// Search
function Search() {
    const [enter] = useSound(sound1, { volume: state.sfxVolume, soundEnabled: !state.muted });
    const [query, setQuery] = useState("");
    const Bar = useRef(null);
    const history = useHistory();
    useEffect(() => {
        // Bar.current && Bar.current.focus();
        let keys = {};
        // state.query = '';

        function handleKeyPress(e) {

            let { keyCode, type } = e || Event;
            const isKeyDown = (type === 'keydown');
            // const isKeyUp = (type === 'keyup');
            keys[keyCode] = isKeyDown;

            if (e.key === "Escape") {
                Bar.current.blur();
            } else if (isKeyDown && e.key === "Enter" && query) {
                console.log(Bar.current.value);
                state.query = query;
                Bar.current.blur()
                history.push(`/${state.query}-results`);
                enter()
                setQuery('')
            } else if (isKeyDown && keys[18] && keys[70]) {
                keys = {};
                Bar.current.focus();
                setQuery(Bar.current.value);
                console.log(keys[18], keys[70]);
            } else {
                return null
            }
        }
        window.addEventListener("keyup", handleKeyPress);
        window.addEventListener("keydown", handleKeyPress);
    }, [enter, history, query])

    return (
        <SearchWrapper id="search">
            {/* allow search onClick of icon */}
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
                style={{ textDecoration: "line-through", color: `${state.theme === 'light' ? state.light.panelColor : state.dark.panelColor}` }}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={Bar}
            >
            </SearchBar>
        </SearchWrapper>
    )
}

export default Search;