/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import { ClearIcon } from "../../../common/svg";
import { useSnapshot } from "valtio";
import { cloud, state } from "../../../common/state";
import Draggable from "react-draggable";
import { useLocation } from "wouter";
import { Folder } from "../../../common/style";
import { offset } from "./utils";
import { SearchBar, SearchWrapper } from "./mobile.style";
import { handleChat, handleKeyPress } from "../desktop/utils";

export function Search({
  Bar,
  options,
  navWrap,
  reset,
  open,
  close,
  user,
  admin,
}) {
  const searchWrap = useRef(null);
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const [location, setLocation] = useLocation();
  const [placeholder, setPlaceholder] = useState("Search");
  const [searchText, setSearchText] = useState("");
  const [chatText, setChatText] = useState("");

  // handle audio
  useEffect(() => {
    open();
    return () => {
      close();
    };
  }, [open, close]);

  useEffect(() => {
    if (clip.chatMode) {
      setPlaceholder("what's up?");
    } else {
      setPlaceholder("Search");
    }
  }, [clip.chatMode]);

  useEffect(() => {
    cloud.preview = [];
    Bar.current.focus();
    if (navWrap.current) {
      navWrap.current.style.overflowX = "clip";
    }
    if (!snap.dragged) {
      state.mobileNavPosition.y = state.mobileNavPosition.y + offset;
    } else {
      // state.searchPosition.x = 0;
      navWrap.current.style.transition = "1.3s";
      // state.searchPosition = { x: 0, y: 0 };
      // state.optionsPosition = { x: 0, y: 0 };
      // state.grabberPosition = { x: 0, y: 0 };
      state.mobileNavPosition = { x: 0, y: options ? offset * 2 : offset };
      setTimeout(() => {
        navWrap.current.style.transition = "0.1s";
      }, "1300");
    }

    if (Bar.current) {
      Bar.current.addEventListener("keydown", (e) =>
        handleKeyPress(
          e,
          setSearchText,
          Bar,
          setPlaceholder,
          setChatText,
          clip,
          chatText,
          setLocation,
          admin,
          user
        )
      );
    }

    return () => {
      if (Bar.current) {
        Bar.current.removeEventListener("keydown", handleKeyPress);
      }
      if (navWrap.current) {
        navWrap.current.style.overflowX = "visible";
      }
      if (!snap.dragged) {
        state.mobileNavPosition.y = state.mobileNavPosition.y - offset;
      }
    };
  }, []);

  function handleChange(e) {
    if (clip.chatMode) {
      setChatText(e.target.value);
    } else {
      setSearchText(e.target.value);
      cloud.query = e.target.value;
    }
  }

  handleChat(chatText, setLocation, setChatText, admin, user);

  return (
    <Draggable
      nodeRef={searchWrap}
      bounds=".searchBounds"
      position={snap.searchPosition}
      axis="x"
      onStart={() => false}
    >
      <SearchWrapper
        ref={searchWrap}
        id="search"
        className="modalContent"
        opacity={!clip.mobileSearch ? "0" : "1"}
        pointerEvents={!clip.mobileSearch ? "none" : "all"}
        transition={!clip.mobileSearch ? "0.3s" : "unset"}
      >
        <SearchBar
          onTouchEnd={(e) => {
            e.target.focus();
            navWrap.current.style.overflowX = "clip";
            navWrap.current.style.transition = "1.3s";
            state.mobileNavPosition = {
              x: 0,
              y: options ? offset * 2 : offset,
            };
            setTimeout(() => {
              navWrap.current.style.transition = "0.1s";
            }, "1300");
          }}
          onBlur={() => (navWrap.current.style.overflowX = "visible")}
          placeholder={placeholder}
          type="text"
          value={clip.chatMode ? chatText : searchText}
          onChange={handleChange}
          ref={Bar}
        ></SearchBar>
        {(searchText.length > 0 || chatText.length > 0) && (
          <Folder
            onTouchEnd={() => {
              reset();
              navWrap.current.style.overflowX = "clip";
              setSearchText("");
              setChatText("");
              cloud.query = "";
              Bar.current.focus();
            }}
            id="clearIcon"
          >
            <ClearIcon />
          </Folder>
        )}
      </SearchWrapper>
    </Draggable>
  );
}
