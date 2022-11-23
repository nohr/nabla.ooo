import React, { memo, useEffect, useRef, useState } from "react";
import { cloud, state } from "../../../common/state";
import { useSnapshot } from "valtio";
import Draggable from "react-draggable";
import { Link, useLocation } from "wouter";
import { GetSector, GetSectors } from "../../../common/api/firebase.service";
import { Group, Project, TitleList } from "./panel.style";
import {
  getPosPro,
  projectListLayout,
  useHeader,
  useHide,
  useLayout,
  useTop,
} from "./utils";

function Projects({ select, open, close, confirm, reset, vWidth, vHeight }) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const [groupIndex, setGroupIndex] = useState(0);
  const [groupID, setGroupID] = useState(null);
  const pro = useRef(null);
  const [location] = useLocation();
  const offset = getPosPro(snap, vWidth, vHeight);
  const header = useHeader(snap);
  const layout = useLayout(snap);
  const top = useTop(snap);

  useEffect(() => {
    return () => {
      snap.isPro ? close() : open();
    };
  }, [snap.isPro, open, close]);

  let groups = ["category", "type"];
  function handleGroups() {
    setGroupIndex((prev) => (prev + 1) % groups.length);
    reset();
  }

  let filter = [];
  function GroupList() {
    // look for group id's and map each title and list
    clip.data.map(
      (work, index) =>
        work[groups[groupIndex]] &&
        filter.indexOf(work[groups[groupIndex]]) === -1 &&
        filter.push(work[groups[groupIndex]]) &&
        index
    );

    filter.sort((a, b) => a.length - b.length);
    let clients = clip.data.map((work) => work.client);
    clients = clients.filter((item, index) => clients.indexOf(item) === index);
    clients.sort((a, b) => a.length - b.length);
    // console.log(clients);
    // clip.types.reverse();
    // console.log(filter);
    // Iterate over groups
    return (
      <Group
        margin={
          snap.direction
            ? null
            : `margin: auto 20px;
              padding: 20px 25px;`
        }
      >
        {filter.map((title) => (
          <TitleList>
            <p style={header} onClick={handleGroups} id="selfhead">
              {title}
            </p>
            <div className="list">
              {/* TODO: order both by date */}
              {groupIndex === 0 &&
                clip.data
                  .filter((work) => work.category === title)
                  .map((work) => (
                    <>
                      <Link
                        onClick={() => {
                          confirm();
                        }}
                        // style={snap.direction ? { width: '70%' } : { width: '100%' }}
                        className={`li w ${
                          location.substring(1) === work.lot ? "active" : null
                        }`}
                        to={`/${work.lot}`}
                        tabIndex={state.isPro ? "0" : "-1"}
                        key={work.lot}
                      >
                        {work.name}
                      </Link>
                    </>
                  ))}
              {groupIndex === 1 &&
                clip.data
                  .filter((work) => work.type === title)
                  .map((work) => (
                    <>
                      <div
                        onClick={() => {
                          select();
                          setGroupID(work.client);
                          GetSectors(work.client);
                        }}
                        style={
                          clip.direction ? { width: "70%" } : { width: "80%" }
                        }
                        className={`li w ${
                          clip.sector[0] &&
                          clip.sector[0].client === work.client &&
                          "active"
                        }`}
                        tabIndex={state.isPro ? "0" : "-1"}
                        key={work.lot}
                      >
                        {work.client}
                      </div>
                    </>
                  ))}
            </div>
          </TitleList>
        ))}
      </Group>
    );
  }

  function ProjectsList() {
    return (
      <>
        {clip.sectors.map((work) => (
          <Link
            onClick={() => {
              confirm();
              GetSector(work.lot);
            }}
            style={
              snap.direction
                ? { width: "50%", margin: "0 auto" }
                : { width: "50%", margin: "0 auto" }
            }
            className={`li w ${
              location.substring(1) === work.lot ? "active" : ""
            }`}
            to={`/${work.lot}`}
            tabIndex={state.isPro ? "0" : "-1"}
            key={work.lot}
          >
            {work.name}
          </Link>
        ))}
      </>
    );
  }

  function QueryList() {
    let query = clip.data.filter(
      (work) =>
        work.name.toLowerCase().includes(clip.query) ||
        work.category.toLowerCase().includes(clip.query)
    );
    // sort by date
    query.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return (
      <>
        {query.map((work) => (
          <Link
            onClick={() => {
              GetSector(work.lot);
              confirm();
              cloud.query = "";
            }}
            style={snap.direction ? { width: "70%" } : { width: "100%" }}
            className={`li w ${
              location.substring(1) === work.lot ? "active" : ""
            }`}
            to={`/${work.lot}`}
            tabIndex={state.isPro ? "0" : "-1"}
            key={work.lot}
          >
            {work.name}
          </Link>
        ))}
      </>
    );
  }

  function Back() {
    return (
      <p
        // className="li"
        style={snap.direction ? { width: "95%" } : { width: "64%" }}
        onClick={() => {
          reset();
          setGroupID(null);
          cloud.sectors = [];
        }}
      >
        BACK
      </p>
    );
  }

  return (
    <Draggable
      nodeRef={pro}
      position={snap.proPosition}
      positionOffset={offset}
      onStart={() => false}
    >
      <Project
        hide={useHide(snap)}
        layout={groupID ? projectListLayout : layout}
        top={top}
        ref={pro}
        className={clip.drag ? "Panel pro glow" : "Panel pro"}
        align={
          !snap.direction
            ? "center"
            : !snap.proSwitched
            ? "flex-end"
            : "flex-start"
        }
      >
        {groupID && <Back />}
        {clip.query.length > 0 ? (
          <QueryList />
        ) : !groupID ? (
          <GroupList />
        ) : (
          <ProjectsList />
        )}
        {snap.isOpt}
      </Project>
    </Draggable>
  );
}

export default memo(Projects);
