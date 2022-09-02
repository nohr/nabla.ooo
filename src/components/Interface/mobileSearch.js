import React, { useRef, useEffect } from 'react'
import { ClearIcon } from '../utils/svg';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { cloud, state } from '../utils/state';
import { Folder, offset } from '../utils/common';
import Draggable from 'react-draggable';
import { } from './mobileNavigator';
import { useLocation } from 'wouter';

export function Search({
    Bar, options,
    refine, clear, navWrap,
    query, setModal, select, reset, modal }) {
    const searchWrap = useRef(null);
    const snap = useSnapshot(state);
    const clip = useSnapshot(cloud);
    const [location, setLocation] = useLocation();

    function handleChange(e) {
        if (e.target.value) {
            setLocation('/');
            refine(e.target.value);
        } else {
            clear();
        }
    };

    useEffect(() => {
        Bar.current.focus();
        if (navWrap.current) { navWrap.current.style.overflowX = "clip" };
        if (!snap.dragged) {
            state.mobileNavPosition.y = state.mobileNavPosition.y + (offset);
        } else {
            // state.searchPosition.x = 0;
            navWrap.current.style.transition = "1.3s";
            // state.searchPosition = { x: 0, y: 0 };
            // state.optionsPosition = { x: 0, y: 0 };
            // state.grabberPosition = { x: 0, y: 0 };
            state.mobileNavPosition = { x: 0, y: options ? (offset * 2) : offset };
            setTimeout(() => {
                navWrap.current.style.transition = "0.1s";
            }, "1300");
        }
        cloud.preview = [];

        function handleKeyPress(e) {
            if (e.key === "Enter") {
                Bar.current.blur();
                setModal(false);
                select();
                return;
            }
        }

        if (Bar.current) {
            Bar.current.addEventListener("keydown", handleKeyPress);
        }

        return () => {
            if (Bar.current) {
                Bar.current.removeEventListener("keydown", handleKeyPress);
            }
            if (navWrap.current) { navWrap.current.style.overflowX = "visible" };
            if (!snap.dragged) {
                state.mobileNavPosition.y = state.mobileNavPosition.y - offset;
            }
        }
    }, [])
    return <Draggable nodeRef={searchWrap} bounds=".searchBounds" position={snap.searchPosition} axis="x" onStart={() => false}>
        <SearchWrapper
            ref={searchWrap}
            id='search'
            className="modalContent"
            opacity={modal !== "search" ? "0" : "1"}
            pointerEvents={modal !== "search" ? "none" : "all"}
            transition={modal !== "search" ? "0.3s" : "unset"}
        >
            <SearchBar
                onTouchEnd={e => {
                    e.target.focus();
                    navWrap.current.style.overflowX = "clip";
                    navWrap.current.style.transition = "1.3s";
                    state.mobileNavPosition = { x: 0, y: options ? (offset * 2) : offset };
                    // state.dragged = false;
                    setTimeout(() => {
                        navWrap.current.style.transition = "0.1s";
                    }, "1300");
                }}
                onBlur={() =>
                    navWrap.current.style.overflowX = "visible"}
                placeholder={'Search'}
                type="text"
                value={query}
                onChange={(e) => handleChange(e)}
                ref={Bar}
            ></SearchBar>
            {query.length > 0 &&
                <Folder onTouchEnd={() => {
                    reset();
                    navWrap.current.style.overflowX = "clip";
                    clear();
                    Bar.current.focus();
                }}
                    id="clearIcon"
                ><ClearIcon />
                </Folder>}
        </SearchWrapper>
    </Draggable>
}
const SearchWrapper = styled.div`
    pointer-events: all !important;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row !important;
height: 70px !important;
  margin: 40px 0 0 0;
  column-gap: 10px !important;

    & .li, & .folder{
   backdrop-filter: blur(20px) !important;
      border: 1px solid ${props => props.theme.panelColor};
      border-radius: 50%;
        display:flex;
        justify-content: center;
        flex-direction: column;
        height: 40px;
        width: 40px;
        padding: 2px;
    }
    #clearIcon{
        margin: 0 !important;
        padding: 0 !important;
        position: unset;
        height: 38px;
        width: 38px;
        svg{
            position: unset !important;
            transform: unset;
            -webkit-filter: none;
            filter: none;
            overflow: visible !important;
            fill: transparent !important;
            stroke-width: 1px !important;
            stroke: ${props => props.theme.panelColor} !important;
            width: 100% !important;
            height: 100% !important;
        }
    }
`
const SearchBar = styled.input`
/* position: absolute; */
  user-select: text;
  -ms-user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  width: 60%;
  height: 40px;
  display: flex;
  /* background-color: ${props => props.theme.LiActiveBackground}; */
  background-color: transparent;
  box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
  -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
  -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor}; 
  color: ${props => props.theme.panelColor};
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  cursor: pointer;
  /* border: 0.5px solid ${props => props.theme.panelColor}; */
  border: none;
  border-radius: 25px;
  padding: 6px 19px 6px 20px;
  font-size: 15px;
  -webkit-appearance: none !important;
   backdrop-filter: blur(20px) !important;
  text-align: center;

  &::placeholder{
    color: ${props => props.theme.panelColor};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

  }

  &:focus::placeholder{
    color: ${props => props.theme.textHover};
    transition: 0.3s;
  }
  &:focus{
    color: ${props => props.theme.textHover};
    background-color:${props => props.theme.LiHover};
    outline-color:${props => props.theme.textHover};
    border: none;
    box-shadow:0px 20px 50px 10px  ${props => props.theme.LiHover};
    -webkit-box-shadow: 0px 20px 50px 10px ${props => props.theme.LiHover};
    -moz-box-shadow:0px 20px 50px 10px ${props => props.theme.LiHover};
    transition: 0.3s;
  }
  
  &:focus ~ #clearIcon svg, &:hover ~ #clearIcon svg{
            -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover}) !important;
        filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover}) !important;
    stroke: ${props => props.theme.textHover} !important;
    transition: 0.3s;
  }
`