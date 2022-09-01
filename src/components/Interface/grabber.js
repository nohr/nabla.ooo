import React, { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { useSnapshot } from "valtio";
import { cloud, state } from "../utils/state";
import { Folder, offset } from "../utils/common";
import { ResetIcon, ShowHideIcon } from "../utils/svg";

export function Grabber({ handle, reset, navWrap }) {
    const grab = useRef(null);
    const clip = useSnapshot(cloud);
    const snap = useSnapshot(state);

    function handleEvent(e) {
        if (e.type === "mousedown" || e.type === "touchmove") {
            state.dragged = true;
            navWrap.current.style.overFlowX = 'visible';
            // navWrap.current.setAttribute("style", "transition: 0s !important;");
            handle.current.setAttribute("style", `fill-opacity: 20% !important; stroke-width: 1px !important; transition: 0s !important; cursor:grab !important;`);
        } else if (e.type === "mouseenter" || e.type === "touchstart") {
            handle.current.setAttribute("style", "fill-opacity: 0% !important; stroke-width: 1px !important; transition: 0.3s !important; stroke-opacity: 50%; cursor:grab !important;");
        } else if (e.type === "mouseleave" || e.type === "touchend") {
            handle.current.setAttribute("style", "fill-opacity: 100% !important; stroke-width: 1px !important; transition: 0.3s; stroke-opacity: 100%; cursor:grab;");
        }
    }

    function release() {
        if (handle.current !== undefined && handle.current !== null) {
            handle.current.setAttribute("style", "fill-opacity: 100% !important; stroke-width: 1px !important; transition: 0.3s; cursor:grab;");
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
        state.grabberPosition = { x: x, y: 0 };
    }

    return (
        <Draggable bounds={clip.mobile ? ".mobileNavWrap" : "body"} nodeRef={grab} onDrag={clip.mobile ? onControlledDrag : () => false} axis="none" position={clip.mobile ? snap.grabberPosition : { x: 0, y: 0 }}>
            <div ref={grab} className='GrabberWrap'>
                {/* MOBILE Shower */}
                {snap.hideNav && !snap.dragged && clip.mobile ?
                    <Folder
                        onTouchEnd={() => {
                            reset();
                            navWrap.current.style.transition = "1.3s";
                            state.mobileNavPosition = { x: 0, y: 0 };
                            setTimeout(() => {
                                navWrap.current.style.transition = "0.1s";
                            }, "1300");
                            state.hideNav = false;
                            state.dragged = false;
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
            </div>
        </Draggable>
    );
}

export function Rotate(resetButton, clip, snap) {
    let rad = clip.mobile ? -Math.atan(state.grabberPosition.x / (-state.grabberPosition.y + (offset - 20))) : Math.atan((state.navPosition.x + 50) / (-state.navPosition.y + (offset - 150)));

    const deg = rad * (180 / Math.PI);
    if (snap.dragged && resetButton.current) {
        resetButton.current.style.transform = `rotate(${deg}deg)`;
    }
}
export function ResetPosButton({ resetButton, reset, nav }) {
    const clip = useSnapshot(cloud);
    const snap = useSnapshot(state);

    // Rotate reset button
    useEffect(() => {
        Rotate(resetButton, clip, snap);
    }, [state.grabberPosition, state.navPosition]);

    if (!clip.mobile && snap.dragged) {
        return <Folder
            ref={resetButton}
            onClick={() => {
                state.isOpt = false;
                state.isPro = false;
                cloud.resetRate = (Math.random() * (0.85 - 0.65) + 0.65);
                reset();
                nav.current.style.transition = "1.3s";
                state.navPosition = { x: 0, y: 0 };
                state.proPosition = { x: 0, y: 0 };
                state.optPosition = { x: 0, y: 0 };
                state.dragged = false;
                setTimeout(() => {
                    nav.current.style.transition = "0.1s";
                    console.log("transition returned");
                }, "1300");
            }} className="li resetPos w">{clip.mobile ? "reset" : <ShowHideIcon n={2} />}
        </Folder>
    }
}