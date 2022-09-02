import React, { useEffect, useRef } from "react"
import { cloud, state } from "../utils/state"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { useSnapshot } from "valtio"
import { activeTap, characters, handleClick, newQuote, unActiveTap } from "../utils/common"
import Scrambler from "scrambling-text"
import Draggable from "react-draggable"

export function HomeButton({ clear, query, dong, nabla }) {
  const svg = useRef(null);
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);

  return (
    <Homer className="nablaWrapper" to="/"
      style={{ backgroundColor: snap.drag ? props => props.theme.panelColor : "transparent" }}
      ref={nabla}
      onClick={() => handleClick(clip, query, dong, clear, nabla, svg)}
      onMouseDown={() => !clip.talking && activeTap(nabla, svg)}
      onMouseUp={() => !clip.talking && unActiveTap(nabla, svg)}
      onTouchStart={() => !clip.talking && activeTap(nabla, svg)}
      onTouchEnd={() => !clip.talking && unActiveTap(nabla, svg)}
    >
      <svg
        ref={svg}
        xmlns="http://www.w3.org/2000/svg"
        height="38px"
        className="HomeButton"
        data-name="Layer 1"
        viewBox="0 0 708.11 294.33"
      >
        <path d="M391.8 96.05a20.47 20.47 0 0120.57 20.57 19.87 19.87 0 01-2.78 10.27 20.59 20.59 0 01-7.5 7.5 20.77 20.77 0 01-20.64 0 20.56 20.56 0 0110.35-38.34zm0 4a16 16 0 00-8.31 2.23 16.5 16.5 0 00-6 6 16.57 16.57 0 000 16.57 16.54 16.54 0 006 6 16.69 16.69 0 0016.6 0 16.39 16.39 0 006-6 16.59 16.59 0 000-16.58 16.53 16.53 0 00-6-6 16.08 16.08 0 00-8.29-2.19zm9.35 11.65l-4.41 1q-1.42-3.7-4.74-3.7a4.73 4.73 0 00-4 2 8.68 8.68 0 00-1.46 5.29 13.59 13.59 0 00.61 4.39 5.6 5.6 0 001.82 2.69 4.66 4.66 0 002.86.89q3.71 0 5.05-4.61l4.35 1.47c-1.44 4.66-4.6 7-9.51 7a9.82 9.82 0 01-4.9-1.28 9.22 9.22 0 01-3.64-3.93 14.93 14.93 0 01-.11-12.25 9.44 9.44 0 013.61-4 10.46 10.46 0 015.52-1.43q6.58 0 8.95 6.5zM422.61 129.75h14a5.15 5.15 0 013.2.86 2.82 2.82 0 011.1 2.34 3.11 3.11 0 01-.87 2.23 3.52 3.52 0 01-2.65.91h-19.74a4.31 4.31 0 01-3.15-1.09 3.58 3.58 0 01-1.12-2.62 6.72 6.72 0 01.72-2.57 9.28 9.28 0 011.59-2.51q3.57-3.7 6.44-6.35a44.82 44.82 0 014.11-3.48 23.27 23.27 0 003.67-3.13 12.41 12.41 0 002.22-3.22 7.67 7.67 0 00.77-3.23 5.79 5.79 0 00-.82-3.08 5.73 5.73 0 00-2.23-2.11 6.43 6.43 0 00-3.07-.75 6.27 6.27 0 00-5.53 3.09 13.84 13.84 0 00-.91 2.2 9.22 9.22 0 01-1.42 2.77 2.84 2.84 0 01-2.32 1 3 3 0 01-2.23-.88 3.28 3.28 0 01-.89-2.42 10.1 10.1 0 01.84-3.87 11 11 0 012.48-3.65 12.31 12.31 0 014.2-2.7 15.88 15.88 0 015.95-1 17.21 17.21 0 017 1.29 10.56 10.56 0 013.3 2.36 10.89 10.89 0 012.22 3.48 11.06 11.06 0 01.79 4.09 11.46 11.46 0 01-1.65 6.06 18.91 18.91 0 01-3.37 4.27q-1.73 1.55-5.76 4.85a42.35 42.35 0 00-5.55 5.13 15.12 15.12 0 00-1.32 1.73zM471.29 116.78a45.71 45.71 0 01-.54 7.57 17.57 17.57 0 01-2 5.75A13.14 13.14 0 01464 135a12.84 12.84 0 01-13.77-.59 14.09 14.09 0 01-4.83-6.41 23.55 23.55 0 01-1.22-4.93 41 41 0 01-.39-5.84 55.65 55.65 0 01.43-7.31 23.8 23.8 0 011.34-5.58 12 12 0 0111.82-7.92 13.27 13.27 0 015 .9 11.44 11.44 0 014 2.63 15 15 0 012.89 4.28c1.34 2.96 2.02 7.15 2.02 12.55zm-7.36-.54a45.15 45.15 0 00-.59-8 10 10 0 00-2-4.73 4.88 4.88 0 00-3.87-1.59 5 5 0 00-4.92 3.57q-1.4 3.57-1.39 11a47.69 47.69 0 00.59 8.27 10.53 10.53 0 002 4.88 5.18 5.18 0 007.65-.07 10.65 10.65 0 002-4.92 50.75 50.75 0 00.53-8.41zM487.6 132.41V108q-6.83 5.23-9.18 5.24a2.73 2.73 0 01-2-.9 2.9 2.9 0 01-.87-2.08 2.35 2.35 0 01.86-2 18.91 18.91 0 013-1.67 22.69 22.69 0 005.19-3.22 21.77 21.77 0 003.45-3.79c1-1.4 1.66-2.26 2-2.58a2.37 2.37 0 011.72-.48 2.78 2.78 0 012.29 1.1 4.83 4.83 0 01.85 3v30.75c0 3.6-1.22 5.4-3.68 5.4a3.38 3.38 0 01-2.63-1.1 4.71 4.71 0 01-1-3.26zM511.51 97.1h17.89a6.73 6.73 0 013.73.8 3 3 0 011.15 2.66 5.67 5.67 0 01-1.35 3c-.91 1.24-1.93 2.6-3.09 4.1a43.38 43.38 0 00-3.57 5.57 45.05 45.05 0 00-3.37 8.14 32.51 32.51 0 00-.91 3.52c-.18.93-.38 2.14-.6 3.62s-.4 2.62-.56 3.41a7.79 7.79 0 01-1.6 3.8 3.65 3.65 0 01-2.75 1.06 3.32 3.32 0 01-2.63-1.14 5 5 0 01-1-3.37 21.07 21.07 0 01.73-4.67 55.49 55.49 0 012.36-7.08 69.05 69.05 0 019.94-17.09h-14.37a5.66 5.66 0 01-3.37-.82A3 3 0 01507 100a2.34 2.34 0 011.18-2.39 8.34 8.34 0 013.33-.51zM547.24 125h-8.49a4.27 4.27 0 01-2.94-.9 3 3 0 01-1-2.33 3 3 0 011-2.35 4.24 4.24 0 013-.9h8.49a4.29 4.29 0 013 .9 3.06 3.06 0 011 2.35 3 3 0 01-1 2.33 4.25 4.25 0 01-3.06.9zM562.59 129.75h14a5.13 5.13 0 013.2.86 2.82 2.82 0 011.1 2.34 3.11 3.11 0 01-.87 2.23 3.5 3.5 0 01-2.65.91h-19.75a4.27 4.27 0 01-3.14-1.11 3.55 3.55 0 01-1.13-2.62 6.72 6.72 0 01.72-2.57 9.28 9.28 0 011.59-2.51q3.57-3.7 6.44-6.35a44.82 44.82 0 014.11-3.48 23.27 23.27 0 003.67-3.13 12.46 12.46 0 002.23-3.22 7.65 7.65 0 00.76-3.23 5.79 5.79 0 00-.82-3.08 5.66 5.66 0 00-2.23-2.11 6.43 6.43 0 00-3.07-.75 6.27 6.27 0 00-5.53 3.09 13.21 13.21 0 00-.9 2.2 9.22 9.22 0 01-1.43 2.77 2.84 2.84 0 01-2.32 1 3 3 0 01-2.23-.88 3.27 3.27 0 01-.88-2.42 10.07 10.07 0 01.83-3.87 11 11 0 012.48-3.65 12.31 12.31 0 014.23-2.68 15.91 15.91 0 015.95-1 17.17 17.17 0 017 1.29 10.56 10.56 0 013.3 2.36 10.89 10.89 0 012.22 3.48 11.06 11.06 0 01.79 4.09 11.46 11.46 0 01-1.65 6.06 18.91 18.91 0 01-3.37 4.27q-1.73 1.55-5.76 4.85a42.35 42.35 0 00-5.58 5.11 14.06 14.06 0 00-1.31 1.75zM611.26 116.78a45.71 45.71 0 01-.54 7.57 17.57 17.57 0 01-2 5.75A13.14 13.14 0 01604 135a12.84 12.84 0 01-13.77-.59 14.09 14.09 0 01-4.87-6.39 23.55 23.55 0 01-1.22-4.93 41 41 0 01-.39-5.84 55.65 55.65 0 01.43-7.31 23.8 23.8 0 011.34-5.58 12 12 0 0111.82-7.92 13.24 13.24 0 015 .9 11.44 11.44 0 014 2.63 15 15 0 012.89 4.28c1.35 2.94 2.03 7.13 2.03 12.53zm-7.36-.54a45.15 45.15 0 00-.59-8 9.93 9.93 0 00-2-4.73 4.88 4.88 0 00-3.87-1.59 5 5 0 00-4.92 3.57q-1.39 3.57-1.39 11a47.69 47.69 0 00.59 8.27 10.53 10.53 0 002 4.88 5.2 5.2 0 007.66-.07 10.76 10.76 0 002-4.92 50.75 50.75 0 00.52-8.41zM624.32 129.75h14a5.1 5.1 0 013.19.86 2.81 2.81 0 011.11 2.34 3.12 3.12 0 01-.88 2.23 3.48 3.48 0 01-2.64.91h-19.75a4.28 4.28 0 01-3.14-1.11 3.59 3.59 0 01-1.13-2.62 6.59 6.59 0 01.73-2.57 9.28 9.28 0 011.58-2.51q3.57-3.7 6.45-6.35a42.21 42.21 0 014.11-3.48 23.16 23.16 0 003.66-3.13 12.22 12.22 0 002.23-3.22 7.67 7.67 0 00.77-3.23 5.88 5.88 0 00-.82-3.08 5.73 5.73 0 00-2.23-2.11 6.47 6.47 0 00-3.08-.75A6.28 6.28 0 00623 105a13.21 13.21 0 00-.9 2.2 9.22 9.22 0 01-1.42 2.77 2.84 2.84 0 01-2.33 1 3 3 0 01-2.22-.88 3.28 3.28 0 01-.89-2.42 10.26 10.26 0 01.83-3.87 11.19 11.19 0 012.49-3.65 12.21 12.21 0 014.19-2.64 15.86 15.86 0 015.94-1 17.17 17.17 0 017 1.29 10.49 10.49 0 013.31 2.36 11.12 11.12 0 013 7.57 11.46 11.46 0 01-1.65 6.06 18.63 18.63 0 01-3.37 4.27q-1.71 1.55-5.76 4.85a42.78 42.78 0 00-5.54 5.13 15.12 15.12 0 00-1.36 1.71zM655.19 129.75h14a5.12 5.12 0 013.19.86 2.8 2.8 0 011.1 2.34 3.11 3.11 0 01-.87 2.23 3.48 3.48 0 01-2.64.91h-19.75a4.28 4.28 0 01-3.14-1.11 3.59 3.59 0 01-1.13-2.62 6.72 6.72 0 01.72-2.57 9.53 9.53 0 011.59-2.51q3.57-3.7 6.45-6.35a43.74 43.74 0 014.1-3.48 23.27 23.27 0 003.67-3.13 12.22 12.22 0 002.23-3.22 7.65 7.65 0 00.76-3.23 5.79 5.79 0 00-.82-3.08 5.64 5.64 0 00-2.22-2.11 6.47 6.47 0 00-3.08-.75 6.27 6.27 0 00-5.53 3.09 13.21 13.21 0 00-.9 2.2 9.46 9.46 0 01-1.42 2.78 2.86 2.86 0 01-2.33 1 3 3 0 01-2.23-.88 3.27 3.27 0 01-.88-2.42 10.26 10.26 0 01.83-3.87 11 11 0 012.48-3.65 12.31 12.31 0 014.19-2.64 15.91 15.91 0 016-1 17.17 17.17 0 017 1.29 10.45 10.45 0 013.3 2.36 11.06 11.06 0 013 7.57 11.46 11.46 0 01-1.65 6.06 18.63 18.63 0 01-3.37 4.27q-1.72 1.55-5.76 4.85a43 43 0 00-5.58 5.06 15.12 15.12 0 00-1.31 1.75zM381.89 177v.88a12.76 12.76 0 014.23-3.74 11.23 11.23 0 015.28-1.2 10.44 10.44 0 015.18 1.27 8 8 0 013.41 3.57 8.45 8.45 0 01.94 2.9 30.45 30.45 0 01.22 4v13.62a4.86 4.86 0 01-1 3.33 3.33 3.33 0 01-2.62 1.13 3.38 3.38 0 01-2.66-1.15 4.84 4.84 0 01-1-3.31v-12.21a12.1 12.1 0 00-1-5.55c-.67-1.28-2-1.92-4-1.92a5.92 5.92 0 00-3.57 1.17 6.76 6.76 0 00-2.37 3.21 23.37 23.37 0 00-.53 6.12v9.18a4.78 4.78 0 01-1 3.35 3.49 3.49 0 01-2.67 1.11 3.32 3.32 0 01-2.6-1.15 4.84 4.84 0 01-1-3.31v-21.18a4.61 4.61 0 01.91-3.13 3.16 3.16 0 012.5-1 3.33 3.33 0 011.74.46 3.21 3.21 0 011.25 1.37 4.87 4.87 0 01.36 2.18zM425.17 198.63a22.78 22.78 0 01-5.15 3.1 14.32 14.32 0 01-5.57 1 10.56 10.56 0 01-4.95-1.11 8.17 8.17 0 01-3.29-3 7.84 7.84 0 01-1.16-4.14 7.43 7.43 0 011.91-5.13 9.58 9.58 0 015.23-2.85l3.47-.72c1.84-.38 3.42-.72 4.74-1s2.74-.7 4.28-1.15a7.62 7.62 0 00-1.17-4.25c-.69-.91-2.11-1.36-4.28-1.36a8.91 8.91 0 00-4.2.78 6.82 6.82 0 00-2.42 2.34c-.67 1-1.15 1.72-1.42 2a2.36 2.36 0 01-1.79.5 3.16 3.16 0 01-2.13-.79 2.59 2.59 0 01-.9-2 6.16 6.16 0 011.37-3.76 9.74 9.74 0 014.27-3 19.17 19.17 0 017.22-1.18 20.46 20.46 0 017.6 1.14 7.1 7.1 0 013.91 3.61 15.83 15.83 0 011.14 6.56V192.59a14.58 14.58 0 00.68 4.31 13.59 13.59 0 01.69 2.89 2.72 2.72 0 01-1.07 2.06 3.55 3.55 0 01-2.4.92 3.25 3.25 0 01-2.23-1.06 15.89 15.89 0 01-2.38-3.08zm-.49-10.63a37.43 37.43 0 01-4.68 1.25q-3.08.66-4.26 1a5.88 5.88 0 00-2.26 1.21 3.12 3.12 0 00-1.07 2.51 3.74 3.74 0 001.26 2.84A4.66 4.66 0 00417 198a8.58 8.58 0 004-1 6.25 6.25 0 002.7-2.46 11.23 11.23 0 001-5.47zM443.55 166.24v11.2a16.91 16.91 0 014.21-3.29 11.26 11.26 0 015.32-1.14 11.71 11.71 0 016.4 1.73 11.32 11.32 0 014.27 5 18.34 18.34 0 011.52 7.8 21 21 0 01-.84 6.11 14.72 14.72 0 01-2.46 4.82 11.27 11.27 0 01-3.91 3.16 11.48 11.48 0 01-5.06 1.11 12 12 0 01-3.18-.4 9.29 9.29 0 01-2.54-1.06 11.16 11.16 0 01-1.79-1.36c-.49-.46-1.14-1.16-1.94-2.09v.72a4.44 4.44 0 01-1 3.13 3.29 3.29 0 01-2.52 1.06 3.14 3.14 0 01-2.49-1.06 4.68 4.68 0 01-.92-3.13v-32a5.37 5.37 0 01.9-3.37 3 3 0 012.51-1.14 3.19 3.19 0 012.6 1.09 4.68 4.68 0 01.92 3.11zm.34 21.78q0 4.38 2 6.73a6.57 6.57 0 005.25 2.35 6 6 0 004.76-2.41c1.34-1.6 2-3.9 2-6.89a13.41 13.41 0 00-.83-5 7.21 7.21 0 00-2.36-3.24 5.81 5.81 0 00-3.57-1.14 6.39 6.39 0 00-3.74 1.14 7.5 7.5 0 00-2.57 3.31 12.75 12.75 0 00-.94 5.13zM468.61 198.3v-31.79a5 5 0 011-3.33 3.35 3.35 0 012.65-1.13 3.46 3.46 0 012.68 1.11 4.83 4.83 0 011 3.35v31.79a4.78 4.78 0 01-1 3.35 3.49 3.49 0 01-2.67 1.11 3.3 3.3 0 01-2.62-1.15 4.89 4.89 0 01-1.04-3.31zM500.23 198.63a22.52 22.52 0 01-5.14 3.1 14.36 14.36 0 01-5.57 1 10.63 10.63 0 01-5-1.11 8.23 8.23 0 01-3.29-3 7.84 7.84 0 01-1.15-4.14 7.42 7.42 0 011.9-5.13 9.65 9.65 0 015.24-2.85l3.47-.72c1.84-.38 3.42-.72 4.74-1s2.74-.7 4.28-1.15a7.62 7.62 0 00-1.17-4.25c-.69-.91-2.12-1.36-4.28-1.36a9 9 0 00-4.21.78 6.8 6.8 0 00-2.41 2.34 22.73 22.73 0 01-1.43 2 2.32 2.32 0 01-1.78.5 3.16 3.16 0 01-2.14-.79 2.59 2.59 0 01-.9-2 6.23 6.23 0 011.37-3.76 9.86 9.86 0 014.27-3 19.26 19.26 0 017.23-1.18 20.5 20.5 0 017.6 1.14 7.08 7.08 0 013.9 3.61 15.66 15.66 0 011.15 6.56V192.59a14.61 14.61 0 00.69 4.31 14 14 0 01.68 2.89 2.71 2.71 0 01-1.06 2.06 3.59 3.59 0 01-2.4.92 3.23 3.23 0 01-2.23-1.06 16.29 16.29 0 01-2.36-3.08zm-.48-10.63a38.17 38.17 0 01-4.69 1.25c-2.05.44-3.47.76-4.25 1a5.88 5.88 0 00-2.26 1.21 3.09 3.09 0 00-1.07 2.51 3.74 3.74 0 001.26 2.84A4.66 4.66 0 00492 198a8.58 8.58 0 004-1 6.37 6.37 0 002.7-2.46 11.23 11.23 0 001-5.47zM524.5 198.3v-31.79a4.91 4.91 0 011-3.33 3.32 3.32 0 012.64-1.13 3.48 3.48 0 012.69 1.11 4.83 4.83 0 011 3.35v31.79a4.78 4.78 0 01-1 3.35 3.49 3.49 0 01-2.67 1.11 3.31 3.31 0 01-2.62-1.15 4.89 4.89 0 01-1.04-3.31zM538 173.6h.8v-4.41c0-1.18 0-2.1.1-2.78a4 4 0 01.52-1.73 3.3 3.3 0 011.24-1.22 3.5 3.5 0 011.8-.47 3.6 3.6 0 012.52 1 3.05 3.05 0 01.95 1.7 15 15 0 01.2 2.86v5h2.69a3.41 3.41 0 012.38.74 2.44 2.44 0 01.82 1.89 2.13 2.13 0 01-1.17 2.07 7.67 7.67 0 01-3.35.59h-1.37v13.48a21.91 21.91 0 00.12 2.64 2.79 2.79 0 00.65 1.51 2.23 2.23 0 001.71.58 9.24 9.24 0 001.74-.23 9.37 9.37 0 011.72-.23 2.24 2.24 0 011.6.71 2.41 2.41 0 01.71 1.76 3 3 0 01-1.93 2.71 13 13 0 01-5.56.94 9.58 9.58 0 01-5.21-1.15 5.4 5.4 0 01-2.33-3.2 22 22 0 01-.55-5.45v-14.02h-1a3.49 3.49 0 01-2.42-.75 2.44 2.44 0 01-.83-1.91 2.36 2.36 0 01.87-1.89 3.79 3.79 0 012.58-.74zM575.34 198.57v-.72a18.8 18.8 0 01-2.92 2.75 10.58 10.58 0 01-3.11 1.61 11.63 11.63 0 01-3.67.55 10.82 10.82 0 01-4.87-1.11 11.48 11.48 0 01-3.88-3.18 14.65 14.65 0 01-2.49-4.87 20.85 20.85 0 01-.84-6q0-6.87 3.36-10.71a11.15 11.15 0 018.83-3.84 11.93 11.93 0 015.34 1.08 14.82 14.82 0 014.25 3.35v-10.87a5.48 5.48 0 01.9-3.41 3 3 0 012.56-1.15 3.18 3.18 0 012.57 1.06 4.73 4.73 0 01.9 3.13v32.33a4.53 4.53 0 01-1 3.15 3.28 3.28 0 01-2.5 1 3.2 3.2 0 01-2.48-1.08 4.46 4.46 0 01-.95-3.07zm-14.42-10.77a12.5 12.5 0 00.92 5.08 7.13 7.13 0 002.54 3.16 6.35 6.35 0 003.52 1.06 6.51 6.51 0 003.53-1A6.84 6.84 0 00574 193a12.42 12.42 0 00.95-5.2 12 12 0 00-.95-5 7.43 7.43 0 00-2.58-3.22 6.11 6.11 0 00-3.56-1.12 6 6 0 00-3.59 1.14 7.32 7.32 0 00-2.46 3.28 13 13 0 00-.89 4.92zM592.67 202.76a4.19 4.19 0 01-2.87-1.07 3.81 3.81 0 01-1.21-3 3.9 3.9 0 011.15-2.82 3.82 3.82 0 012.85-1.18 4 4 0 012.89 1.17 3.83 3.83 0 011.19 2.83 3.89 3.89 0 01-1.19 3 4.07 4.07 0 01-2.81 1.07zM175.4 149c34.5.08 61.79 27.17 61.91 61.44a62.19 62.19 0 01-124.38.53c-.38-34.48 27.38-61.97 62.47-61.97zM83.41 145.26c-34.45-.16-61-27.19-60.88-62a61.3 61.3 0 0162.63-61.71c33.86.4 61.63 28.64 61.29 62.32-.35 34.67-27.96 61.56-63.04 61.39zM266.37 145.27c-35 0-62.51-27.17-62.58-61.81-.07-34 28.54-62.13 63-61.87a61.61 61.61 0 0161.15 62.23c-.1 34.55-27 61.4-61.57 61.45z"></path>
      </svg>
    </Homer >
  );
}

