import React, { useRef } from "react";
import Draggable from "react-draggable";
import { useSnapshot } from "valtio";
import { cloud, state } from "./state";
import { Folder } from "./style";
import { ResetIcon, ShowHideIcon } from "./svg";
import { offset } from "./mobileNavigator";

export function Grabber({ handle, resetButton, reset, navWrap, nav, setModal }) {
    const grab = useRef(null);
    const clip = useSnapshot(cloud);
    const snap = useSnapshot(state);

    function handleEvent(e) {
        if (e.type === "mousedown" || e.type === "touchmove") {
            cloud.dragged = true;
            navWrap.current.style.overFlowX = 'visible';
            // navWrap.current.setAttribute("style", "transition: 0s !important;");
            handle.current.setAttribute("style", `fill-opacity: 100% !important; stroke-width: 0px !important; transition: 0s !important; cursor:grab !important;`);
        } else if (e.type === "mouseenter" || e.type === "touchstart") {
            handle.current.setAttribute("style", "fill-opacity: 20% !important; stroke-width: 1px !important; transition: 0.3s !important; stroke-opacity: 50%; cursor:grab !important;");
        } else if (e.type === "mouseleave" || e.type === "touchend") {
            handle.current.setAttribute("style", "fill-opacity: 0% !important; stroke-width: 1px !important; transition: 0.3s; stroke-opacity: 100%; cursor:grab;");
        }
    }

    function release() {
        if (handle.current !== undefined && handle.current !== null) {
            handle.current.setAttribute("style", "fill-opacity: 0% !important; stroke-width: 1px !important; transition: 0.3s; cursor:grab;");
            // document.getElementsByClassName("Panel").classList.remove("grabbing")
        }
    }
    window.addEventListener("mouseup", release);
    window.addEventListener("touchend", release);
    window.addEventListener("touchstart", () => {
        if (navWrap.current) {
            navWrap.current.style.transition = "0.1s";
        }
        if (grab.current) {
            grab.current.style.transition = "1.3s";
        }
    });

    const onControlledDrag = (e, position) => {
        let { x, y } = position;
        state.searchPosition = { x: (x / - 1.7), y: 0 };
        state.optionsPosition = { x: (x * 1.4), y: 0 };
        state.grabberPosition = { x, y };
    }

    return (
        <Draggable bounds={clip.mobile ? ".mobileNavWrap" : "body"} nodeRef={grab} onDrag={clip.mobile ? onControlledDrag : () => false} axis="none" position={clip.mobile ? { x: snap.grabberPosition.x, y: 0 } : { x: 0, y: 0 }}>
            <div ref={grab} className='GrabberWrap'>
                {/* MOBILE HIDER */}
                {snap.hideNav && !clip.dragged && clip.mobile ?
                    <Folder
                        onTouchEnd={() => {
                            reset();
                            navWrap.current.style.transition = "1.3s";
                            state.mobileNavPosition = { x: 0, y: (offset + 15) };
                            setTimeout(() => {
                                navWrap.current.style.transition = "0.1s";
                            }, "1300");
                            state.hideNav = false;
                            cloud.dragged = false;
                        }}
                        className={`li resetPos w`}>{clip.mobile ? <ShowHideIcon n={1} /> : <ResetIcon />}
                    </Folder> :
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="grabber"
                        data-name="Layer 1"
                        viewBox="0 0 50 25"
                        onTouchStart={handleEvent} onTouchEnd={handleEvent} onTouchMove={handleEvent}
                        ref={handle}
                    >
                        <g>
                            <circle vectorEffect="non-scaling-stroke" cx="10.5" cy="12.5" r="3.18"></circle>
                            <circle vectorEffect="non-scaling-stroke" cx="25" cy="12.5" r="3.18"></circle>
                            <circle vectorEffect="non-scaling-stroke" cx="39.5" cy="12.5" r="3.18"></circle>
                        </g>
                    </svg>}
                {(!clip.mobile && clip.dragged) &&
                    <Folder
                        onTouchEnd={() => {
                            setModal(false);
                            cloud.resetRate = (Math.random() * (0.85 - 0.65) + 0.65);
                            reset();
                            grab.current.style.transition = "1.3s";
                            navWrap.current.style.transition = "1.3s";
                            state.searchPosition = { x: 0, y: 0 };
                            state.optionsPosition = { x: 0, y: 0 };
                            state.grabberPosition = { x: 0, y: 0 };
                            state.mobileNavPosition = { x: 0, y: 0 };
                            cloud.dragged = false;
                            setTimeout(() => {
                                navWrap.current.style.transition = "0.1s";
                                grab.current.style.transition = "1.3s";
                                console.log("transition returned");
                            }, "1300");
                        }}
                        onClick={() => {
                            state.isOpt = false;
                            state.isPro = false;
                            cloud.resetRate = (Math.random() * (0.85 - 0.65) + 0.65);
                            reset();
                            nav.current.style.transition = "1.3s";
                            state.navPosition = { x: 0, y: 0 };
                            state.proPosition = { x: 0, y: 0 };
                            state.optPosition = { x: 0, y: 0 };
                            cloud.dragged = false;
                            setTimeout(() => {
                                nav.current.style.transition = "0.1s";
                                console.log("transition returned");
                            }, "1300");
                        }} className="li resetPos w">{clip.mobile ? "reset" : <ResetIcon />}
                    </Folder>}
            </div>
        </Draggable>
    );
}