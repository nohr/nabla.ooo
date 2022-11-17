import { useState } from "react";
import { state, cloud } from "../../utils/state";
import { useSnapshot } from "valtio";
import styled from "styled-components";
import { Header, Program } from "../../utils/svg";
// import { HashLink } from "react-router-hash-link";
// Search Imports
import { useHits, useRefinementList } from "react-instantsearch-hooks-web";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { useDocumentTitle } from "../../utils/common";
import { Link } from "wouter";

export function CreatorMedal({ name }) {
  if (name) {
    return (
      <BySign
        onClick={
          name === "AA"
            ? () => navigator.clipboard.writeText("aite@nabla.ooo")
            : () => null
        }
        byColor={eval(name)[0]}
        byGradient={eval(name)[1]}
      >
        {name}
      </BySign>
    );
  }
}

export function Results({ select, confirm }) {
  const snap = useSnapshot(state);
  const { query, refine } = useSearchBox();
  useDocumentTitle(`${query} - Search Results`);
  const [active, setActive] = useState(false);
  const [statement, setStatement] = useState(null);
  const [program, setProgram] = useState(null);
  const [by, setBy] = useState(null);
  let opacity = query.length > 0 ? "1" : "0";
  let pointerEvents = query.length ? "all" : "none";
  let transition = query.length ? "0.3s" : "0s";

  // Results image slider
  function Block(hit) {
    if (hit.images) {
      // Get enxtentions of files
      const types = new Map([
        ["jpg", "img"],
        ["jpeg", "img"],
        ["png", "img"],
        ["gif", "img"],
        ["mp4", "video"],
        ["svg", "svg"],
      ]);
      const url = new URL(hit.images[0]);
      const extension = url.pathname.split(".");
      const element = types.get(extension[extension.length - 1].toLowerCase());

      if (element === "video") {
        if (hit.orientation === "portrait") {
          return (
            <video
              key={`${Math.random()}`}
              autoPlay={false}
              playsInline
              preload={"none"}
              poster={hit.poster}
              loop={true}
              muted={true}
              src={hit.images[0]}
            >
              {hit.at}
            </video>
          );
        } else if (hit.orientation === "landscape") {
          return (
            <video
              className={"landscape"}
              key={`${Math.random()}`}
              autoPlay={false}
              playsInline
              preload={"none"}
              poster={hit.poster}
              loop={true}
              muted={snap.muted}
              src={hit.images[0]}
            >
              {hit.at}
            </video>
          );
        }
      } else {
        return (
          <object key={`${Math.random()}`} data={hit.images[0]}>
            {hit.at}
          </object>
        );
      }
    }
  }

  function QuickInfo() {
    return (
      <InfoBox
        mask={`-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,3)), to(rgba(0,0,0,0)))`}
        opacity={statement ? "1" : "0"}
      >
        <div className="icons">
          {program && <Program program={program} />}
          <CreatorMedal name={by} />
        </div>
        <Scroller animation="autoscroll 10s linear infinite">
          {<p>{statement && `"${statement}"`}</p>}
        </Scroller>
      </InfoBox>
    );
  }

  function hoverPlay(e) {
    // Get the second child as video
    let video;
    var playPromise;
    e.currentTarget.children[1] && (video = e.currentTarget.children[1]);
    // Show loading animation if the video isn't loaded
    video && video.tagName === "VIDEO" && (playPromise = video.play());
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          cloud.UILoading = false;
          // Play on hover if it's a video
          // video.pause();
          return;
        })
        .catch((error) => {
          cloud.UILoading = true;
          console.log(error);
          return;
        });
    }
  }

  // Initialize catergories and filter hits
  const { hits } = useHits();

  const options = {
    attribute: "projectMedium",
    operator: "and",
    sortBy: ["count:desc", "name:asc", "isRefined:desc"],
  };
  const { mediums, results, sendEvent } = useRefinementList(options);

  // console.log(mediums);
  let filteredClients = [];
  let filteredCreators = [];
  let filteredYears = [];
  let filteredProjects = [];
  let filteredProducts = [];

  if (query.length > 0) {
    hits.filter((hit) => {
      hit.name && filteredClients.push(hit);
      hit.projectClient && filteredProjects.push(hit);
      hit.productName && filteredProducts.push(hit);
      let year = "2020";
      // hit.projectYear && (console.log(hit.projectYear))
      year && filteredYears && (year = eval(year));
      year &&
        filteredYears &&
        filteredYears.indexOf(year) === -1 &&
        filteredYears.push(year);
      filteredYears &&
        filteredYears.sort(function (a, b) {
          if (b) {
            return b - a;
          }
        });
      hit.by &&
        filteredCreators &&
        filteredCreators.indexOf(hit.by) === -1 &&
        filteredCreators.push(hit.by);
    });
    return (
      <>
        <Header id={query} />
        <Overlay
          opacity={opacity}
          pointerEvents={pointerEvents}
          transition={transition}
          className="container"
        >
          {/* SIDE LAYER */}
          <SideGroup>
            <Params left="60px">
              {/* CREATORS */}
              <Param>
                <p className="paramGroup">Creator</p>
                {filteredCreators.map((val, key) => {
                  return (
                    <BySign
                      key={key}
                      byColor={eval(val)[0]}
                      byGradient={eval(val)[1]}
                      className={active ? "active" : ""}
                      onClick={() => setActive(!active)}
                    >
                      {val}
                    </BySign>
                  );
                })}
              </Param>
              {/* YEARS */}
              <Param>
                <p className="paramGroup">Year</p>
                {filteredYears.map((val, key) => {
                  const year = query === `${val}`;
                  return (
                    <p
                      key={key}
                      className={year ? "active" : query ? "inactive" : ""}
                      onClick={() => {
                        year
                          ? refine({ search: `${query}` })
                          : !query &&
                            refine({ search: `${query}`, filter: `${val}` });
                      }}
                    >
                      {val}
                    </p>
                  );
                })}
              </Param>
              {/* MEDIUMS */}
              <Param>
                <p className="paramGroup">Medium</p>
                {mediums &&
                  mediums.map((val, key) => {
                    if (val) {
                      return (
                        <p
                          key={key}
                          className={active ? "active" : ""}
                          onClick={() => {
                            setActive(!active);
                          }}
                        >
                          {val.toUpperCase()}
                        </p>
                      );
                    }
                  })}
              </Param>
            </Params>
            {!window.matchMedia("(max-height: 1000px)").matches && (
              <QuickInfo />
            )}
          </SideGroup>
          {window.matchMedia("(max-height: 1000px)").matches && <QuickInfo />}
          <ResultsGroup>
            {/* CLIENTS */}
            {/* {filteredClients.length === 0 ? <h3>No Clients</h3> : <Number paddingLeft='30px' paddingRight='30px' right='15px'> Clients <h3>{filteredClients.length}</h3></Number>}
            <ClientsLayer>
              {filteredClients.map(one => (
                <Client key={Math.random()}
                  onClick={() => { select(); refine(''); }}
                  to={`/${one.id}`}>{one.name}</Client>
              ))}
            </ClientsLayer> */}
            {/* PROJECTS */}
            <ItemsLayer
              display={"grid"}
              height={"min-content"}
              paddingBottom={"40px"}
              mask={`-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0.1)))`}
            >
              {filteredProjects.length === 0 ? (
                <h3>No Projects </h3>
              ) : (
                <Number bottom="20px" right="25px">
                  {" "}
                  Projects <h3>{filteredProjects.length}</h3>
                </Number>
              )}
              {hits.map(
                (hit) =>
                  hit.projectClient && (
                    <Item
                      key={Math.random()}
                      size="300px"
                      onClick={() => {
                        confirm();
                        refine("");
                      }}
                      className="bubbles"
                      onMouseOver={(e) => {
                        if (
                          e.currentTarget.children[1] &&
                          e.currentTarget.children[1].tagName === "VIDEO"
                        ) {
                          e.currentTarget.children[1].play();
                        }
                        hit.statement && setStatement(hit.statement);
                        hit.program && !program && setProgram(hit.program);
                        hit.by && setBy(hit.by);
                      }}
                      onMouseOut={() => {
                        setProgram(null);
                        setStatement("");
                        setBy(null);
                      }}
                      to={`/${hit.lot}`}
                    >
                      <h3 className="queryBubbleText">{hit.projectName}</h3>
                      {Block(hit)}
                    </Item>
                  )
              )}
            </ItemsLayer>
            {/* PRODUCTS */}
            <ItemsLayer
              display={"block"}
              height={"min-content"}
              paddingBottom={"20px"}
            >
              {filteredProducts.length === 0 ? (
                <h3>No Products</h3>
              ) : (
                <Number bottom="20px" right="25px">
                  {" "}
                  Products <h3>{filteredProducts.length}</h3>
                </Number>
              )}
              {filteredProducts.map(
                (hit) =>
                  hit.productName && (
                    <Item
                      key={Math.random()}
                      size="125px !important"
                      onClick={() => {
                        select();
                        refine("");
                      }}
                      onMouseOver={(e) => {
                        hoverPlay(e);
                        hit.statement && setStatement(hit.statement);
                        hit.program && !program && setProgram(hit.program);
                        hit.by && setBy(hit.by);
                      }}
                      onMouseOut={() => {
                        setProgram(null);
                        setStatement("");
                        setBy(null);
                      }}
                      to={`store#${hit.lot}`}
                    >
                      <h3 className="queryBubbleText">{hit.productName}</h3>
                      {Block(hit)}
                    </Item>
                  )
              )}
            </ItemsLayer>
          </ResultsGroup>
        </Overlay>
      </>
    );
  }
}

