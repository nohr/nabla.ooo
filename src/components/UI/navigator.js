//Navigator -- Child of <UI />
import React, { useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import { Linker, Folder } from "./style"
import styled from "styled-components"
import Draggable from 'react-draggable'
import Search from "./search"
import { SvgNabla, Spinner, Arrow, SideArrow, Grabber } from './svg'

const Nav = styled.div`
  padding: 0em 42.5px 30px 42.5px;
  position: fixed;
  left: var(--edge);
  top: var(--edge);
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
        padding: 5px 0px 21px;
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
    bottom: 4%;
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
    bottom: 23px;
     border: none;
    white-space: nowrap;
    pointer-events: all;
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
		color: ${props => props.theme.invert};
      -webkit-filter: drop-shadow(1px 1px 6px ${props => props.theme.invert});
      filter: drop-shadow(1px 1px 6px ${props => props.theme.invert});
	}

	100% {
		color: ${props => props.theme.panelColor};
	}
}
`

function Navigator() {
  const snap = useSnapshot(state);
  const nav = useRef(null);

  const onControlledDrag = (e, position) => {
    let { x, y } = position;
    state.navPosition = { x, y };
    state.prtPosition = { x, y };
    state.setPosition = { x, y };

    nav.current.classList.add("glow")
  };


  return (
    //NAV
    <Draggable nodeRef={nav} handle=".grabber" bounds=".container" position={nav.position} onDrag={onControlledDrag} >
      <Nav ref={nav} className="Panel nav">
        <div className='header' >
          <SvgNabla />
        </div>
        <Search />
        <div className="grid">
          <Linker className="li w" activeclassname="any" to="/info" style={{ cursor: "wait" }}>
            Info
          </Linker>
          <Linker className="li w" activeclassname="any" to="/store">
            Store
          </Linker >
          <Linker className="li w" activeclassname="any" to="/blog" style={{ cursor: "wait" }}>
            Blog
          </Linker >
          <Linker className="li w" activeclassname="any" to="/contrast" style={{ cursor: "wait" }}>
            Contrast
          </Linker >
          <Folder className="li folder portLink" tabIndex="0">
            Projects
            {snap.isPort ? <SideArrow /> : <Arrow />}
          </Folder>
          <Folder className="li folder settLink" tabIndex="0">
            Options
            {snap.isSett ? <SideArrow /> : <Arrow />}
          </Folder>
          {snap.playMusic && <p className="song" onClick={() => { state.isSett = true; }} tabIndex="0">nohri - tardigrade</p>}
        </div>
        {snap.loading ? <Spinner /> : <Grabber />}
        {/* {snap.playMusic ? <Speaker /> : null} */}
      </Nav>
    </Draggable>
  )
}

export default Navigator