import React, { useEffect, useRef } from "react";
import LocomotiveScroll from 'locomotive-scroll'
import '../../App.css'
import "./Stream.css";
import Draggable from "react-draggable";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'


function About() {
  const snap = useSnapshot(state);
  const ref = useRef(null);
  useEffect(() =>{
    if(ref){
      new LocomotiveScroll({
        el:ref.current,
        smooth: true,
        direction: "vertical",
        multiplier: 0.65,
        touchMultiplier: 10,
        smartphone: {
          smooth: true,
          direction:"vertical",
          horizontalGesture: true
        },
        tablet: {
          smooth: true,
          direction:"vertical",
          horizontalGesture: true
        }
      })
    }
  },[])

    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante augue, iaculis sit amet sem nec, semper volutpat tellus. In egestas molestie diam, vel posuere eros consequat ut. Proin id ex dolor. Nullam enim est, accumsan sit amet leo vitae, vulputate blandit ligula. Integer scelerisque ex ut orci bibendum luctus. Nulla urna mauris, tincidunt non sem vel, posuere efficitur mauris. Etiam vel magna eget orci hendrerit convallis. Cras accumsan, odio sollicitudin condimentum bibendum, ipsum massa vehicula ligula, quis placerat nisl ipsum venenatis odio. Suspendisse vitae lorem posuere, imperdiet eros quis, condimentum orci. Etiam porta magna sapien, vel sodales tellus euismod eget. Nulla facilisi. Cras molestie, nunc non maximus bibendum, orci ipsum ornare orci, a maximus nibh felis ut neque. Duis condimentum, eros eu porttitor cursus, dolor eros posuere ante, id tempor elit libero eu libero. Sed facilisis placerat nunc, vitae feugiat dui. Etiam convallis ac lectus vitae hendrerit. Proin sollicitudin hendrerit elit. Morbi et justo venenatis, faucibus leo ut, volutpat nisl. Nulla bibendum tincidunt velit, non consequat neque fringilla vitae. Morbi dignissim nibh vitae molestie mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec placerat dui vitae massa tempor, sit amet convallis nisl congue. Pellentesque facilisis, dui sit amet dictum efficitur, erat risus consectetur nibh, nec euismod risus sem ut eros. Quisque mattis ex vitae erat tempor, eu mollis elit commodo. Aliquam velit mauris, tempus id gravida vel, condimentum vitae elit. Donec dictum vitae purus id facilisis. Nam vel quam consectetur ex tempor auctor eu id tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus iaculis sem eget tortor dignissim, id vehicula velit venenatis. Aliquam erat volutpat. Morbi eleifend, lectus at vehicula vulputate, lorem mauris suscipit ligula, id condimentum odio odio quis diam. Donec fringilla euismod massa vel efficitur. Aliquam sit amet dolor efficitur, dictum lorem a, dictum felis. Mauris imperdiet dapibus ex sed tempor. Suspendisse potenti. Cras posuere, velit nec accumsan mattis, dui purus aliquam mi, vel consectetur ante odio ut lorem. Nullam lacinia risus eu lorem convallis pulvinar quis sit amet augue. Donec nulla dolor, rhoncus ornare augue ut, lacinia aliquam neque. Cras elementum placerat elit, at ornare justo. Maecenas tincidunt, metus sit amet pretium molestie, nisi nulla gravida arcu, ut gravida eros massa ut mauris. Ut commodo sapien ac orci efficitur consectetur. Sed lacinia tortor et dui hendrerit fermentum. Pellentesque vitae augue dui. Proin ac ultricies odio. Quisque rutrum, ligula eu tincidunt ultricies, tellus metus lobortis libero, eu tincidunt metus justo nec sapien. Cras facilisis finibus magna vitae consectetur. Aenean nec ipsum nisl. Proin sollicitudin ornare ligula, non volutpat tortor maximus sed. Ut auctor metus commodo quam pulvinar, in ullamcorper ex accumsan. Phasellus vel iaculis risus. Sed tincidunt maximus erat quis dapibus. Quisque cursus neque et dolor pharetra, sed aliquam massa sagittis. Cras eget pretium mi, fermentum euismod eros. Aenean et eros eros. Integer pretium neque vel ex pretium volutpat. Sed urna enim, rutrum id accumsan sed, dignissim at quam. Mauris faucibus, sem sit amet porta tempor, ex tellus egestas mi, in fringilla diam nulla sit amet magna.";
    return (  
      <div className="bigContainer">
      <div className="head">
      <Draggable position={snap.prtPosition} onStart={() => false}>
        <h1>about</h1>
      </Draggable>  
        </div>
      <div className="container abt" has-scroll-dragging="true" data-scroll-container ref={ref}>
          <img className="feed under" data-scroll src="https://global.yamaha-motor.com/design_technology/design/concept/motoroid/img/sec03_img05.jpg" alt="bike"/>
          <img className="feed large" data-scroll src="https://global.yamaha-motor.com/design_technology/design/concept/motoroid/img/sec03_img05.jpg" alt="bike"/>
          <div className="feed pic" data-scroll>{text}</div>
          <img className="feed med" data-scroll src="https://global.yamaha-motor.com/design_technology/design/concept/motoroid/img/sec03_img05.jpg" alt="bike"/>
          <div className="feed small" data-scroll>{text}</div>
        </div>
        </div>
    )
}

export default About;
