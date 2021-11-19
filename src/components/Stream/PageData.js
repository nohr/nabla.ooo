import React, { useEffect, useRef } from 'react'
import db from '../../firebase'
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import { ImgWrapper, Sector, TextWrapper } from "../UI/Theme"
import { motion } from 'framer-motion'
// import '@iconfu/svg-inject.min.js'


function Setup(id) {
    // Get Works and Information
    useEffect(() => {
        state.loading = true;
        const ref1 = db.collection("portfolio").orderBy("projectYear", "desc");
        const getWorks = () => {

            ref1.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().at === id.id) {
                        items.push(doc.data());
                    }
                });
                state.sectors = items;
                state.loading = false;
            });
        }
        const unsub = () => {
            ref1.onSnapshot(() => {
                const items = [];
                state.sectors = items;
                state.loading = false;
            });
        }
        getWorks();
        return () => unsub();
    }, [id.id]);
}




const ImgGrid = ({ work }) => {
    const refWrapper = useRef(null);
    function setSelectedImg(selected) {
        state.selectedImg = selected;
        if (state.isPort || state.isSett) {
            state.isPort = false;
            state.isSett = false;
        }
    }

    // Each individual image or video
    function Block(url) {
        // Get enxtentions of files
        const types = new Map([["jpg", "img"], ["jpeg", "img"], ["png", "img"], ["gif", "img"], ["mp4", "video"], ["svg", "svg"]])
        const link = new URL(`${url.url}`)
        const extension = link.pathname.split(".")
        const element = types.get(extension[extension.length - 1].toLowerCase())
        // console.log(url.url)

        if (element === "video") {
            if (work.orientation === "portrait") {
                return (
                    <video style={{
                        height: "100%"
                    }} key={`${Math.random()}`} autoPlay={work.autoplay} playsInline preload={"none"} poster={`${work.poster}`} loop={work.loop} muted={work.muted} src={`${url.url}`}>{`${work.at}`}</video>

                )
            } else if (work.orientation === "landscape") {
                return (
                    <div
                        key={Math.random()}>
                        <video className={"landscape"} key={`${Math.random()}`} autoPlay={work.autoplay} playsInline controls preload={"none"} poster={`${work.poster}`} loop={work.loop} muted={work.muted} src={`${url.url}`}>{`${work.at}`}</video>
                    </div>
                )
            }
        }
        // else if (element === "svg") {
        //     return (
        //         <motion.div className="img-thumb"
        //             key={Math.random()}
        //             layout
        //             whileHover={{ opacity: 1 }}
        //             onClick={() => setSelectedImg(url.url)}
        //         ><img key={`${Math.random()}`} src={`${url.url}`} alt={`${work.at}`} onload={SVGInject(this)} />
        //         </motion.div>
        //     )
        // }
        else {
            return (
                <motion.div className="img-thumb"
                    layout
                    whileHover={{ opacity: 1 }}
                    onClick={() => setSelectedImg(url.url)}
                ><object key={`${Math.random()}`} data={`${url.url}`}>{`${work.at}`}</object>
                </motion.div>
            )
        }
    }

    return (
        <>
            <ImgWrapper key={`${Math.random()}`} className="imgWrapper" ref={refWrapper}>
                <>
                    {work.images && work.images.map((url) => (
                        <Block url={url} key={`${Math.random()}`} />
                    ))}
                </>
            </ImgWrapper>
        </>
    )
}

const PageData = React.memo(function PageData(id, setSelectedImg) {
    const snap = useSnapshot(state);
    Setup(id);
    return (
        <>
            {snap.sectors.map((work) => (
                <Sector key={`${Math.random()}`} className="sector">
                    <span key={`${Math.random()}`} className="lot">LOT#: {Math.random()}</span>
                    <TextWrapper key={`${Math.random()}`} className="textWrapper">
                        <h3 key={`${work.projectName}`}>{work.projectName}</h3>
                        <p key={`${work.statement}`}>{work.statement}</p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h5 key={`${work.projectMedium}`}>{`${work.projectMedium}`}</h5>
                            <h4 key={`${work.projectYear}`}>{`${work.projectYear.toDate().getMonth() + 1} ${work.projectYear.toDate().getFullYear()}`}</h4>
                            <h5 key={`${work.projectClient}`}>{`${work.projectClient}`}</h5>
                        </div>
                    </TextWrapper>
                    <ImgGrid setSelectedImg={setSelectedImg} work={work} />
                </Sector>
            ))}
        </>
    )
})

export default PageData
