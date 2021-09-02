import React, { useEffect, useRef } from "react";
import LocomotiveScroll from 'locomotive-scroll'
import '../../App.css'
import "./Stream.css";
import styled from "styled-components"
import { GeeseSVG, SwamiSVG, TidalSVG } from '../UI/svg'

function Geese() {
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
    return (
        <div className="bigContainer">
            <div className="head">
                <GeeseSVG />
            </div>
            <div className="container abt" has-scroll-dragging="true" data-scroll-container ref={ref}>
            </div>
        </div>
    )
}

function Swami() {

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
    return (
        <div className="bigContainer">
            <div className="head">
                <SwamiSVG />
            </div>
            <div className="container abt" has-scroll-dragging="true" data-scroll-container ref={ref}>
            </div>
        </div>
    )
}

function Tidal() {

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
    return (
        <div className="bigContainer">
            <div className="head">
                <TidalSVG />
            </div>
            <div className="container abt" has-scroll-dragging="true" data-scroll-container ref={ref}>
            </div>
        </div>
    )
}
export { Geese, Swami, Tidal }
