import React, { useEffect, useRef } from "react"
import LocomotiveScroll from 'locomotive-scroll'
import '../../App.css'
import "./Stream.css"
import Draggable from "react-draggable";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'


function Store() {
  const ref = useRef(null);
  useEffect(() => {
    if (ref) {
      new LocomotiveScroll({
        el: ref.current,
        smooth: true,
        direction: "vertical",
        multiplier: 0.65,
        touchMultiplier: 10,
        smartphone: {
          smooth: true,
          direction: "vertical",
          horizontalGesture: true
        },
        tablet: {
          smooth: true,
          direction: "vertical",
          horizontalGesture: true
        }
      })
    }
  }, [])

  const snap = useSnapshot(state);

  return (
    <div className="bigContainer">
      <div className="head">
        <Draggable position={snap.prtPosition} onStart={() => false}>
          <h1>store</h1>
        </Draggable>
      </div>
      <div className="container str" has-scroll-dragging="true" data-scroll-container ref={ref}>

        <div className="eko">
          <div className="eko-thumb">
            Aa
          </div>
          <div className="desc">
            <div className="title"> <p>Eko Digital</p></div>
            Our first decorative typeface offers a stencil with a distinct futuristic style. <br />
            <span style={{ opacity: ".5" }}>Just what your acid graphics were missing!</span>
            <br />
            <a className="buyBtn" href="https://nablaooo.gumroad.com/l/ekodigi" target="_blank" rel="noopener noreferrer">
              $30
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Store;