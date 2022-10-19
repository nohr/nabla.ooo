//Projects -- Child of Panel
import React, { memo, useEffect, useMemo, useRef, useState } from "react"
import { cloud, state } from "../utils/state"
import { useSnapshot } from "valtio"
import Draggable from "react-draggable"
import styled from "styled-components"
import { getPosPro, GetSector, GetSectors, useWindowDimensions } from "../utils/common"
import { Link, useLocation } from "wouter"
// import { useInfiniteHits } from "react-instantsearch-hooks-web"

function Projects({ headwidth, select, open, close, confirm, reset }) {
  // const { hits } = useInfiniteHits({ transformItems });
  const [groupIndex, setGroupIndex] = useState(0);
  const [groupID, setGroupID] = useState(null);
  const pro = useRef(null);
  const [hover, setHover] = useState(false);
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const [location, setLocation] = useLocation();

  // offset and direction of panel from nav
  let vWidth = useWindowDimensions().width;
  let vHeight = useWindowDimensions().height;
  const offset = getPosPro(snap, vWidth, vHeight);
  const layout = snap.direction ?
    !state.proSwitched ?
      `padding-left: 45px;padding-right: 40px; flex-direction: column; white-space: wrap;`
      : `padding-left: 40px;padding-right: 45px; flex-direction: column; white-space: wrap;`
    : `padding: 80px 12px 0px; flex-direction: row;`;
  const projectListLayout = "display: flex !important; flex-direction: column; align-items: flex-end; justify-content: center; overflow: scroll;";
  const top = snap.direction ? "padding-top: 10px;" : snap.proSwitched ? "padding-top: 50px !important;" : "padding-top: 80px;";
  const secondHeader = snap.direction ? { width: "100%" } : { width: "64%", gridColumnStart: 2, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 1 };
  const hide = snap.isPro ? "opacity: 1; pointer-events: all; transition: 0.2s; " : "opacity: 0; pointer-events: none; transition: 0s;";

  useEffect(() => {
    !snap.isPro ? close() : open();
    return () => {
      // setGroupID(null);
    }
  }, [snap.isPro, open, close])

  let groups = ["projectMedium", "type"]
  function handleGroups() { setGroupIndex(prev => (prev + 1) % groups.length); reset(); }

  let filter = [];
  function GroupList() {
    // TODO: look for group id's and map each title and list
    clip.collection.map((work) => (work[groups[groupIndex]])
      && (filter.indexOf(work[groups[groupIndex]]) === -1)
      && filter.push(work[groups[groupIndex]]));

    filter.sort((a, b) => a.length - b.length);
    // clip.types.reverse();
    // console.log(filter);
    // Iterate over groups
    return <Group
      margin={snap.direction ? null : `
  margin: auto 20px;
  padding: 20px 25px;`}
    >
      {filter.map((title) => <TitleList
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <p style={secondHeader}
          onClick={handleGroups} id="selfhead">{title}</p>
        <div
          className="list">
          {/* TODO: order both by date */}
          {groupIndex === 0 && clip.collection
            .filter((work) => work.projectMedium === title)
            .map((work) => <>
              <Link onClick={() => { confirm(); setGroupID(work.id); GetSectors(work.id); }}
                // style={snap.direction ? { width: '70%' } : { width: '100%' }}
                className={`li w ${location.substring(1) === work.lot ? "active" : null}`}
                to={`/${work.lot}`} tabIndex={state.isPro ? "0" : "-1"}
                key={work.lot}>{work.projectName}</Link>
            </>)}
          {groupIndex === 1 && clip.collection
            .filter((work) => work.type === title)
            .map((work) => <>
              <div
                onClick={() => { select(); setGroupID(work.id); GetSectors(work.id); }}
                style={clip.direction ? { width: '70%' } : { width: '80%' }}
                className={`li w ${clip.sector[0] && (clip.sector[0].at === work.id) && "active"}`}
                tabIndex={state.isPro ? "0" : "-1"}
                key={work.lot}>{work.name}</div>
            </>)}
        </div>
      </TitleList>)}
    </Group>
  }

  function ProjectsList() {

    return (<>
      {clip.sectors.map((work) => (
        <Link onClick={() => { confirm(); GetSector(work.lot); }}
          style={snap.direction ?
            { width: '50%', margin: "0 auto" } : { width: '50%', margin: "0 auto" }}
          className={`li w ${location.substring(1) === work.lot ? "active" : null}`}
          to={`/${work.lot}`} tabIndex={state.isPro ? "0" : "-1"}
          key={work.lot}>{work.projectName}</Link>
      ))}
    </>)
  }

  function Back() {

    return (<p
      // className="li"
      style={snap.direction ? { width: "95%" } : { width: "64%" }}
      onClick={() => { reset(); setGroupID(null); cloud.sectors = []; }}
    >BACK
    </p>)
  }

  return (
    <Draggable nodeRef={pro} position={snap.proPosition} positionOffset={offset} onStart={() => false} >
      <Project hide={hide} layout={groupID ? projectListLayout : layout} top={top} ref={pro}
        className={clip.drag ? "Panel pro glow" : "Panel pro"}
        align={!snap.direction ? "center" : !snap.proSwitched ? "flex-end" : "flex-start"}
      >
        {groupID && <Back />}
        {!groupID ? <GroupList /> : <ProjectsList />}
        {snap.isOpt}
      </Project>
    </Draggable >
  )
}

