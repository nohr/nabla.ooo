import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { useLocation } from "wouter";
import { cloud } from "../../../common/state";
import { ClearIcon, SearchBarIcon } from "../../../common/svg";
import { SearchBar, SearchWrapper } from "./panel.style";
import {
  handleChange,
  handleClick,
  handleCommandPress,
  handleKeyPress,
} from "./utils";

export function Search({ admin, user }) {
  const [placeholder, setPlaceholder] = useState("(alt + z)");
  const [chatText, setChatText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useLocation();
  const Bar = useRef(null);
  const clip = useSnapshot(cloud);

  useEffect(() => {
    let keys = {};

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
    window.addEventListener("click", handleClick(Bar, setPlaceholder));
    window.addEventListener("keydown", (e) =>
      handleCommandPress(e, keys, Bar, setPlaceholder)
    );

    return () => {
      // if (Bar.current) {
      //   Bar.current.removeEventListener("keydown", (e) =>
      //     handleKeyPress(
      //       e,
      //       setSearchText,
      //       Bar,
      //       setPlaceholder,
      //       setChatText,
      //       clip
      //     )
      //   );
      // }
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleCommandPress);
    };
  }, [chatText, searchText, clip.chatMode, setLocation, admin, user, clip]);

  return (
    <SearchWrapper>
      <SearchBar
        placeholder={clip.chatMode ? "what's up?" : placeholder}
        type="text"
        value={!clip.chatMode ? searchText : chatText}
        onChange={(e) => handleChange(e, clip, setSearchText, setChatText)}
        ref={Bar}
      ></SearchBar>
      {clip.chatMode}
      <SearchBarIcon clip={clip} />
      {(searchText.length > 0 || chatText.length > 0) && (
        <div
          id="clearIcon"
          onClick={() => {
            Bar.current.focus();
            setSearchText("");
            setChatText("");
          }}
        >
          <ClearIcon />
        </div>
      )}
    </SearchWrapper>
  );
}