const Overlay = styled.div`
  display: flex;
  opacity: ${(props) => props.opacity};
  pointer-events: ${(props) => props.pointerEvents};
  transition: ${(props) => props.transition};
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
  color: ${(props) => props.theme.panelColor};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const SideGroup = styled.div`
  height: 100%;
  width: 260px;
  margin-right: 20px;
  padding-right: 20px;
  text-shadow: 1px 1px 10px ${(props) => props.theme.sky};
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  align-items: center;
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  justify-content: space-between;
  border: 1px solid;
  border-radius: 10px;
  border-color: transparent ${(props) => props.theme.panelColor} transparent
    transparent;
`;
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
`;
const Number = styled.div`
  position: ${(props) => props.position};
  align-self: center;
  padding-right: ${(props) => props.paddingRight};
  padding-left: ${(props) => props.paddingLeft};
  /* bottom: ${(props) => props.bottom}; */
  /* right: ${(props) => props.right}; */
  /* margin-right: ${(props) => props.right}; */
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  height: min-content;
  text-shadow: 1px 1px 10px ${(props) => props.theme.panelColor};
  text-align: center;

  & h3 {
    /* color: ${(props) => props.theme.LiHover}; */
    color: transparent;
    font-size: 36px;
    margin: 2px 0;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${(props) => props.theme.panelColor};
  }
`;
// const Client = styled(Link)`
//   width: fit-content;
//   height: min-content;
//   font-size: 16px;
//   font-weight: 300;
//   white-space: nowrap;
//   /* text-decoration: underline; */
//   color: inherit;
//   background-color: ${props => props.theme.layerBG};
//   border-radius: 12px;
//   border: 1px solid transparent;
//   transition: 0.3s;
//   padding: 10px;
//   margin: 5px 10px;
//     -webkit-user-drag: none;
//     user-select: none;
//     -moz-user-select: none;
//     -webkit-user-select: none;
//     -ms-user-select: none;
//   text-shadow: 1px 1px 3px ${props => props.theme.panelColor};

