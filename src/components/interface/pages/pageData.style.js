import styled from "styled-components";

export const Sector = styled.div`
  /* border: solid 1px; */
  /* border-color: ${(props) => props.theme.panelColor}; */
  /* border-radius: 10px; */
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 20% 80%;
  height: 60%;
  width: fit-content;
  flex-direction: column;
  row-gap: 10px;
  /* padding: 0px; */
  justify-content: space-around;
  position: relative;
  overflow: hidden;
  transition: 0s !important;

  @media screen and (min-height: 800px) {
    height: 70vh !important;
    row-gap: 0px;
  }
  @media screen and (max-width: 768px) {
    height: max-content !important;
    /* grid-template-rows: 30% 100%; */
    display: flex;
    /* row-gap: 0px; */
  }
  & .lot {
    color: ${(props) => props.theme.panelColor};
    transition: 1.3s;
  }
  @media screen and (min-width: 1440px) {
    & {
      /* width: 80%; */
      height: 80%;
    }
  }
  @media screen and (max-width: 940px) {
    & {
      /* width: 100%; */
      height: 100%;
    }
  }
  @media screen and (max-height: 1040px) {
    & {
      /* width: 80%; */
      height: 100%;
    }
  }
`;
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: min-content;
  flex-wrap: nowrap;
  color: ${(props) => props.theme.panelColor};
  font-size: 14px;
  text-align: left;
  align-self: center;
  padding: 0 20px;
  transition: 1.3s;
  white-space: break-spaces;
  /* line-height: 25px; */

  & h2 {
    margin: 20px 0;
    line-height: 30px;
    font-size: 40px;
    clear: both;
    align-self: flex-start;
    text-align: center;
    text-shadow: 9px 4px 13px ${(props) => props.theme.sky};
  }

  & .metadata {
    display: flex;
    gap: 20px;
  }
  & h4,
  & h5 {
    align-self: flex-start;
    margin: 5px 0;
  }

  & h4 {
    justify-self: flex-start;
  }

  & p {
    /* width: ${(props) => props.width}; */
    display: inline;
    padding: 0% 3px;
    background-color: ${(props) => props.theme.layerBG};
    text-indent: 3em;
    overflow-y: scroll;
    padding: 0 !important;

    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      position: absolute;
    }
    ::-webkit-scrollbar-thumb {
      outline: 1px solid ${(props) => props.theme.panelColor};
      border-radius: 4px;
      background-color: transparent;
      transition: 0.3s;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${(props) => props.theme.panelColor};
      box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      transition: 0.3s;
    }
  }

  & a {
    color: ${(props) => props.theme.link};
    text-decoration: underline;
  }
`;
export const TrayWrapper = styled.div`
  /* overflow-x: scroll; */
  /* overflow-y: hidden; */
  display: flex;
  /* grid-template-columns: 1fr 40ch;     */
  /* grid-template-rows: 100%; */
  flex-direction: row;
  flex-wrap: nowrap;
  /* width: 100%; */
  /* height: 70%; */
  /* padding: 0 20px 20px 20px; */
  gap: 10px;
  margin-bottom: 1px;

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 40vh 100%;
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    height: 10px !important;
    position: absolute;
  }
  ::-webkit-scrollbar-thumb {
    outline: 1px solid ${(props) => props.theme.panelColor};
    border-radius: 4px;
    background-color: transparent;
    transition: 0.3s;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.panelColor};
    box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    transition: 0.3s;
  }
`;
export const ImgWrapper = styled.div`
  position: relative;
  height: 100%;
  /* width: 100%; */
  display: flex;
  /* overflow-y: hidden; */
  overflow-x: scroll;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 20px;
  padding-bottom: 5px;

  @media screen and (max-width: 768px) {
    & {
    }
  }

  .img-thumb,
  video {
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.panelColor};
  }

  .img-thumb {
    height: 100%;
    overflow: hidden;
    width: 0px;
    padding: 0 280px;
    position: relative;
    opacity: 1;
    pointer-events: all;
    filter: grayscale(0);
    transition: 0.3s;

    @media screen and (max-width: 768px) {
      & {
        padding: 0 80px;
      }
    }

    &:hover {
      cursor: pointer;
      border-radius: 50%;
    }
  }

  .img-thumb:hover {
    filter: grayscale(1) !important;
  }
  object {
    @media only screen and (max-width: 1440px) {
      grid-template-rows: 35% 30% 35%;
      padding: 0 20px 0 20px;
    }
    /* max-height: 100%; */
    min-width: 100%;
    max-height: 150%;
    position: absolute;
    pointer-events: all;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  video {
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
  .playText {
    opacity: 0;
    position: absolute;
    z-index: 30;
    font-size: 230px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    font-weight: 600;
    transition: 1.3s;
    user-select: none;
    -webkit-user-select: none;
    pointer-events: none;
  }

  .Lvideo:hover > .playText {
    opacity: 1 !important;
  }
  .Lvideo:hover {
    opacity: 0.7 !important;
    transition: 1.3s;
  }

  .landscape {
    height: 100% !important;
    width: auto !important;
  }
  video:hover,
  .landscape:hover {
    transition: 0.3s;
    cursor: pointer;
    border: solid 1px;
    border-color: ${(props) => props.theme.panelColor};
  }

  video[poster] {
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
    outline: 1px solid ${(props) => props.theme.panelColor};
    border-radius: 4px;
    background-color: transparent;
    transition: 0.3s;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.panelColor};
    box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
    transition: 0.3s;
  }
`;
export const InfoCard = styled.div`
  row-gap: 10px;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  white-space: break-spaces;
  line-height: 20px;
  height: 100%;
  width: 45ch !important;
  text-align: justify;
  border: 1px solid ${(props) => props.theme.backdrop};
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));

  /* @media screen and (min-width:768px) {
      position: absolute;
    } */

  @media screen and (max-width: 768px) {
    overflow-y: unset !important;
    height: unset !important;
    width: 100% !important;
    & p {
      height: 100% !important;
      overflow-y: unset !important;
    }
  }

  & {
    padding: 10px;
    border-radius: 10px;
    /* display: inline; */
    background-color: ${(props) => props.theme.layerBG};
    /* text-indent: 3em; */

    & p {
      height: min-content;
      overflow-y: scroll !important;
    }

    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      position: absolute;
    }
    ::-webkit-scrollbar-thumb {
      outline: 1px solid ${(props) => props.theme.panelColor};
      border-radius: 4px;
      background-color: transparent;
      transition: 0.3s;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${(props) => props.theme.panelColor};
      box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      transition: 0.3s;
    }
  }
`;
