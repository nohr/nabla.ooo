import React, { useEffect, useRef } from "react";
import LocomotiveScroll from 'locomotive-scroll'
import '../../App.css'
import "./Stream.css";
import Draggable from "react-draggable";
import { Container } from "../UI/Theme";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'


function About() {
  const snap = useSnapshot(state);
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

  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante augue, iaculis sit amet sem nec, semper volutpat tellus. In egestas molestie diam, vel posuere eros consequat ut. Proin id ex dolor. Nullam enim est, accumsan sit amet leo vitae, vulputate blandit ligula. Integer scelerisque ex ut orci bibendum luctus. Nulla urna mauris, tincidunt non sem vel, posuere efficitur mauris. Etiam vel magna eget orci hendrerit convallis. Cras accumsan, odio sollicitudin condimentum bibendum, ipsum massa vehicula ligula, quis placerat nisl ipsum venenatis odio.";
  return (
    <div className="bigContainer">
      <div className="head">
        <Draggable position={snap.prtPosition} onStart={() => false}>
          <h1>about</h1>
        </Draggable>
      </div>
      <Container className="container" has-scroll-dragging="true" data-scroll-container ref={ref} showIndicators={false}>
        <img className="feed under" data-scroll src="https://global.yamaha-motor.com/design_technology/design/concept/motoroid/img/sec03_img05.jpg" alt="bike" />
        <img className="feed large" data-scroll src="https://global.yamaha-motor.com/design_technology/design/concept/motoroid/img/sec03_img05.jpg" alt="bike" />
        <div className="feed pic" data-scroll>{text}</div>
        <img className="feed med" data-scroll src="https://global.yamaha-motor.com/design_technology/design/concept/motoroid/img/sec03_img05.jpg" alt="bike" />
        <div className="feed small" data-scroll>{text}</div>
      </Container>
    </div>
  )
}

export default About;
