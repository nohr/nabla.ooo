//Navigator -- Child of <UI />
import React, { useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import { Folder } from "./style"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import Draggable from 'react-draggable'
import Search from "./search"
import { SvgNabla, Spinner, Arrow, SideArrow, Grabber } from './svg'

const Nav = styled.div`
  padding: 0em 42.5px 30px 42.5px;
  left: var(--edge);
  top: var(--edge);
  position: fixed;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  z-index: 5000;
  text-indent: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .grid{
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
    .header {
        border-bottom: 1px solid ${props => props.theme.panelColor};
        margin: 0 0 8px 0;
        padding: 10px 0px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .li{
    width: 80%;
    align-self: center;
    transition: 0.3s;
    -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .folder{
      padding-right: 5px;
    }

  & .speaker{
    cursor: pointer;
    position: absolute;
    z-index: 500;
    width: 12px;
    top: 5%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  & .grabber{  
    cursor: grab;
    width: 50px;
    position: absolute;
    z-index: 500;
    left: 50%;
    bottom: 8%;
    transform: translate(-50%, 0);
    stroke: ${props => props.theme.panelColor};
    fill: ${props => props.theme.panelColor};
    fill-opacity: 0% !important; 
    stroke-width: 1px !important;
    transition: 1.3s;
  }

  & .speaker{
    fill: ${props => props.theme.panelColor};
  	animation: pulse 2s infinite;
    transition: 1.3s;
}

@keyframes pulse {
	0% {
		transform: scale(0.8);
		fill: ${props => props.theme.panelColor};
	}

	70% {
		transform: scale(1);
		fill: ${props => props.theme.textHover};
	}

	100% {
		transform: scale(0.8);
		fill: ${props => props.theme.panelColor};
	}
}

  & .speaker:hover {
    fill: ${props => props.theme.LiHover};
    -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.LiHover});
    filter: drop-shadow(1px 1px 3px ${props => props.theme.LiHover});
    transition: 0.3s;
  }

  & .grabber:not(:hover){
    fill-opacity: 0% !important; 
    stroke-width: 1px !important;
  }

  .spinner {
    width: 25px;
    height: 25px;
    background: none;
    position: absolute;
    z-index: 500;
    pointer-events: none;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, 0);
  }
  .spinner path{
    fill: ${props => props.theme.panelColor};
  }

  .song{
    position: absolute;
     top: 3%;
    /* margin: 0 auto; */
    left: 48%;
    margin: 0;
    /* transform: translate(-30%, 0%) !important; */
    border: none;
    white-space: nowrap;
    /* pointer-events: none;
    opacity: 0; */
    animation: flash 2s infinite;
    transition: 1.3s;
    cursor: pointer;
    -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }
  @keyframes flash {
	0% {
		color: ${props => props.theme.panelColor};
	}

	70% {
		color: ${props => props.theme.sky};
    -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.sky});
    filter: drop-shadow(1px 1px 6px ${props => props.theme.sky});
	}

	100% {
		color: ${props => props.theme.panelColor};
	}
}
`

function Navigator() {
  const snap = useSnapshot(state);
  const nav = useRef(null);

  // console.log(state.navPosition);

  const onControlledDrag = (e, position) => {
    let { x, y } = position;
    state.navPosition = { x, y };
    state.prtPosition = { x, y };
    state.setPosition = { x, y };

    nav.current.classList.add("glow")
  };

  const songVis = state.playMusic ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" };

  return (
    //NAV
    <Draggable nodeRef={nav} handle=".grabber" bounds=".container" onDrag={onControlledDrag} >
      <Nav ref={nav} className="Panel nav">
        <div className='header'>
          <SvgNabla />
        </div>
        <Search />
        <div className="grid">
          <NavLink className="li w" to="/info" style={{ cursor: "wait" }}>
            Info
          </NavLink>
          <NavLink className="li w" to="/store">
            Store
          </NavLink >
          <NavLink className="li w" to="/blog">
            Blog
          </NavLink >
          <NavLink className="li w" to="/contrast" style={{ cursor: "wait" }}>
            Contrast
          </NavLink >
          <Folder className="li folder portLink" tabIndex="0">
            Projects
            {snap.isPort ? <SideArrow /> : <Arrow />}
          </Folder>
          <Folder className="li folder settLink" tabIndex="0">
            Options
            {snap.isSett ? <SideArrow /> : <Arrow />}
          </Folder>
        </div>
        <p className="song" style={songVis} onClick={() => { state.isSett = true; }} tabIndex="0">nohri - tardigrade</p>
        {snap.loading ? <Spinner /> : <Grabber />}
      </Nav>
    </Draggable>
  )
}

export default Navigator