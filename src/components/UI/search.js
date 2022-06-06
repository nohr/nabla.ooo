import { useRef, useState, useEffect } from "react";
import { state } from "./state";
import { useSnapshot } from "valtio";
import styled from "styled-components"
import { SearchIcon, ClearIcon, Header, Program } from "./svg";
import { Link, useSearchParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useDocumentTitle from "./documentTitle";
import { useLocation } from "react-router-dom";
//Audio Imports
import useSound from "use-sound"
import sound1 from "../Sounds/select.mp3"
import { db } from "../..";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore/lite";
// Search Imports
import algoliasearch from 'algoliasearch/lite';
import { history } from 'instantsearch.js/es/lib/routers';
import { InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('QYRMFVSZ3U', 'f5aad11cf6f85eb1bf098a3f6f346290');
let searchQuery;

const indexName = 'instant_search';

const routing = {
  router: history(),
  stateMapping: {
    stateToRoute(uiState) {
      const indexUiState = uiState[indexName];
      return {
        search: indexUiState.query,
        categories: indexUiState.menu?.categories,
        brand: indexUiState.refinementList?.refinementList.brand,
        page: indexUiState.page,
      };
    },
    routeToState(routeState) {
      return {
        [indexName]: {
          query: routeState.search,
          menu: {
            categories: routeState.categories,
          },
          refinementList: {
            brand: routeState.brand,
          },
          page: routeState.page,
        },
      };
    },
  },
};

export function Kh() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="projects"
      routing={routing}>
      <SearchBox
      // submitIconComponent={null}
      />
    </InstantSearch>
  );
}
// Search
export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [placeholder, setPlaceholder] = useState("Search (alt + f)")
  const searchTerm = searchParams.get("search") || "";
  let value;
  const Bar = useRef(null);

  useEffect(() => {
    let keys = {};
    value = searchTerm.slice(8).toLocaleLowerCase().split('&')[0];

    function handleClick() {
      if (Bar.current === document.activeElement) {
        setPlaceholder("Cancel (esc)")
        return;
      } else {
        setPlaceholder("Search (alt + f)")
        return;
      }
    }

    function handleKeyPress(e) {
      // esc to clear search and blur input
      if (e.key === "Escape") {
        setSearchParams({});
        Bar.current.blur();
        setPlaceholder("Search (alt + f)")
        return;
      }
      // Do nothing when these are pressed
      if (e.key === "Enter" || e.key === "Shift" || e.key === "Meta" || e.key === "CapsLock" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "Alt") {
        return;
      }
    }

    function handleCommandPress(e) {
      // Alt + f to focus search
      let { keyCode, type } = e || Event;
      const isKeyUp = (type === "keyup");
      keys[keyCode] = isKeyUp;
      if (isKeyUp && keys[18] && keys[70]) {
        keys = {};
        Bar.current.focus();
        setPlaceholder("Cancel (esc)")
      } else {
        return;
      }
    }
    if (Bar.current) {
      Bar.current.addEventListener("keyup", handleKeyPress);
    }
    window.addEventListener("click", handleClick)
    window.addEventListener("keyup", handleCommandPress);

    return () => {
      if (Bar.current) {
        Bar.current.removeEventListener("keyup", handleKeyPress);
      }
      window.removeEventListener("click", handleClick)
      window.removeEventListener("keyup", handleCommandPress);
    }
  }, [searchTerm, setSearchParams])

  async function handleSearch(term) {
    state.loading = true;
    const projectsSnapshot = await getDocs(query(collection(db, 'portfolio'), orderBy('projectName', 'asc', where('projectName', 'in', `${term}`))));
    state.projects = projectsSnapshot.docs.map(doc => doc.data());
    console.log(state.projects, term);
    state.loading = false;
  }

  function handleChange(e) {
    const search = e.target.value;
    searchQuery = e.target.value;

    // handleSearch(search)

    if (search) {
      setSearchParams({ search });
    } else {
      setSearchParams({});
    }
  };

  return (
    <SearchWrapper id="search">
      <SearchBar
        placeholder={placeholder}
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

export function Results() {
  const snap = useSnapshot(state);
  const location = useLocation();
  let value = location.search.slice(8).toLocaleLowerCase().split('&')[0];
  useDocumentTitle(`${value} - Search Results`);
  // const byTitle = (search) => (title) => title.title.toLowerCase().includes((search || "").toLowerCase());
  const [select] = useSound(sound1, { soundEnabled: !state.muted });
  const [active, setActive] = useState(false);
  const [statement, setStatement] = useState(null);
  const [program, setProgram] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [by, setBy] = useState(null);

  // Results image slider
  function Block(val) {
    if (val.images) {
      // Get enxtentions of files
      const types = new Map([["jpg", "img"], ["jpeg", "img"], ["png", "img"], ["gif", "img"], ["mp4", "video"], ["svg", "svg"]])
      const link = new URL(`${val.images[0]}`)
      const extension = link.pathname.split(".")
      const element = types.get(extension[extension.length - 1].toLowerCase())

      if (element === "video") {
        if (val.orientation === "portrait") {
          return (
            <video
              key={`${Math.random()}`}
              autoPlay={false}
              playsInline
              preload={"none"}
              poster={val.poster}
              loop={true}
              muted={true}
              src={`${val.images[0]}`}
            >
              {`${val.at}`}
            </video>

          )
        } else if (val.orientation === "landscape") {
          return (
            <video
              className={"landscape"}
              key={`${Math.random()}`}
              autoPlay={false}
              playsInline preload={"none"}
              poster={val.poster}
              loop={true}
              muted={true}
              src={`${val.images[0]}`}
            >
              {`${val.at}`}
            </video>
          )
        }
      }
      else {
        return (
          <object
            key={`${Math.random()}`}
            data={`${val.images[0]}`}
          >
            {`${val.at}`}
          </object>
        )
      }
    }

  }

  function CreatorMedal({ name }) {
    if (name) {
      return <BySign byColor={eval(name)[0]} byGradient={eval(name)[1]} >{name}</BySign>
    }
  }

  let filteredProjects = [];
  let filteredProducts = [];
  let filteredClients = [];

  state.projects.filter((val) => {
    filteredProjects.push(val)
  })
  state.projectClients.filter((val) => {
    filteredClients.push(val)
  })

  function QuickInfo() {
    return (
      <InfoBox
        mask={`-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0.1)))`}
        opacity={statement ? '1' : '0'}
      >
        <div className="icons">
          {program && <Program program={program} />}
          <CreatorMedal name={by} />
        </div>
        <Scroller
          mask={`-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))`}
        >
          {<p>
            {statement && `"${statement}"`}
            {`  
            `}
          </p>}
        </Scroller>
      </InfoBox>
    )
  }
  var x = window.matchMedia("(max-height: 1000px)");
  return (
    <>
      <Header id={value} />
      <Overlay className="container">
        {x.matches && <QuickInfo />}
        {/* SIDE LAYER */}
        <SideGroup>
          <Params left='60px'>
            {/* CREATORS */}
            <Param >
              <p className="paramGroup">Creator</p>
              {snap.by.map((val, key) => {
                return <BySign
                  key={key}
                  byColor={eval(val)[0]} byGradient={eval(val)[1]}
                  className={active ? 'active' : ''}
                  onClick={() => setActive(!active)}
                >
                  {val}
                </BySign>
              })}
            </Param>
            {/* YEARS */}
            <Param >
              <p className="paramGroup">Year</p>
              {snap.projectYears.map((val, key) => {
                const year = searchParams.get('filter') === `${val}`;
                return <p
                  key={key}
                  className={year ? 'active' :
                    searchParams.get('filter') ? 'inactive' : ''}
                  onClick={() => {
                    {
                      year
                        ? setSearchParams({ search: `${value}` })
                        : !searchParams.get('filter') &&
                        setSearchParams({ search: `${value}`, filter: `${val}` });
                    }
                  }}
                >
                  {val}
                </p>
              })}
            </Param>
            {/* MEDIUMS */}
            <Param>
              <p className="paramGroup">Medium</p>
              {snap.mediums.map((val, key) => {
                if (val) {
                  const medium = searchParams.get('filter') === `${val}`;
                  return <p
                    key={key}
                    className={active ? 'active' : ''}
                    onClick={() => {
                      setActive(!active);
                    }}
                  >
                    {val.toUpperCase()}
                  </p>
                }
              })}
            </Param>
          </Params>
          {!x.matches && <QuickInfo />}
        </SideGroup>
        <ResultsGroup>
          {filteredClients.length === 0 ? <h3>No Clients</h3> : <Number paddingLeft='30px' paddingRight='30px' right='15px'> Clients <h3>{filteredClients.length}</h3></Number>}
          {/* CLIENTS */}
          <ClientsLayer>
            {filteredClients.map(({ id, name }) => {
              return <Client key={Math.random()} onClick={select} to={`/${id}`}>{name}</Client>
            })}
          </ClientsLayer>
          {/* PROJECTS */}
          <ItemsLayer display={'grid'} height={'max-content'} paddingBottom={'40px'} mask={`-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0.1)))`}>
            {filteredProjects.length === 0 ? <h3>No Projects </h3> : <Number bottom='20px' right='25px'> Projects <h3>{snap.projects.length}</h3></Number>}
            {filteredProjects.map((work) => {
              // console.log(work);
              return <Item
                key={Math.random()}
                size='300px'
                onClick={select}
                className="bubbles"
                onMouseOver={(e) => {
                  if (e.currentTarget.children[1] && (e.currentTarget.children[1].tagName === 'VIDEO')) {
                    e.currentTarget.children[1].play()
                  }
                  work.statement && setStatement(work.statement)
                  work.program && !program && setProgram(work.program)
                  work.by && setBy(work.by)
                }} onMouseOut={() => {
                  setProgram(null)
                  setStatement('')
                  setBy(null)
                }
                }
                to={`${work.at}#${work.projectName.replace(/\s+/g, '').toLowerCase()}`}
              ><h3 className="queryBubbleText">{work.projectName}</h3>{Block(work)}</Item>
            })}
          </ItemsLayer>
          {/* PRODUCTS */}
          <ItemsLayer display={'block'} height={'min-content'} paddingBottom={'20px'}>
            {filteredClients.length === 0 ? <h3>No Products</h3> : <Number bottom='20px' right='25px'> Products <h3>{filteredClients.length}</h3></Number>}
            <Item size='125px !important' onClick={select} to={`/store`}><h3 className="queryBubbleText">Eko Digital</h3></Item>
          </ItemsLayer>
        </ResultsGroup>
      </Overlay>
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
const Overlay = styled.div`
  display: flex;

  margin: 0px 5px;
  position: fixed;
  z-index: 3500;
  overflow-x: visible;    
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 100%;
  padding: 20px;
  font-size: 14px;
  color: ${props => props.theme.panelColor};
  transition: 2.3s;
`
const SideGroup = styled.div`
  height: 100%;
  width: 260px;
  margin-right: 20px;
  padding-right: 20px;
	text-shadow: 1px 1px 10px ${props => props.theme.sky};
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  align-items: center;
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  justify-content: space-between;
  border: 1px solid;
  border-radius: 10px;
  border-color: transparent ${props => props.theme.panelColor}  transparent transparent;
`
const ResultsGroup = styled.div`
width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 220px;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  position: relative;
  overflow-x: visible;
`
const Number = styled.div`
  position: ${props => props.position};
  align-self: center;
  padding-right: ${props => props.paddingRight};
  padding-left: ${props => props.paddingLeft};
  /* bottom: ${props => props.bottom}; */
  /* right: ${props => props.right}; */
  /* margin-right: ${props => props.right}; */
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  height: min-content;
	text-shadow: 1px 1px 10px ${props => props.theme.panelColor};
    text-align: center;

  & h3{
    /* color: ${props => props.theme.LiHover}; */
    color: transparent;
    font-size: 36px;
    margin: 2px 0;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${props => props.theme.panelColor};
  }

`
const Client = styled(Link)`
  width: fit-content;
  height: min-content;
  font-size: 16px;
  white-space: nowrap;
  text-decoration: underline;
  color: inherit;
  background-color: ${props => props.theme.layerBG};
  border-radius: 12px;
  transition: 0.3s;
  padding: 10px;
  margin: 5px 10px;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
      text-shadow: 1px 1px 3px ${props => props.theme.sky};

  &:hover{
      background-color: ${props => props.theme.LiHover};
      -webkit-box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
      -moz-box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
      box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
      color: ${props => props.theme.textHover};
      text-shadow: 1px 1px 3px #ebebeb;
  }

`
const ClientsLayer = styled.div`
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-left: 40px;
  padding: 5px 0;
  display: contents;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  width: min-content;
  /* width: 100%; */
  height: 80px;
  column-gap: 30px;
  border: 1px solid;
  border-radius: 10px;
  /* border-bottom: 1px solid; */
  border-color: ${props => props.theme.panelColor} transparent transparent transparent;
  overflow-x: scroll !important;
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));


    ::-webkit-scrollbar {
      -webkit-appearance: none;
      height: 5px;
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
const Item = styled(HashLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.size};
  width: ${props => props.size};
  padding: 20px;
  border: 1px solid ${props => props.theme.panelColor};
  border-radius: 50%;
  color: inherit;
  transition: 0.3s;
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
    overflow: hidden;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    text-align: center;

    & *{
    pointer-events:  none;
    }
  &:hover{
    box-shadow: 0 8px 20px 0 ${props => props.theme.panelColor};
  }
  &:hover > object, &:hover > video{
    filter: grayscale(0) !important;
    opacity: 0.6;
  }
  &:hover > h3{
    /* color: ${props => props.theme.sky}; */
      /* border: 1px solid ${props => props.theme.panelColor}; */
      border-radius: 50px;
      padding: 10px;
      color: #ebebeb;
      background-color: ${props => props.theme.LiHover};
      color:  ${props => props.theme.textHover};
      -webkit-box-shadow: 0px 2px 10px 1px  ${props => props.theme.panelColor};
      -moz-box-shadow: 0px 2px 10px 1px  ${props => props.theme.panelColor};
      box-shadow: 0px 2px 10px 1px  ${props => props.theme.panelColor};
      text-shadow: 1px 1px 3px  ${props => props.theme.textHover};
  }
  & h3{
      text-shadow: 1px 1px 3px ${props => props.theme.sky};
    width: fit-content;
    pointer-events: none;
    z-index: 400;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -55%);
  }
  & p{
    position: absolute;

  }
  object{
    opacity: 0.2;
    min-height: 300px;
    max-width: 650px;
    filter: grayscale(1);
    transition: 0.3s;
    /* max-height: 100%; */
    /* min-width: 100%; */
    /* max-height: 200%; */
    /* max-width: 150%; */
    /* position: absolute; */
    /* top: 50%; */
    /* left: 50%; */
    /* transform: translate(-50%, -50%); */
  }
  video{
    pointer-events: none;
    min-height: 350px;
    max-width: 850px;
    opacity: 0.2;
    filter: grayscale(1);
    transition: 0.3s;
    pointer-events: none;
    object-fit: contain;
    margin: 0;
    padding: 0;
  }
  .landscape{
  height: 100% !important;
  width: auto !important;
  }
  video[poster]{
    object-fit: fill;
    filter: grayscale(1);
    transition: 0.3s;
  }
`
const ItemsLayer = styled.div`
position: relative;
transition: 0.3s;
  width: inherit;
    height:  ${props => props.height};
  /* margin-left: calc(var(--panelWidth) ); */
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-left: 20px !important;
  padding-top: 20px;
  padding-bottom: ${props => props.paddingBottom};
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  /* justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap; */
  column-gap: 20px;
  row-gap: 20px;
  border: 1px solid;
  border-radius: 10px;
  border-color: ${props => props.theme.panelColor} transparent transparent transparent;
  /* box-shadow: 1px 4px 2px ${props => props.theme.sky} inset; */
  /* border-bottom: 1px solid; */
  overflow-x: visible;
  overflow-y: scroll;

       @media screen and (min-width: 2640px) {
    & { 
      grid-template-columns: repeat(6, 1fr) !important;
    }
    & .bubbles{
      height: 14vw !important;
      width: 14vw !important;
    }
  }
      @media screen and (min-width: 1919px) {
    & { grid-template-columns: repeat(5, 1fr); 
    }
    & .bubbles h3{ 
      font-size: larger;
    }
    & .bubbles{
      height: 16vw;
      width: 16vw;
    }
  }

  @media (min-width: 1200px) and (max-width: 1918px) {
    & { grid-template-columns: repeat(5, 1fr); }
    & .bubbles h3{ 
      font-size: larger;
    }
    & .bubbles{
      height: 14vw !important;
      width: 14vw !important;
    }
  }
    @media only screen and (max-width: 1123) {
    & { grid-template-columns: repeat(4, 1fr); }
    & .bubbles h3{ 
      font-size: smaller;
    }
    & .bubbles{
      height: 11vw !important;
      width: 11vw !important;
    }
  }
  @media only screen and  (max-width: 1122px) {
    & { grid-template-columns: repeat(2, 1fr); }
    & .bubbles h3{ 
      /* font-size: large; */
    }
    & .bubbles{
      height: 200px !important;
      width: 200px!important;
    }
  }

    @media  (max-width: 993px) {
    & {display: ${props => props.grid} !important;}
    & .bubbles{
      height: 170px !important;
      width: 170px!important;
    }
  }
      @media screen and (max-width: 768) {
    & { grid-template-columns: repeat(2, 1fr); }
    & .bubbles h3{
      font-size: smaller;
    }
    & .bubbles{
      height: 50px !important;
      width: 50px!important;
    }
  }

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
const Params = styled.div`
  width: max-content;
  display: block;
  margin-bottom: 10px;
  /* position: fixed; */
  /* left: 330; */
  /* z-index: 2000; */
  /* left: ${props => props.left}; */
  display: flex;
    align-self: flex-end;
`
const Param = styled.div`
  color: ${props => props.theme.panelColor};
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  flex-wrap: nowrap;
  width: fit-content;
  height: fit-content;
  padding-right: 10px;
  margin-left: 10px;
  margin-top: calc(var(--panelWidth) + 1vh);
  border: 1px solid;
  border-radius: 10px;
  border-color:transparent ${props => props.theme.panelColor} transparent transparent;
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  align-items: center ;

  .active{
    color: ${props => props.theme.textHover};
    background-color: ${props => props.theme.LiHover};
    text-shadow: 1px 1px 3px  ${props => props.theme.textHover};
    font-style: italic;
    transform: skew(0deg, -10deg);
  }
  .inactive{
    cursor: default;
    color: ${props => props.theme.sky};
    background-color: ${props => props.theme.sky};
    text-shadow: 1px 1px 3px  ${props => props.theme.sky};
    
    &:hover{
    background-color: ${props => props.theme.sky};
    color: ${props => props.theme.sky};
    text-shadow: 1px 1px 3px  ${props => props.theme.sky};
    }
  }

  & .paramGroup{
    font-size: 10px !important;
    background-color: transparent !important;
    padding: 0px 6px 1px 6px !important;
    align-self: center;
    font-stretch: expanded !important;

    &:hover{
    background-color: none !important;
    color: inherit !important;
    }
  }

  & *{
    text-transform: lowercase;
    font-weight: 800;
    font-size: 12px;
    transition: 0.3s;
    background-color: ${props => props.theme.layerBG};
    margin: 10px 0;
    white-space: wrap;
    cursor: pointer;
    width: min-content;
    text-align: center;
    height: max-content;
    padding: 6px 9px 6px 9px;
    border-radius: 7px;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;
      /* background-color: ${props => props.theme.LiActiveBackground}; */
      /* border: 1px solid ${props => props.theme.LiHover}; */
      color: ${props => props.theme.panelColor};
      text-shadow: 1px 1px 3px ${props => props.theme.sky};

    &:hover{
    background-color: ${props => props.theme.LiActiveBackground};
    color:  ${props => props.theme.textHover};
    text-shadow: 9px 4px 13px  ${props => props.theme.textHover};
    }
  }
`
const InfoBox = styled.div`
pointer-events: none;
border-radius: 10px;
position: relative;
padding: 10px;
margin: 0 10px 20px 10px;
white-space: break-spaces;
line-height: 25px;
text-align: justify;
width: 100%;
overflow-x: hidden;
  overflow-y: hidden;
  text-overflow: ellipsis;
opacity: ${props => props.opacity};
transition: 0.6s;
border: 1px solid  ${props => props.theme.backdrop};
  background-color: ${props => props.theme.layerBG};
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  -webkit-box-shadow: 0px 2px 10px 1px ${props => props.theme.sky};
  -moz-box-shadow: 0px 2px 10px 1px ${props => props.theme.sky};
  box-shadow: 0px 2px 10px 1px ${props => props.theme.sky};
        -webkit-mask-image: ${props => props.mask} !important;

        & .icons{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding-right: 20px;
        }

    @media only screen and (max-height: 1000px) {
      &{
        mask-image: ${props => props.mask} !important;
        position: fixed !important;
        z-index: 3200;
        top: 30px !important;
        right: 30px;
        /* height: 20%; */
        /*  transform: translateY(50%); */
        width: 350px;
        height: 40vh;
        overflow-y: hidden;
      }
  }
`
export const Scroller = styled.div`
  /* animation: autoscroll 10s linear infinite; */
  @keyframes autoscroll {from {transform: translate3d(0,0,0);} to {transform: translate3d(0,-90%,0);}};

  & p{
  display: inline;
  padding: 3px;
}
`
export const BySign = styled.span`
  text-transform: uppercase !important;
  text-indent: 0;
  font-weight: 800;
  font-size: 11px;
  margin-left: 5px;
  display: inline-block;
  width: min-content;
  height: 20px;
  line-height: 17px;
  padding: 0px 5px;
  /* background-color: ${props => props.theme.panelColor}; */
  border-radius: 7px;
  color: ${props => props.theme.textHover};
	text-shadow: 1px 1px 10px ${props => props.theme.sky};
  background: ${props => props.byColor};
  background: ${props => props.byGradient};
  border: 1px solid ${props => props.theme.layerBG};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
`
export const AA = [`rgba(230,4,49,1)`,
  `linear-gradient(333deg, rgba(227,119,141,1) 0%, rgba(230,4,49,1) 100%)`]
export const CM = [`rgb(15,85,226)`,
  `linear-gradient(333deg, rgba(15,85,226,1) 0%, rgba(54,139,224,1) 100%)`]
export const ML = [`rgb(252,142,1)`,
  `linear-gradient(333deg, rgba(252,142,1,1) 0%, rgba(252,218,69,1) 100%)`]