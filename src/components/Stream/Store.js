import React, { useEffect, useRef } from "react"
import LocomotiveScroll from 'locomotive-scroll'
import '../../App.css'
import "./Stream.css"



function Store() {
    // const ref = useRef(null);
    // useEffect(() =>{
    //   if(ref){
    //     new LocomotiveScroll({
    //       el:ref.current,
    //       smooth: true,
    //       direction: "horizontal",
    //       multiplier: 0.65,
    //       touchMultiplier: 10,
    //       smartphone: {
    //         smooth: true,
    //         direction:"horizontal",
    //         horizontalGesture: true
    //       },
    //       tablet: {
    //         smooth: true,
    //         direction:"horizontal",
    //         horizontalGesture: true
    //       }
    //     })
    //   }
    // })
    return (
        <div className="container str" > 
        {/* has-scroll-dragging="true" data-scroll-container  ref={ref}*/}
        <div className="head">
        <h1>Store</h1>
        </div>
          <div className="eko">
            <div className="eko-thumb">
              Aa
            </div>
            <div className="desc">
              <div className="title"> <a className="buyBtn" href="https://nablaooo.gumroad.com/l/ekodigi" target="_blank" rel="norefferer">
              $30
            </a><p>Eko Digital</p></div>
            Nabla‘s first decorative typeface offers a stencil with a distinct futuristic style. <br/>
            Just what your acid graphics were missing!
            </div>
          </div>
        </div>
    )}
export default Store;