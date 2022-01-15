//Navigator -- Child of <UI />
import React, { useRef } from "react"
import { state } from './state'
import { useSnapshot } from 'valtio'
import { Linker, Folder } from "./style"
import styled from "styled-components"
import Draggable from 'react-draggable'
import Search from "./search"
import { SvgNabla, Spinner, Arrow, SideArrow, Grabber, Speaker } from './svg'

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

    & .li{
    width: 80%;
    align-self: center;
    transition: 0.3s;
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
    bottom: 2%;
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
	}

	70% {
		transform: scale(1);
	}

	100% {
		transform: scale(0.8);
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
    bottom: 3%;
    transform: translate(-50%, 0);
  }
  .spinner path{
    fill: ${props => props.theme.panelColor};
  }
`

function Navigator() {
  const snap = useSnapshot(state);
  const nav = useRef(null);

  //intersection observer
  // style while dragging
  function glow(n) {
    if (nav) {
      if (n) {
        state.grabbed = true;
        console.log(state.grabbed);
      } else if (!n) {
        state.grabbed = false;
      }
    }
  }
  const grabber = document.querySelector(".grabber")



  const onControlledDrag = (e, position) => {
    let { x, y } = position;
    // console.log({ x, y });
    state.navPosition = { x, y };
    state.prtPosition = { x, y };
    state.setPosition = { x, y };



    nav.current.classList.add(".grabbing")

  };

  if (grabber) {
    grabber.addEventListener("onmousedown", onControlledDrag)
    grabber.addEventListener("onmouseup", onControlledDrag)
  }
  // if (nav.current !== null) {
  //   state.grabbed ? console.log("hey") : 
  // }

  return (
    //NAV
    <Draggable nodeRef={nav} handle=".grabber" bounds=".container" position={nav.position} onDrag={onControlledDrag} >
      <Nav ref={nav} className="Panel nav">
        <div className='header' >
          <SvgNabla />
        </div>
        <Search />
        <Linker className="li w" activeClassName="any" to="/info" style={{ cursor: "not-allowed" }}>
          Info
        </Linker>
        <Linker className="li w" activeClassName="any" to="/store">
          Store
        </Linker >
        <Linker className="li w" activeClassName="any" to="/blog" style={{ cursor: "not-allowed" }}>
          Blog
        </Linker >
        <Folder className="li folder portLink">
          Projects
          {snap.isPort ? <SideArrow /> : <Arrow />}
        </Folder>
        <Folder className="li folder settLink">
          Settings
          {snap.isSett ? <SideArrow /> : <Arrow />}
        </Folder>
        {snap.loading ? <Spinner /> : <Grabber />}
        {snap.playMusic ? <Speaker /> : null}
      </Nav>
    </Draggable>
  )
}

export default Navigator