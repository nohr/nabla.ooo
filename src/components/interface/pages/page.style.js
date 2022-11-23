import styled from "styled-components";

export const Container = styled.div`
  ${(props) => props.margin}
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  z-index: 470;
  overflow-y: scroll;
  overflow-x: hidden;
  /* overflow: ${(props) => props.overflow}; */
  -webkit-overflow-scrolling: touch;
  height: 100vh;
  width: 100vw;
  padding: 20px 15px 20px 20px;
  font-size: 14px;
  color: ${(props) => props.theme.panelColor};
  transition: ${(props) => props.transition};
  pointer-events: ${(props) => props.pointerEvents};
  opacity: ${(props) => props.opacity};

  .modalWrapper {
    position: absolute;
  }
  &.hom {
    pointer-events: none;
    width: 100vw;
    align-items: flex-end !important;

    .preview {
      /* display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 25% 75%; */
      display: flex;
      flex-direction: column;
      height: 20vh;
      border: 1px solid ${(props) => props.theme.textHover};
      color: ${(props) => props.theme.textHover};
      border-radius: 40px;
      box-shadow: none;
      /* background-color: ${(props) => props.theme.backdrop} !important; */
      background-color: transparent;
      /* height: 30vh !important; */
      position: unset !important;
      width: fit-content !important;
      justify-content: space-around;
      margin: 20px !important;
      opacity: 1;
      padding: 10px;
      pointer-events: none;
      backdrop-filter: blur(10px);

      & .icons {
        backdrop-filter: blur(20px);
        border-radius: 40px;
        flex-wrap: wrap;
        flex-direction: row-reverse;
        padding: 10px 20px;
        /* width: 90% !important; */
        justify-content: space-around !important;
        margin: 0 auto;

        & .both {
          display: flex;
          flex-direction: row-reverse;
          column-gap: 10px !important;
          align-items: center;
        }
      }

      & .icons .Program {
        flex-wrap: nowrap !important;
        padding: 0;
        & svg {
          margin: 0;
          height: 30px;
        }
      }
      h3 {
        margin: 0;
        white-space: nowrap;
        font-size: 20px;
        @media all and (min-width: 50px) {
          body {
            font-size: 0.4em;
          }
        }
        @media all and (min-width: 100px) {
          body {
            font-size: 0.3em;
          }
        }
        @media all and (min-width: 200px) {
          body {
            font-size: 0.6em;
          }
        }
        @media all and (min-width: 300px) {
          body {
            font-size: 0.8em;
          }
        }
        @media all and (min-width: 400px) {
          body {
            font-size: 1em;
          }
        }
        @media all and (min-width: 500px) {
          body {
            font-size: 1.2em;
          }
        }
        @media all and (min-width: 600px) {
          body {
            font-size: 1.4em;
          }
        }
        @media all and (min-width: 700px) {
          body {
            font-size: 1.6em;
          }
        }
        @media all and (min-width: 800px) {
          body {
            font-size: 1.8em;
          }
        }
        @media all and (min-width: 900px) {
          body {
            font-size: 2em;
          }
        }
        @media all and (min-width: 1000px) {
          body {
            font-size: 2.2em;
          }
        }
      }

      & .Scroller {
        text-indent: 10px;
        border-radius: 0 0 40px 40px;
        overflow-y: hidden !important;
        mask-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          from(rgba(0, 0, 0, 3)),
          to(rgba(0, 0, 0, 0))
        );
        -webkit-mask-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          from(rgba(0, 0, 0, 3)),
          to(rgba(0, 0, 0, 0))
        );
      }
    }
  }

  &.stats {
    position: absolute;
    right: 0;
    z-index: 6000;
  }
  & .modalWrapper .backdrop {
    cursor: alias;
    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.backdrop} !important;
    display: flex;
    justify-content: center;
  }

  & .modalWrapper .backdrop object {
    display: block;
    max-width: 100%;
    max-height: 90%;
    width: auto;
    height: auto;
    align-self: center;
    /* box-shadow: 3px 5px 7px rgba(0,0,0,0.5); */
    /* -webkit-box-shadow:  3px 5px 7px rgba(0,0,0,0.5); */
    /* -moz-box-shadow:  3px 5px 7px rgba(0,0,0,0.5); */
    /* border: 1px solid ${(props) => props.theme.panelColor}; */
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    resize: both;
  }

  @media screen and (max-width: 768px) {
    & .modalWrapper .backdrop video {
      max-width: 75%;
      max-height: 80% !important;
    }
  }

  & .modalWrapper .backdrop .description {
    border: 1px solid ${(props) => props.theme.panelColor};
    border-radius: 10px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    @media screen and (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
    z-index: 500;
    padding: 10px;
    white-space: break-spaces;
    line-height: 25px;
    text-align: justify;
    width: 40ch;
    overflow-x: hidden;
    overflow-y: scroll;
    opacity: ${(props) => props.opacity};
    transition: 0.3s;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    /* background-color: ${(props) => props.theme.sky}; */

    &:hover {
      cursor: grab;
    }
  }

  & .modalWrapper .backdrop object:hover {
    cursor: grab;
  }

  & .modalWrapper .backdrop .landscape {
    width: 60% !important;
  }

  /* &:last-child(){
    margin-bottom: 60%;
  } */

  & .modalWrapper:last-child():not(.backdrop) {
    height: 90%;
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
    display: flex;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.panelColor};
    border-radius: 4px;
    /* transition: 0.3s; */
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.panelColor};
    box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    /* transition: 0.3s; */
  }
`;
export const Control = styled.p`
  background-color: ${(props) => props.theme.layerBG};
  position: fixed;
  z-index: 500;
  opacity: 1;
  font-weight: 800;
  font-size: 20px;
  user-select: none;
  -webkit-user-select: none;
  transition: 0.3s;
  padding: 10px;
  cursor: pointer;
  left: ${(props) => props.left || "none"};
  right: ${(props) => props.right || "none"};
  border-radius: 12px;

  &:hover {
    border: 1px solid ${(props) => props.theme.panelColor};
    background-color: ${(props) => props.theme.LiHover};
    -webkit-box-shadow: 0px 2px 10px 1px ${(props) => props.theme.LiHover};
    -moz-box-shadow: 0px 2px 10px 1px ${(props) => props.theme.LiHover};
    box-shadow: 0px 2px 10px 1px ${(props) => props.theme.LiHover};
    color: ${(props) => props.theme.textHover};
    text-shadow: 1px 1px 3px #ebebeb;
  }
`;