export function Quote({ text, setText }) {
  const quote = useRef(null);
  const scramble = useRef(new Scrambler());
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  useEffect(() => {
    !cloud.CanvasLoading && newQuote().then(() => scramble.current.scramble(state.quotes, setText, { characters: characters }));
  }, [snap.quotes]);

  if (clip.mobile) {
    return <Draggable nodeRef={quote} bounds=".mobileNav" position={snap.grabberPosition} axis="x">
      <div className="quote w">
        <div>{text}</div>
      </div >
    </Draggable>
  } else {
    return <div className="quote w">
      <div>{text}</div>
    </div >
  }

}

const Homer = styled(NavLink)`
  height: 70px;
  width: 130px;
  display: flex;
  justify-content: center;
  /* margin: 10px 0 0px 0; */
  backdrop-filter: blur(20px) !important;
  padding-top: 5px;
  padding-bottom: 3px;
  border-radius: 75% 75% 50px 50px;
  border: 1px solid ${props => props.theme.panelColor};
  overflow: visible;
  background-color: transparent !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
  user-select:none ;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;

  & svg{
    ${props => props.fill}
    align-self:center;
    fill: ${props => props.theme.panelColor};
    color: ${props => props.theme.panelColor};
    transition: 2.3s;
    pointer-events: none;
  }

  &:hover{
    background-color: ${props => props.theme.LiHover} !important;
    -webkit-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover}  !important;
    -moz-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover}  !important;
    box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover}  !important;
    transition: 0.6s;

  }

  @media only screen and (min-width: 768px) {
    &:hover {
    background-color: ${props => props.theme.LiHover} !important;
    -webkit-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover}  !important;
    -moz-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover}  !important;
    box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover}  !important;
    transition: 0.6s;
  }
      &:hover > svg{
    fill: ${props => props.theme.textHover};
    -webkit-filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover});
    filter: drop-shadow(1px 1px 3px ${props => props.theme.textHover});
    transition: 1.0s;
  }
}

`