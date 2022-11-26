import { useEffect, useRef } from "react";
import { cloud } from "../../../common/state";
import { BySign } from "./page.style";

// Misc.
export function useDocumentTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    [prevailOnUnmount]
  );
}
export function handleKeyPress(e) {
  // esc to clear modal
  if (e.key === "Escape") {
    cloud.selectedDesc = null;
    cloud.selectedImg = null;
    return;
  }

  // Next
  if (e.key === "ArrowRight") {
    Next();
    return;
  }

  // Prev
  if (e.key === "ArrowLeft") {
    Prev();
    return;
  }
  // Do nothing when these are pressed
  if (
    e.key === "Enter" ||
    e.key === "Shift" ||
    e.key === "Meta" ||
    e.key === "CapsLock" ||
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "Alt"
  ) {
    return;
  }
}
// Modal
export function Next() {
  let num = cloud.work.content.indexOf(cloud.selectedImg);
  if (cloud.work.content[num + 1]) {
    if (num !== -1) {
      num += 1;
      cloud.selectedImg = cloud.work.content[num];
    }
  }
}

export function Prev() {
  let num = cloud.work.content.indexOf(cloud.selectedImg);
  if (cloud.work.content[num - 1]) {
    if (num !== -1) {
      num -= 1;
      cloud.selectedImg = cloud.work.content[num];
    }
  }
}

export function CreatorMedal({ name }) {
  if (name) {
    return (
      <BySign
        onClick={
          name === "AA"
            ? () => navigator.clipboard.writeText("aite@nabla.ooo")
            : () => null
        }
        byColor={eval(name)[0]}
        byGradient={eval(name)[1]}
      >
        {name}
      </BySign>
    );
  }
}

export const AA = [
  `rgba(230,4,49,1)`,
  `linear-gradient(333deg, rgba(227,119,141,1) 0%, rgba(230,4,49,1) 100%)`,
];
export const CM = [
  `rgb(15,85,226)`,
  `linear-gradient(333deg, rgba(15,85,226,1) 0%, rgba(54,139,224,1) 100%)`,
];
export const ML = [
  `rgb(252,142,1)`,
  `linear-gradient(333deg, rgba(252,142,1,1) 0%, rgba(252,218,69,1) 100%)`,
];