// Store
export const StoreItemsLayer = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  flex-direction: column-reverse;
  flex-wrap: nowrap;
  overflow: visible;
  gap: 60px;
`;
export const StoreItem = styled.div`
  width: auto;
  aspect-ratio: 1 / 1;
  height: 85vh;
  display: grid;
  grid-template-rows: 70% 30%;
  justify-items: center;
  /* padding: 50px 0 0; */
  box-shadow: 0 8px 32px 0 ${(props) => props.theme.LiHover};
  -webkit-box-shadow: 0 8px 32px 0 ${(props) => props.theme.LiHover};
  -moz-box-shadow: 0 8px 32px 0 ${(props) => props.theme.LiHover};
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  border: 1px solid;
  border-color: ${(props) => props.theme.panelColor};
  border-radius: 50%;
  overflow: visible;
  transition: 1.3s;

  @media screen and (max-width: 768px) {
    grid-template-rows: 40% 60%;
    height: 50vh;
  }

  &:hover {
    animation: pulseItem 4s infinite;
  }
  @keyframes pulseItem {
    0% {
      text-shadow: 1px 1px 10px ${(props) => props.theme.LiHover};
      box-shadow: 0 8px 32px 0 ${(props) => props.theme.LiHover};
      -webkit-box-shadow: 0 8px 32px 0 ${(props) => props.theme.LiHover};
      -moz-box-shadow: 0 8px 32px 0 ${(props) => props.theme.LiHover};
    }

    50% {
      text-shadow: 1px 1px 30px ${(props) => props.theme.LiHover};
      box-shadow: 0 8px 12px 0 ${(props) => props.theme.LiHover};
      -webkit-box-shadow: 0 8px 12px 0 ${(props) => props.theme.LiHover};
      -moz-box-shadow: 0 8px 12px 0 ${(props) => props.theme.LiHover};
    }

    100% {
      text-shadow: 1px 1px 10px ${(props) => props.theme.LiHover};
      box-shadow: 0 8px 32px 0 ${(props) => props.theme.LiHover};
      -webkit-box-shadow: 0 8px 32px 0 ${(props) => props.theme.LiHover};
      -moz-box-shadow: 0 8px 32px 0 ${(props) => props.theme.LiHover};
    }
  }
  .desc {
    padding: 0 20px;
    line-height: 25px;
    align-self: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
  .title {
    padding: 0.5% 10px;
    font-style: normal !important;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    /* height: min-content; */
    width: max-content;
    background-color: ${(props) => props.theme.LiHover};
    -webkit-box-shadow: 0px 3px 10px 1px ${(props) => props.theme.LiHover};
    -moz-box-shadow: 0px 3px 10px 1px ${(props) => props.theme.LiHover};
    box-shadow: 0px 3px 10px 1px ${(props) => props.theme.LiHover};
    color: #ebebeb !important;
    font-style: italic;
    align-self: center;
    display: inline-block;
    vertical-align: baseline;
    padding: 0 10px;
    text-shadow: 1px 1px 3px rgba(235, 235, 235, 0.5);
    border-radius: 30px;
  }
  a:hover {
    text-shadow: 1px 1px 10px ${(props) => props.theme.LiHover};
    box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    color: ${(props) => props.theme.panelColor};
    transition: 0.6s;
  }
  .buyBtn {
    transition: 0.6s;
    text-align: center;
    padding: 1px 9px;
    width: 25%;
    font-size: 13px;
    font-style: normal !important;
    font-weight: 800;
    background-color: #c94343;
    -webkit-box-shadow: 0px 3px 10px 1px #c94343;
    -moz-box-shadow: 0px 3px 10px 1px #c94343;
    box-shadow: 0px 3px 10px 1px #c94343;
    color: #ebebeb !important;
    cursor: pointer;
    display: inline;
    align-self: center;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    border-radius: 30px;
  }
  .buyBtn:hover {
    background-color: ${(props) => props.theme.LiHover};
    -webkit-box-shadow: 0px 3px 10px 1px ${(props) => props.theme.LiHover};
    -moz-box-shadow: 0px 3px 10px 1px ${(props) => props.theme.LiHover};
    box-shadow: 0px 3px 10px 1px ${(props) => props.theme.LiHover};
  }
`;

// Info
export const Contact = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;

  .oldNabla {
    fill: ${(props) => props.theme.panelColor};
    padding-bottom: 100px;
    overflow: visible;
    /* position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%,-60%); */
  }
`;
export const Email = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

// Misc
export const InfoBox = styled.div`
  width: ${(props) => props.width};
  pointer-events: none;
  border-radius: 10px;
  position: relative;
  padding: 10px;
  margin: 0 10px 20px 10px;
  white-space: break-spaces;
  line-height: 25px;
  text-align: justify;
  overflow-x: hidden;
  overflow-y: hidden;
  text-overflow: ellipsis;
  opacity: ${(props) => props.opacity};
  transition: 0.6s;
  border: 1px solid ${(props) => props.theme.backdrop};
  background-color: ${(props) => props.theme.layerBG};
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  -webkit-box-shadow: 0px 2px 10px 1px ${(props) => props.theme.sky};
  -moz-box-shadow: 0px 2px 10px 1px ${(props) => props.theme.sky};
  box-shadow: 0px 2px 10px 1px ${(props) => props.theme.sky};
  -webkit-mask-image: ${(props) => props.mask} !important;
  mask-image: ${(props) => props.mask} !important;

  @media screen and (max-width: 768px) {
    border: 1px solid ${(props) => props.theme.panelColor} !important;
    color: ${(props) => props.theme.panelColor} !important;
  }
  & .icons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
  }

  @media only screen and (max-height: 1000px) {
    & {
      background-color: ${(props) => props.theme.sky};
      position: fixed !important;
      z-index: 3200;
      top: 30px !important;
      right: 30px;
      /* height: 20%; */
      /*  transform: translateY(50%); */
      width: 350px;
      height: 30vh;
      overflow-y: hidden;
    }
  }
`;
export const Scroller = styled.div`
  /* animation: ${(props) => props.animation}; */
  @keyframes autoscroll {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, -90%, 0);
    }
  }

  & p {
    display: inline;
    padding: 3px;
  }
`;
export const BySign = styled.span`
  cursor: pointer;
  border-radius: 7px;
  text-transform: uppercase !important;
  text-indent: 0;
  font-weight: 800 !important;
  font-size: 11px;
  margin-left: 5px;
  display: inline-block;
  width: min-content;
  height: 20px;
  line-height: 17px;
  padding: 0px 5px;
  /* background-color: ${(props) => props.theme.panelColor}; */
  color: ${(props) => props.theme.textHover};
  text-shadow: 1px 1px 10px ${(props) => props.theme.sky};
  background: ${(props) => props.byColor};
  background: ${(props) => props.byGradient};
  border: 1px solid ${(props) => props.theme.layerBG};
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  &:hover {
    border: 1px solid ${(props) => props.theme.panelColor};
  }
`;
