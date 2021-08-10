import * as React from "react"
import useSound from 'use-sound'
import home from '../Sounds/home.mp3'
import { state } from './state'
import Draggable from 'react-draggable'
import { useSnapshot } from 'valtio'
import { Homer } from './Theme'



 const SvgNabla = () => {
  const [play] = useSound(home); 

  return (
      <Homer className="nablaWrapper" to="/" onClick={() => play()}><svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 950 300.4"
      width="7em"
      className="SvgNabla"
    >
      <path
        fill="ffffff"
        d="M931.22 179.51L878.75 11.38A16.11 16.11 0 00863.38.08h-71.21a16.11 16.11 0 00-15.25 11l-45.6 134.78a17.11 17.11 0 01-16.2 11.52h-29.45a16.1 16.1 0 01-16.1-16.1V16.1A16.1 16.1 0 00653.47 0H603.9a16.09 16.09 0 00-16.09 16.1v97.92a4.21 4.21 0 01-7.52 2.6 52.1 52.1 0 00-11.84-10.73 15.82 15.82 0 01-3.44-23.46c7.47-8.77 9.92-21.21 9-35.87C572.38 19.74 550.47.02 521.63.02h-116.5a16.1 16.1 0 00-16.1 16.1v105.56a4.2 4.2 0 01-8.22 1.25L345.95 11.38A16.1 16.1 0 00330.59.08h-71.16a16.11 16.11 0 00-15.25 11l-40.77 120.68a4.21 4.21 0 01-8.2-1.34V16.12a16.1 16.1 0 00-16.1-16.1h-10.36a16.1 16.1 0 00-16.1 16.1v42.26c0 15.69-20.15 22.11-29.23 9.32L80.18 6.81A16.1 16.1 0 0067.05.02H16.1A16.1 16.1 0 000 16.12v168.17a16.09 16.09 0 0016.1 16.09h10.42a16.09 16.09 0 0016.09-16.09v-44.08c0-15.61 20-22.08 29.14-9.44l45.58 63a16.1 16.1 0 0013 6.65h89.42a16.09 16.09 0 0015.49-11.74l6.82-24.22 7.46-25.3 9.88-34.4c4.55-15.86 27.18-15.42 31.1.61l8.25 33.78 6.12 25.3 5.79 23.68a16.1 16.1 0 0015.64 12.25h202.62c21 0 39.3-6.62 49.72-11.37a8.91 8.91 0 0111.37 3.42 16.09 16.09 0 0013.9 8h148.54a16.11 16.11 0 0015.5-11.74l6.8-24.24 7.46-25.3 9.88-34.4c4.55-15.86 27.18-15.42 31.1.61l8.29 33.79 6.12 25.3 5.79 23.68a16.1 16.1 0 0015.65 12.25h56.82a16.1 16.1 0 0015.36-20.87zM470.75 47.24a16.1 16.1 0 0116.1-16.1h1.75c13.31 0 24.5 3.2 24.5 27.17 0 23.43-14.12 27.69-24.5 27.69h-1.75a16.09 16.09 0 01-16.1-16.09zm21 121.32h-4.94a16.1 16.1 0 01-16.1-16.1v-25.32a16.1 16.1 0 0116.1-16.1h4.94c12 0 22.64 7.72 22.64 28.49.08 21.85-9.77 29.03-22.56 29.03z"
      />
      <text y="300">©2017-2021 nabla ltd.</text>
    </svg>
    </Homer>
  );
}

const HomeCD = () => {
  return (
    <svg 
    viewBox="0 0 160 160"
    className='HomeCD'
    >
      <g stroke="#444444">
        <path d="M122.62 21.8A28.32 28.32 0 1194.3 50.12a28.35 28.35 0 0128.32-28.32m0-.76a29.08 29.08 0 1029.07 29.08A29.08 29.08 0 00122.62 21zM79.83 81.61a28.32 28.32 0 11-28.32 28.32 28.35 28.35 0 0128.32-28.32m0-.75a29.07 29.07 0 1029.07 29.07 29.07 29.07 0 00-29.07-29.07zM37.07 21.75A28.32 28.32 0 118.75 50.07a28.35 28.35 0 0128.32-28.32m0-.75a29.07 29.07 0 1029.07 29.07A29.08 29.08 0 0037.07 21z">    
        </path>
      </g>
    </svg>
  );
}

const Arrow = () => {
  return (
    <svg 
    className="arrow svg-left" 
    focusable="false" 
    viewBox="0 0 25 24" 
    aria-hidden="true"
  
    >
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
}

const SideArrow = () => {
  return (
    <svg 
    className="arrow svg-right" 
    focusable="false" 
    viewBox="0 0 24 24" 
    aria-hidden="true"
    >
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
  );
}

function Spinner() {
  const snap = useSnapshot(state);
  return (
    <Draggable position={snap.navPosition} positionOffset={{x: '0%', y: '0%'}} onStart={() => false}>
    <svg
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
      className="spinner"
    >
      <rect width="7" height="14" x="46.5" y="28" fill="#444" rx="3.5" ry="7">
        <animate
          attributeName="opacity"
          begin="-0.8571428571428571s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        ></animate>
      </rect>
      <rect
        width="7"
        height="14"
        x="46.5"
        y="28"
        fill="#444"
        rx="3.5"
        ry="7"
        transform="rotate(51.429 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.7142857142857143s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        ></animate>
      </rect>
      <rect
        width="7"
        height="14"
        x="46.5"
        y="28"
        fill="#444"
        rx="3.5"
        ry="7"
        transform="rotate(102.857 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.5714285714285714s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        ></animate>
      </rect>
      <rect
        width="7"
        height="14"
        x="46.5"
        y="28"
        fill="#444"
        rx="3.5"
        ry="7"
        transform="rotate(154.286 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.42857142857142855s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        ></animate>
      </rect>
      <rect
        width="7"
        height="14"
        x="46.5"
        y="28"
        fill="#444"
        rx="3.5"
        ry="7"
        transform="rotate(205.714 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.2857142857142857s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        ></animate>
      </rect>
      <rect
        width="7"
        height="14"
        x="46.5"
        y="28"
        fill="#444"
        rx="3.5"
        ry="7"
        transform="rotate(257.143 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="-0.14285714285714285s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        ></animate>
      </rect>
      <rect
        width="7"
        height="14"
        x="46.5"
        y="28"
        fill="#444"
        rx="3.5"
        ry="7"
        transform="rotate(308.571 50 50)"
      >
        <animate
          attributeName="opacity"
          begin="0s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        ></animate>
      </rect>
    </svg>
    </Draggable>
  );
}

export { SvgNabla, HomeCD, Arrow, SideArrow, Spinner}
