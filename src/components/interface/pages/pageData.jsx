import React, { useRef, memo, useEffect } from "react";
import { cloud, state } from "../../../common/state";
import { Program } from "../../../common/svg";
import { useSnapshot } from "valtio";
import { motion } from "framer-motion";
import { GetSector } from "../../../common/api/firebase.service";
import { Scroller } from "./page.style";
import { CreatorMedal } from "./utils";
import {
  ImgWrapper,
  InfoCard,
  Sector,
  TextWrapper,
  TrayWrapper,
} from "./pageData.style";

const ImgGrid = ({ work }) => {
  const refWrapper = useRef(null);
  function setSelectedImg(selected) {
    cloud.selectedImg = selected;
    if (selected.caption !== "") {
      cloud.selectedDesc = selected.caption;
    }
    setTimeout(() => {
      state.isPro = false;
      state.isOpt = false;
    }, 1500);
  }

  // Each individual image or video
  function Block({ item }) {
    if (item.type === "video") {
      // detect video resolution
      if (item.orientation === "landscape") {
        return (
          <video
            className="Lvideo landscape"
            // onClick={() => {
            //   setSelectedImg(item.url);
            //   cloud.work = work;
            // }}
            key={`${item.id}`}
            autoPlay={false}
            playsInline
            preload={"metadata"}
            // poster={item.poster ? `${item.poster}` : false}
            loop={false}
            muted={false}
            // controls={true}
            src={`${item.url}`}
          >
            {`${item.name}`}
          </video>
        );
      } else if (item.orientation === "portrait") {
        return (
          <video
            onClick={() => {
              setSelectedImg(item);
              cloud.work = work;
            }}
            style={{
              height: "100%",
            }}
            key={item.id}
            autoPlay={true}
            playsInline
            preload={"none"}
            // poster={`${work.poster}`}
            loop={true}
            muted={true}
            src={item.url}
            className="portrait"
          >
            {item.name}
          </video>
        );
      }
    } else {
      return (
        <motion.div
          className="img-thumb"
          layout
          whileHover={{ opacity: 1 }}
          onClick={() => {
            setSelectedImg(item);
            cloud.work = work;
          }}
          style={{
            backgroundImage: `url(${item.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <object
            key={`${Math.random()}`}
            data={`${item.url}`}
          >{`${item.name}`}</object> */}
          {item.caption && item.caption !== "" && <p>{item.caption}</p>}
        </motion.div>
      );
    }
  }

  // const clip = useSnapshot(cloud);
  return (
    <TrayWrapper>
      <ImgWrapper
        key={`${Math.random()}`}
        className="imgWrapper"
        ref={refWrapper}
      >
        <>
          {work.content &&
            work.content.map((item) => (
              <Block item={item} key={`${item.id}`} />
            ))}
        </>
      </ImgWrapper>
      <InfoCard>
        {/* {work.link && <Links link={work.link} />} */}
        {work.program && <Program size={"40px"} program={work.program} />}
        <Scroller animation="none">
          {work.by
            ? work.description && (
                <p>
                  {`"${work.description}" -`}
                  <CreatorMedal name={work.by} />
                </p>
              )
            : work.description && <p>{`${work.description}`}</p>}
        </Scroller>
      </InfoCard>
    </TrayWrapper>
  );
};

function PageData({ lot }) {
  const clip = useSnapshot(cloud);
  GetSector(lot);

  useEffect(() => {
    state.isOpt = false;
    state.isPro = false;
    return () => {
      cloud.sector = [];
    };
  }, []);

  return (
    <>
      {clip.sector.map((work) => (
        <Sector
          key={`${Math.random()}`}
          id={work.name.replace(/\s+/g, "")}
          className="sector"
        >
          <TextWrapper key={`${Math.random()}`} className="textWrapper">
            <div>
              <span key={`${Math.random()}`} className="lot">
                {work.date && work.lot}
              </span>
            </div>
            <h2 key={`${work.name}`}>{work.name}</h2>
            <div className="metadata">
              {/* <h5 key={`${work.projectClient}`}>{`${work.projectClient}`}</h5> */}
              <h4 key={`${work.date}`}>{`${
                work.date.toDate().getMonth() + 1
              } ${work.date.toDate().getFullYear()}`}</h4>
              <h4 key={`${work.category}`}>{`${work.category}`}</h4>
            </div>
          </TextWrapper>
          <ImgGrid work={work} />
        </Sector>
      ))}
    </>
  );
}

export default memo(PageData);
