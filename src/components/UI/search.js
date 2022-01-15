import { useRef, useState, useEffect } from "react";
import { state } from "./state";
import { SearchIcon, ClearIcon } from "./svg";
import { useHistory } from "react-router-dom";
import useSound from "use-sound";
import sound1 from '../Sounds/select.mp3'
import styled from "styled-components"

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 91%;
  margin: 0 auto 0 auto;
`
export const SearchBar = styled.input`
  border: none !important;
  width: 100%;
  margin: 3px 0;
  display: flex;
  border-radius: 12px;
  background-color: transparent;
  box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
  -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
  -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
  color:  ${props => props.theme.panelColor};
  padding: 2px 19px 2px 19px;
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  font-size: 13px;
  cursor: not-allowed;

  @media only screen and (max-width: 768px) {
  padding: 6px 19px 6px 20px;
  outline: 1px solid ${props => props.theme.panelColor};
  font-size: 18px;
  }

  &::placeholder{
    color: ${props => props.theme.panelColor};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  &:hover::placeholder{
    color: ${props => props.theme.textHover};
    transition: 0.3s;
  }
  &:hover{
    color: ${props => props.theme.textHover};
    background-color:${props => props.theme.LiHover};
    outline: 1px solid ${props => props.theme.textHover};
    box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
    -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
    -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
    transition: 0.3s;
  }
  &:focus::placeholder{
    color: ${props => props.theme.textHover};
    transition: 0.3s;
  }
  &:focus{
    color: ${props => props.theme.textHover};
    background-color:${props => props.theme.LiHover};
    outline: 1px solid ${props => props.theme.textHover};
    box-shadow: 0 0 50px 50px  ${props => props.theme.LiHover};
    -webkit-box-shadow: 0 0 50px 50px  ${props => props.theme.LiHover};
    -moz-box-shadow: 0 0 50px 50px  ${props => props.theme.LiHover};
    transition: 0.3s;
  }

  &:focus ~ #searchIcon, &:hover ~ #searchIcon{
    fill: ${props => props.theme.textHover} !important;
    transition: 0.3s;
  }
  &:focus ~ #clearIcon svg, &:hover ~ #clearIcon svg{
    fill: ${props => props.theme.textHover} !important;
    transition: 0.3s;
  } 
`

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
      <SearchBar
        placeholder="Search (alt + f)"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={Bar}
      >
      </SearchBar>
      <SearchIcon />
      {query &&
        <div
          onClick={() => {
            setQuery("")
            Bar.current.focus()
          }
          }
          id="clearIcon"
        >
          <ClearIcon />
        </div>}
    </SearchWrapper>
  )
}

export default Search;