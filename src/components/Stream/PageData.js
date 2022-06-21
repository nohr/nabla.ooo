import React, { useRef, useMemo } from 'react'
import { GetSectors, db } from '../..'
import { state, cloud } from '../UI/state'
import { useSnapshot } from 'valtio'
import styled from 'styled-components'
import { InfoCard } from "../UI/style"
import { motion } from 'framer-motion'
import { CreatorMedal, Scroller } from '../UI/search'
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
                    {work.by ? (work.statement && <p>{`"${work.statement}" -`} {work.by === 'AA' && <CreatorMedal name={'AA'} />}</p>) : (work.statement && <p>{`${work.statement}`}</p>)}
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
        </>)
    return sectors;
}

export default PageData

const Sector = styled.div`
border: solid 1px;
border-color: ${props => props.theme.panelColor};
border-radius: 10px;
display: flex;
width: ${props => props.width};
height: ${props => props.height};
flex-direction:column;
padding: 10px 0px 0px 0px;
justify-content: space-around;
gap: 20px;
position: relative;
overflow: hidden;
transition: 1.3s !important;

& .lot{
  color: ${props => props.theme.panelColor};
  transition: 1.3s;
}
    @media screen and (max-width: 1440px) {
      & {
        width: 80%;
        height: 80%;
      }
  }
  @media screen and (max-width: 940px) {
      & {
        width: 100%;
        height: 100%;
      }
  }
  @media screen and (max-height: 1040px) {
      & {
        /* width: 80%; */
        height: 100%;
      }
  }
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  height: 20% !important;
  flex-wrap: nowrap;
  color: ${props => props.theme.panelColor};
  font-size: 14px;
  text-align: left;
  align-self: center;
  padding: 20px 20px 0 20px;
  transition: 1.3s;
  white-space: break-spaces;
  /* line-height: 25px; */

& h2{
  line-height: 30px;
  font-size: 40px;
  clear:both;
  align-self: center;
    text-align: center;
      text-shadow: 9px 4px 13px  ${props => props.theme.sky};
}

& h4, & h5{
  align-self: center;
  margin: 5px 0;
}

& h4{
  justify-self: center;
}
& h5.last{
  justify-self: flex-end;
}
& p {
  width: 60ch;
  display: inline;
  padding: 0% 3px;
  background-color: ${props => props.theme.layerBG};
  text-indent: 3em;
  overflow-y: scroll;
  padding: 0 !important;

  ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      position: absolute;
    }
    ::-webkit-scrollbar-thumb {
      outline: 1px solid ${props => props.theme.panelColor};
      border-radius: 4px;
      background-color: transparent;
      transition: 0.3s;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${props => props.theme.panelColor};
          box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          transition: 0.3s;
    }
}

& a{
  color: ${props => props.theme.link};
  text-decoration: underline;
}

`
const TrayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 70% !important;
    padding:0 20px 20px 20px ;
    gap: 20px;
  
`
const ImgWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 20px;
    padding-bottom: 5px;

    .img-thumb{
      border-radius: 5px;
      overflow: hidden;
      width: 0px;
      padding: 0 280px;
      position: relative;
      opacity: 1;
      pointer-events: all;
      border: 1px solid ${props => props.theme.panelColor};
      filter: grayscale(0);
      transition: 0.3s;

      &:hover{
      cursor: pointer;
      border-radius: 50%;
      }
    }
    .img-thumb:hover {
      filter: grayscale(1) !important;
    }
    object{
      @media only screen and (max-width: 1440px) {
        grid-template-rows: 35% 30% 35%;
        padding: 0 20px 0 20px;
      }
    /* max-height: 100%; */
    min-width: 100%;
    max-height: 150%;
    position: absolute;
    pointer-events:  all;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    }
    video{
      filter: grayscale(0) !important;
      border-radius: 5px;
      -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    opacity: 1;
    object-fit: contain;
    margin: 0;
    padding: 0;
    transition: 0.3s;
    }
    .landscape{
    height: 100% !important;
    width: auto !important;
    }
    video[poster]{
      border-radius: 5px;
      object-fit: fill;
      filter: grayscale(1);
      transition: 0.3s;
    }
     ::-webkit-scrollbar {
      -webkit-appearance: none;
      height: 5px;
      position: absolute;
    }
    ::-webkit-scrollbar-thumb {
      outline: 1px solid ${props => props.theme.panelColor};
      border-radius: 4px;
      background-color: transparent;
      transition: 0.3s;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${props => props.theme.panelColor};
          box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
          transition: 0.3s;
    }
`