export default memo(Projects)

const Project = styled.div`
    /* padding: var(--panelPadding); */
      padding-bottom: 0;
      position: absolute;
      z-index: 4800;
      left: var(--edge);
      margin: 20px 0 0 0;
      text-align: center;
      overflow: scroll !important;
      display: flex;
      align-items: ${props => props.align}; 
      justify-content: center;
      ${props => props.layout}
      ${props => props.hide}
      ${props => props.top}
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      &::-webkit-scrollbar{
        width: 0px;
        /* display: none; */
      }

      * .li{
        cursor: pointer;
      /* backdrop-filter: blur(10px) !important; */
      margin: 0 0 4px 0;
      width: 95%;
      transition: 0.9s !important;
  }
      p{
        cursor: pointer;
        margin: 3px auto 5px auto;
      overflow: visible;
      text-align: center;
      border: 1px solid;
      border-color: transparent transparent ${props => props.theme.panelColor} transparent;
      transition: 0.9s;
        border-radius: 10px;
      text-transform: uppercase !important;
      font-size: 10px !important;
      padding: 3px 0;
        
      &:hover{
        transition: 0.1s;
        font-weight: 900;
        color: ${props => props.theme.textHover};
        background-color:  ${props => props.theme.LiHover};
      }
    }

      .self, .client{
        display: flex !important;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      overflow-y: scroll;
      overflow-x: visible;
      padding: 2px 2px 0px 10px;
      width: 90%;

      .li{
        transition: 0.1s !important;
  }

      ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      position: absolute;
    }
      ::-webkit-scrollbar-thumb {
        background-color: transparent;
      border: 1px solid;
      border-color: ${props => props.theme.panelColor};
      border-radius: 4px;
      transition: 0.1s;
    }
      ::-webkit-scrollbar-thumb:hover {
        background-color: ${props => props.theme.panelColor};
      box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      transition: 0.1s;
    }
  }

    #selfhead, #clienthead{
      @media screen and (min-height: 1087px) and (max-height:1300px) {
        font-size: 0.8vh !important;
        }
      @media screen and (min-height:1300px) {
        font-size: 0.65vh !important;
        }
    }

      .self{
        padding-bottom: 0;
  }
      .client{
        padding-bottom: 32px;
  }
      `
const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: max-content;
  height: 100%;
  row-gap: 10px;
  ${props => props.margin}
    /* overflow: scroll; */
`
const TitleList = styled.div`
    display: flex;
    flex-direction: column;
    width: 140px !important;
    /* width: max-content !important; */

  & .list{
    display: flex;
    flex-direction: column;
    height: 100%;
    /* overflow: visible; */
    overflow: auto;
    align-items: center;
  }
`
