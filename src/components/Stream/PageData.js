import React, { useRef } from 'react'
import { GetSectors, db } from '../..'
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import { ImgWrapper, Sector, TextWrapper } from "../UI/style"
import { motion } from 'framer-motion'


const ImgGrid = ({ work }) => {
    const refWrapper = useRef(null);
    function setSelectedImg(selected) {
        state.selectedImg = selected;
        setTimeout(() => {
            state.isPro = false;
            state.isOpt = false;

        }, 300);
    }

    // Each individual image or video
    function Block(url) {
        // Get enxtentions of files
        const types = new Map([["jpg", "img"], ["jpeg", "img"], ["png", "img"], ["gif", "img"], ["mp4", "video"], ["svg", "svg"]])
        const link = new URL(`${url.url}`)
        const extension = link.pathname.split(".")
        const element = types.get(extension[extension.length - 1].toLowerCase())

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
                        key={Math.random()} className="Lvideo">
                        <video className={"landscape"} key={`${Math.random()}`} autoPlay={work.autoplay} playsInline controls preload={"none"} poster={`${work.poster}`} loop={work.loop} muted={work.muted} src={`${url.url}`}>{`${work.at}`}</video>
                    </div>
                )
            }
        }
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
    GetSectors(db, id.id)

    const makeLot = (work) => {
        let lot = (id.id.slice(0, 2)) + (work.projectYear.toDate().getFullYear().toString().slice(2, 5)) + (work.projectYear.toDate().getMonth() + 1) + (work.projectName.slice(0, 3));
        lot = lot.toUpperCase();
        return lot;
    };

    return (
        <>
            {snap.sectors.map((work) => (
                <Sector key={`${Math.random()}`} id={work.projectName.replace(/\s+/g, '')} className="sector">
                    <TextWrapper key={`${Math.random()}`} className="textWrapper">
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <span key={`${Math.random()}`} className="lot">LOT#: {makeLot(work)}</span>
                        </div>
                        <h2 key={`${work.projectName}`}>{work.projectName}</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", justifyContent: "center" }}>
                            <h5 key={`${work.projectClient}`}>{`${work.projectClient}`}</h5>
                            <h4 key={`${work.projectYear}`}>{`${work.projectYear.toDate().getMonth() + 1} ${work.projectYear.toDate().getFullYear()}`}</h4>
                            <h5 className="last" key={`${work.projectMedium}`}>{`${work.projectMedium}`}</h5>
                        </div>
                        <p key={`${work.statement}`}>{work.statement}</p>

                    </TextWrapper>
                    <ImgGrid setSelectedImg={setSelectedImg} work={work} />
                </Sector>
            ))}
        </>
    )
})

export default PageData
