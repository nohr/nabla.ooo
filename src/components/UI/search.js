import { useRef, useState, useEffect } from "react";
import { state } from "./state";
import { useSnapshot } from "valtio";
import styled from "styled-components"
import { SearchIcon, ClearIcon, Header } from "./svg";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useDocumentTitle from "./documentTitle";
import { db } from "../..";
import { collection, where, query, getDocs, orderBy } from "firebase/firestore/lite";

let searchQuery;

// Search
export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const Bar = useRef(null);
  const navigate = useNavigate();
  const locationFull = useLocation();
  const location = useLocation().pathname;
  const byTitle = (search) => (title) => title.title.toLowerCase().includes((search || '').toLowerCase());

  useEffect(() => {
    let keys = {};

    function handleKeyPress(e) {

      if (e.key === "Escape") {
        Bar.current.blur();
        return;
      }
      if (e.key === 'Enter' || e.key === 'Shift' || e.key === 'Meta' || e.key === 'CapsLock' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'Alt') {
        return;
      }
    }

    function handleFocusCommand(e) {
      // Alt + f to focus search
      let { keyCode, type } = e || Event;
      const isKeyUp = (type === 'keyup');
      keys[keyCode] = isKeyUp;
      if (isKeyUp && keys[18] && keys[70]) {
        keys = {};
        Bar.current.focus();
      } else {
        return;
      }
    }
    Bar.current.addEventListener("keyup", handleKeyPress);
    window.addEventListener("keyup", handleFocusCommand);

    return () => {
      Bar.current.removeEventListener("keyup", handleKeyPress);
      window.removeEventListener("keyup", handleFocusCommand);
    }
  }, [searchTerm])

  function handleChange(e) {
    const search = e.target.value;
    searchQuery = e.target.value;


    if (search) {
      setSearchParams({ search });
    } else {
      setSearchParams({});
    }

    console.log(locationFull);
  };

  return (
    <SearchWrapper id="search">
      <SearchBar
        placeholder="Search (alt + f)"
        type="text"
        value={searchTerm}
        onChange={(e) => handleChange(e)}
        ref={Bar}
      >
      </SearchBar>
      <SearchIcon />
      {searchTerm &&
        <div
          onClick={
            () => {
              setSearchParams({});
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


// const Results = React.memo(
export function Results() {
  const [result, setResult] = useState(null);
  const snap = useSnapshot(state);
  useDocumentTitle(`${searchQuery} - Search Results`);

  useEffect(() => {
    setResult(searchQuery)
  }, [searchQuery])

  return (
    <>
      <Header id={result} />
      <ResultsContainer className="container">
        <Params>
          {snap.mediums.map(one => {
            return <h4>{one}</h4>
          })}
        </Params>
        <Sector>
          <LayerHeader>
            Entities
          </LayerHeader>
          <TitlesLayer>
            <Title to={`/${result}`}>
              {result}
            </Title>
            <Title to={`/${result}`}>
              {result}
            </Title>
            <Title to={`/${result}`}>
              {result}
            </Title>
            <Title to={`/${result}`}>
              {result}
            </Title>
            <Title to={`/${result}`}>
              {result}
            </Title>
            <Title to={`/${result}`}>
              {result}
            </Title>
            <Title to={`/${result}`}>
              {result}
            </Title>
            <Title to={`/${result}`}>
              {result}
            </Title>
            <Title to={`/${result}`}>
              {result}
            </Title>
            <Title to={`/${result}`}>
              {result}
            </Title>
            <Title to={`/${result}`}>
              {result}
            </Title>
            <Title to={`/${result}`}>
              {result}
            </Title>
          </TitlesLayer>
        </Sector>
        <Sector>
          <LayerHeader>
            Projects
          </LayerHeader>
          <ProjectsLayer>
            <Project to={`/${result}`}>
              {result}
            </Project>
            <Project to={`/${result}`}>
              {result}
            </Project>
            <Project to={`/${result}`}>
              {result}
            </Project>
            <Project to={`/${result}`}>
              {result}
            </Project>
            <Project to={`/${result}`}>
              {result}
            </Project>
          </ProjectsLayer>
        </Sector>
        <Sector>
          <LayerHeader>
            Products
          </LayerHeader>
          <ProjectsLayer>
            <Project to={`/${result}`}>
              eko
            </Project>
          </ProjectsLayer>
        </Sector>
      </ResultsContainer>
    </>
  )
}

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 96%;
  margin: 0 auto 0 auto;
`
export const SearchBar = styled.input`
  border: none !important;
  width: 100%;
  margin: 3px 0;
  display: flex;
  border-radius: 25px;
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
  cursor: pointer;

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
const ResultsContainer = styled.div`
  display: flex;
  margin: 20px 5px;
  gap: 60px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  position: fixed;
  z-index: 470;
  overflow-y: overlay;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  /* width: fit-content; */
  padding: 20px 15px 20px 35px;
  font-size: 14px;
  color: ${props => props.theme.panelColor};
  transition: 3s;

  ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      display: flex;
    }
    ::-webkit-scrollbar-thumb {
      background-color:${props => props.theme.panelColor};
      border-radius: 4px;
      /* transition: 0.3s; */
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${props => props.theme.panelColor};
          box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          /* transition: 0.3s; */
    }
`
const Title = styled(Link)`
  width: max-content;
  font-size: 24px;
  text-decoration: none;
  color: inherit;
  border-radius: 12px;
  transition: 0.3s;
  padding: 10px;
  margin: 5px;

  &:hover{
      background-color: ${props => props.theme.LiHover};
      -webkit-box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
      -moz-box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
      box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
      color: ${props => props.theme.textHover};
      text-shadow: 1px 1px 3px #ebebeb;
  }

`
const Project = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 300px;
  width: 300px;
  padding: 20px;
  border: 1px solid ${props => props.theme.panelColor};
  border-radius: 50%;
  color: inherit;
  transition: 0.3s;
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));

  &:hover{
    box-shadow: 0 8px 32px 0 ${props => props.theme.panelColor};
    /* transform: skew(3deg, 1deg); */
  }

`
const TitlesLayer = styled.div`
  margin-left: calc(var(--panelWidth) + 20px);
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;    
  width: 100%;
  column-gap: 30px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${props => props.theme.panelColor};
  overflow-x: scroll !important;
`
const ProjectsLayer = styled.div`
width: 100%;
  margin-left: calc(var(--panelWidth) + 20px);
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${props => props.theme.panelColor};
  overflow: visible;
  padding: 20px 0;
`
const Params = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 270px;
  position: fixed;
  z-index: 3000;
  margin-top: calc(var(--panelWidth) - 50px);

  & *{
    cursor: pointer;
    width: fit-content;
    height: 25px;
    padding: 5px;
    border-radius: 10px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
    &:hover{
      background-color: ${props => props.theme.LiHover};
      -webkit-box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
      -moz-box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
      box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
      color: ${props => props.theme.textHover};
      text-shadow: 1px 1px 3px #ebebeb;
    }
  }
`
const LayerHeader = styled.h2`
  position: absolute;   
  top: -40px;
  left: 292px;
`
const Sector = styled.div`
  max-width: fit-content;
  width: 100%;
  position: relative;
`