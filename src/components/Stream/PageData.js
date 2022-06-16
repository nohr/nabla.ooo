import React, { useRef, useMemo } from 'react'
import { GetSectors, db } from '../..'
import { state, cloud } from '../UI/state'
import { useSnapshot } from 'valtio'
import { ImgWrapper, InfoCard, Sector, TextWrapper, TrayWrapper } from "../UI/style"
import { motion } from 'framer-motion'
import { AA, BySign, Scroller } from '../UI/search'
import { Links, Program } from '../UI/svg'

const ImgGrid = ({ work }) => {
    const refWrapper = useRef(null);
    function setSelectedImg(selected) {
        let index = work.images.indexOf(selected)
        state.selectedImg = selected;
        if (work.description) {
            state.selectedDesc = work.description[index]
        }
        // setTimeout(() => {
        //     state.isPro = false;
        //     state.isOpt = false;

        // }, 300);
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
                    }} key={`${Math.random()}`} autoPlay={eval(work.autoplay)} playsInline preload={"none"} poster={`${work.poster}`} loop={eval(work.loop)} muted={eval(work.muted)} src={`${url.url}`}>{`${work.at}`}</video>

                )
            } else if (work.orientation === "landscape") {
                return (
                    <div
                        key={Math.random()} className="Lvideo">
                        <video className={"landscape"} key={`${Math.random()}`} autoPlay={eval(work.autoplay)} playsInline controls preload={"none"} poster={work.poster ? `${work.poster}` : false} loop={eval(work.loop)} muted={eval(work.muted)} src={`${url.url}`}>{`${work.at}`}</video>
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
        <TrayWrapper>
            <InfoCard>
                {/* {work.link && <Links link={work.link} />} */}
                {work.program && <Program size={'40px'} program={work.program} />}
                <Scroller>
                    {work.by ? (work.statement && <p>{`"${work.statement}" -`} {work.by === 'AA' && <BySign byColor={AA[0]} byGradient={AA[1]} >AA</BySign>}</p>) : (work.statement && <p>{`${work.statement}`}</p>)}
                </Scroller>
            </InfoCard>
            <ImgWrapper key={`${Math.random()}`} className="imgWrapper" ref={refWrapper}>
                <>
                    {work.images && work.images.map((url) => (
                        <Block url={url} key={`${Math.random()}`} />
                    ))}
                </>
            </ImgWrapper>
        </TrayWrapper>
    )
}

function PageData(id, setSelectedImg) {
    const clip = useSnapshot(cloud);
    GetSectors(db, id.id);

    const makeLot = (work) => {
        let lot = (
            id.id.slice(0, 2))
            + (work.projectYear.toDate().getFullYear().toString().slice(2, 5))
            + (work.projectYear.toDate().getMonth() + 1)
            + (work.projectName.slice(0, 2))
            + (work.by.slice(0, 1));
        lot = lot.toUpperCase();
        return lot;
    };
    console.log(clip.sectors.length);
    const sectors = useMemo(() =>
        <>
            {clip.sectors.map((work) => (
                <Sector
                    width={clip.sectors.length > 1 ? '48%' : '100%'}
                    height={clip.sectors.length > 1 ? '90%' : '100%'}
                    key={`${Math.random()}`} id={work.projectName.replace(/\s+/g, '')} className="sector">
                    <TextWrapper key={`${Math.random()}`} className="textWrapper">
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <span key={`${Math.random()}`} className="lot">{work.projectYear && makeLot(work)}</span>
                        </div>
                        <h2 key={`${work.projectName}`}>{work.projectName}</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", justifyContent: "center" }}>
                            <h5 key={`${work.projectClient}`}>{`${work.projectClient}`}</h5>
                            <h4 key={`${work.projectYear}`}>{`${work.projectYear.toDate().getMonth() + 1} ${work.projectYear.toDate().getFullYear()}`}</h4>
                            <h5 className="last" key={`${work.projectMedium}`}>{`${work.projectMedium}`}</h5>
                        </div>
                    </TextWrapper>
                    <ImgGrid setSelectedImg={setSelectedImg} work={work} />
                </Sector>
            ))}
        </>, [cloud.sectors])
    return sectors;
}

export default PageData
