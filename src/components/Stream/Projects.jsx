import React, { useEffect, useRef } from "react";
import db from '../../firebase'
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import Draggable from "react-draggable";
import LocomotiveScroll from 'locomotive-scroll'
import '../../App.css'
import "./Stream.css"
import { Container, ImgWrapper, Sector, TextWrapper } from "../UI/Theme";
import Slider from "@farbenmeer/react-spring-slider";

function SVG(title) {
    const snap = useSnapshot(state);
    console.log(title);
    if (snap.sectors.at === title) {
        return(
        snap.sectors.map((work) => (
        work.svg
         ))
        )} else {
            return null
        }
  }

function Page(title) {

    const snap = useSnapshot(state);
    
    const ref = useRef(null);
    useEffect(() => {  
        // Locomotive Scroll
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

    
    // Get Works and Information
        state.loading = true;
        const ref1 = db.collection("portfolio").orderBy("projectYear", "desc");
        const getWorks = () => {
            ref1.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().at === title.title) {
                        items.push(doc.data());
                    }
                });
                state.sectors = items;
                state.loading = false;
            });
        }
        getWorks();
    }, [])

    return (
        <div className="bigContainer">
            <div className="head">
            <Draggable position={snap.prtPosition} onStart={() => false}>
            <br/>
            </Draggable>
            </div>
            <Container className="container" has-scroll-dragging="true" data-scroll-container ref={ref}>
                {snap.sectors.map((work) => (
                    <Sector className="sector">
                        <TextWrapper className="textWrapper">
                            <h3 key={`/${work.at}`}>{work.projectName}</h3>
                            <p key={`/${work.at}`}>{work.statement}</p>
                            <div style={{display: "flex", justifyContent:"space-between"}}>
                            <h5 key={`/${work.at}`}>{`${work.projectMedium}`}</h5>
                            <h4 key={`/${work.at}`}>{`${work.projectYear.toDate().getMonth() + 1} ${work.projectYear.toDate().getFullYear()}`}</h4>
                            <h5 key={`/${work.at}`}>{`${work.projectClient}`}</h5>
                            </div>
                        </TextWrapper>
                        
                        <ImgWrapper>
                        {work.images.map((url) => (
                            <img src={`${url}`} alt={`/${work.at}`} key={`/${work.at}`} />
                        ))}
                        </ImgWrapper>
                    </Sector>
                ))}
            </Container>
        </div>
    )
}

export { Page }