//   &:hover{
//       border: 1px solid ${props => props.theme.panelColor};
//       background-color: ${props => props.theme.LiHover};
//       -webkit-box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
//       -moz-box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
//       box-shadow: 0px 2px 10px 1px ${props => props.theme.LiHover};
//       color: ${props => props.theme.textHover};
//       text-shadow: 1px 1px 3px #ebebeb;
//   }

// `
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
  border-color: ${(props) => props.theme.panelColor} transparent transparent
    transparent;
  overflow-x: scroll !important;
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    height: 5px;
    display: flex;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.panelColor};
    border-radius: 4px;
    /* transition: 0.3s; */
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.panelColor};
    box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    /* transition: 0.3s; */
  }
`;
const Item = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  border: 1px solid ${(props) => props.theme.panelColor};
  border-radius: 50%;
  color: inherit;
  transition: 0.6s;
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  overflow: hidden;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  text-align: center;

  & * {
    pointer-events: none;
  }
  &:hover {
    width: calc(inherit + 30px);
    height: calc(inherit + 30px);
    /* box-shadow: 0 8px 20px 0 ${(props) => props.theme.panelColor}; */
  }
  &:hover > object,
  &:hover > video {
    filter: grayscale(0) !important;
    opacity: 0.6;
  }
  &:hover > h3 {
    /* color: ${(props) => props.theme.sky}; */
    /* border: 1px solid ${(props) => props.theme.panelColor}; */
    border-radius: 50px;
    color: #ebebeb;
    background-color: ${(props) => props.theme.LiHover};
    color: ${(props) => props.theme.textHover};
    text-shadow: 1px 1px 3px ${(props) => props.theme.textHover};
  }
  & h3 {
    white-space: pre-wrap;
    padding: 20px;
    font-weight: 300;
    text-shadow: 1px 1px 3px ${(props) => props.theme.panelColor};
    width: min-content;
    text-align: justify;
    pointer-events: none;
    z-index: 400;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -55%);
  }
  & p {
    position: absolute;
  }
  object {
    opacity: 0.2;
    min-height: 100%;
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
  video {
    pointer-events: none;
    min-height: 350px;
    max-width: 100%;
    opacity: 0.2;
    filter: grayscale(1);
    transition: 0.3s;
    pointer-events: none;
    object-fit: contain;
    margin: 0;
    padding: 0;
  }
  .landscape {
    min-height: 100% !important;
    height: 100% !important;
    width: auto !important;
  }
  video[poster] {
    object-fit: fill;
    filter: grayscale(1);
    transition: 0.3s;
  }
`;
const ItemsLayer = styled.div`
  position: relative;
  transition: 0.3s;
  width: inherit;
  height: ${(props) => props.height};
  /* margin-left: calc(var(--panelWidth) ); */
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-left: 20px !important;
  padding-top: 20px;
  padding-bottom: ${(props) => props.paddingBottom};
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
  border-color: ${(props) => props.theme.panelColor} transparent transparent
    transparent;
  /* box-shadow: 1px 4px 2px ${(props) => props.theme.sky} inset; */
  /* border-bottom: 1px solid; */
  overflow-x: visible;
  overflow-y: scroll;

  @media screen and (min-width: 2640px) {
    & {
      grid-template-columns: repeat(6, 1fr) !important;
    }
    & .bubbles {
      height: 14vw !important;
      width: 14vw !important;
    }
  }
  @media screen and (min-width: 1919px) {
    & {
      grid-template-columns: repeat(5, 1fr);
    }
    & .bubbles h3 {
      font-size: larger;
    }
    & .bubbles {
      height: 16vw;
      width: 16vw;
    }
  }

  @media (min-width: 1200px) and (max-width: 1918px) {
    & {
      grid-template-columns: repeat(5, 1fr);
    }
    & .bubbles h3 {
      font-size: larger;
    }
    & .bubbles {
      height: 14vw !important;
      width: 14vw !important;
    }
  }
  @media only screen and (max-width: 1123) {
    & {
      grid-template-columns: repeat(4, 1fr);
    }
    & .bubbles h3 {
      font-size: smaller;
    }
    & .bubbles {
      height: 11vw !important;
      width: 11vw !important;
    }
  }
  @media only screen and (max-width: 1122px) {
    & {
      grid-template-columns: repeat(2, 1fr);
    }
    & .bubbles h3 {
      /* font-size: large; */
    }
    & .bubbles {
      height: 200px !important;
      width: 200px !important;
    }
  }

  @media (max-width: 993px) {
    & {
      display: ${(props) => props.grid} !important;
    }
    & .bubbles {
      height: 170px !important;
      width: 170px !important;
    }
  }
  @media screen and (max-width: 768) {
    & {
      grid-template-columns: repeat(2, 1fr);
    }
    & .bubbles h3 {
      font-size: smaller;
    }
    & .bubbles {
      height: 50px !important;
      width: 50px !important;
    }
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
    display: flex;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.panelColor};
    border-radius: 4px;
    /* transition: 0.3s; */
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.panelColor};
    box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    /* transition: 0.3s; */
  }
`;
const Params = styled.div`
  width: max-content;
  display: block;
  margin-bottom: 10px;
  /* position: fixed; */
  /* left: 330; */
  /* z-index: 2000; */
  /* left: ${(props) => props.left}; */
  display: flex;
  align-self: flex-end;
`;
const Param = styled.div`
  color: ${(props) => props.theme.panelColor};
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  flex-wrap: nowrap;
  width: fit-content;
  height: fit-content;
  padding-right: 10px;
  margin-left: 10px;
  margin-top: calc(var(--panelWidth) + 40px);
  border: 1px solid;
  border-radius: 10px;
  border-color: transparent ${(props) => props.theme.panelColor} transparent
    transparent;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  align-items: center;

  .active {
    color: ${(props) => props.theme.textHover};
    background-color: ${(props) => props.theme.LiHover};
    text-shadow: 1px 1px 3px ${(props) => props.theme.textHover};
    font-style: italic;
    border: 1px solid ${(props) => props.theme.panelColor};
    /* transform: skew(0deg, -10deg); */
  }
  .inactive {
    cursor: default;
    color: ${(props) => props.theme.sky};
    background-color: ${(props) => props.theme.sky};
    text-shadow: 1px 1px 3px ${(props) => props.theme.sky};

    &:hover {
      background-color: ${(props) => props.theme.sky};
      color: ${(props) => props.theme.sky};
      text-shadow: 1px 1px 3px ${(props) => props.theme.sky};
    }
  }
  & .paramGroup {
    font-size: 10px !important;
    background-color: transparent !important;
    padding: 0px 6px 1px 6px !important;
    align-self: center;
    font-stretch: expanded !important;
    text-shadow: 9px 4px 13px ${(props) => props.theme.panelColor};

    &:hover {
      background-color: none !important;
      color: inherit !important;
      text-shadow: none !important;
    }
  }
  & * {
    font-weight: 800;
    text-transform: lowercase;
    font-size: 12px;
    transition: 0.3s;
    background-color: ${(props) => props.theme.layerBG};
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
    /* background-color: ${(props) => props.theme.LiActiveBackground}; */
    /* border: 1px solid ${(props) => props.theme.LiHover}; */
    color: ${(props) => props.theme.panelColor};
    text-shadow: 1px 1px 3px ${(props) => props.theme.sky};

    &:hover {
      background-color: ${(props) => props.theme.LiActiveBackground};
      color: ${(props) => props.theme.textHover};
      text-shadow: 9px 4px 13px ${(props) => props.theme.textHover};
    }
  }
`;
export const InfoBox = styled.div`
  width: ${(props) => props.width};
  pointer-events: none;
  border-radius: 10px;
  position: relative;
  padding: 10px;
  margin: 0 10px 20px 10px;
  white-space: break-spaces;
  line-height: 25px;
  text-align: justify;
  overflow-x: hidden;
  overflow-y: hidden;
  text-overflow: ellipsis;
  opacity: ${(props) => props.opacity};
  transition: 0.6s;
  border: 1px solid ${(props) => props.theme.backdrop};
  background-color: ${(props) => props.theme.layerBG};
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  -webkit-box-shadow: 0px 2px 10px 1px ${(props) => props.theme.sky};
  -moz-box-shadow: 0px 2px 10px 1px ${(props) => props.theme.sky};
  box-shadow: 0px 2px 10px 1px ${(props) => props.theme.sky};
  -webkit-mask-image: ${(props) => props.mask} !important;
  mask-image: ${(props) => props.mask} !important;

  @media screen and (max-width: 768px) {
    border: 1px solid ${(props) => props.theme.panelColor} !important;
    color: ${(props) => props.theme.panelColor} !important;
  }
  & .icons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
  }

  @media only screen and (max-height: 1000px) {
    & {
      background-color: ${(props) => props.theme.sky};
      position: fixed !important;
      z-index: 3200;
      top: 30px !important;
      right: 30px;
      /* height: 20%; */
      /*  transform: translateY(50%); */
      width: 350px;
      height: 30vh;
      overflow-y: hidden;
    }
  }
`;
export const Scroller = styled.div`
  /* animation: ${(props) => props.animation}; */
  @keyframes autoscroll {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, -90%, 0);
    }
  }

  & p {
    display: inline;
    padding: 3px;
  }
`;
export const BySign = styled.span`
  cursor: pointer;
  border-radius: 7px;
  text-transform: uppercase !important;
  text-indent: 0;
  font-weight: 800 !important;
  font-size: 11px;
  margin-left: 5px;
  display: inline-block;
  width: min-content;
  height: 20px;
  line-height: 17px;
  padding: 0px 5px;
  /* background-color: ${(props) => props.theme.panelColor}; */
  color: ${(props) => props.theme.textHover};
  text-shadow: 1px 1px 10px ${(props) => props.theme.sky};
  background: ${(props) => props.byColor};
  background: ${(props) => props.byGradient};
  border: 1px solid ${(props) => props.theme.layerBG};
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  &:hover {
    border: 1px solid ${(props) => props.theme.panelColor};
  }
`;
export const AA = [
  `rgba(230,4,49,1)`,
  `linear-gradient(333deg, rgba(227,119,141,1) 0%, rgba(230,4,49,1) 100%)`,
];
export const CM = [
  `rgb(15,85,226)`,
  `linear-gradient(333deg, rgba(15,85,226,1) 0%, rgba(54,139,224,1) 100%)`,
];
export const ML = [
  `rgb(252,142,1)`,
  `linear-gradient(333deg, rgba(252,142,1,1) 0%, rgba(252,218,69,1) 100%)`,
];
