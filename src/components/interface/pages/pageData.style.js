import styled from "styled-components";

export const Sector = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 20% 80%;
  height: 90%;
  width: fit-content;
  flex-direction: column;
  row-gap: 10px;
  justify-content: space-around;
  position: relative;
  overflow: hidden;
  transition: 0s !important;

  @media screen and (max-width: 768px) {
    height: max-content !important;
    /* grid-template-rows: 30% 100%; */
    display: flex;
    /* row-gap: 0px; */
  }
`;
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: min-content;
  width: fit-content;
  flex-wrap: nowrap;
  color: ${(props) => props.theme.panelColor};
  font-size: 14px;
  text-align: left;
  align-self: center;
  padding: 20px;
  transition: 1.3s;
  white-space: break-spaces;
  background-color: ${(props) => props.theme.backdrop};
  border-radius: 10px;
  border: solid 1px;
  border-color: ${(props) => props.theme.layerBG};

  @media screen and (min-width: 768px) {
    & {
      margin-left: 280px;
    }
  }

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
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
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
  height: 100% !important;
  display: flex;
  grid-auto-flow: column;
  grid-template-rows: 100%;
  overflow-x: scroll;
  min-height: fit-content !important;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 20px;
  padding-bottom: 15px;
  overscroll-behavior-inline: contain;

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
    height: auto;
    width: 40vw;
    aspect-ratio: 1/1 !important;
    display: flex;
    flex-direction: column;
    justify-content:flex-end;
    align-items: center;
    /* overflow: hidden; */
    /* padding: 0 280px; */
    position: relative;
    opacity: 1;
    pointer-events: all;
    filter: grayscale(0);
    transition: 0.3s;

    .portrait, .landscape {
      height: min-content !important;
      width: auto !important;
    }

  .landscape {
    height: 100% !important;
    width: auto !important;
  }
    p{
      background-color: ${(props) => props.theme.panelColor};
      color: ${(props) => props.theme.sky};
      padding: 5px;
      width: 100%;
      margin: 0;
    }

    @media screen and (max-width: 768px) {
      & {
        /* padding: 0 80px; */
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
    /* object-fit: contain; */
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
    /* opacity: 0.7 !important; */
    transition: 1.3s;
  }


  video:hover,
  .landscape:hover {
    backdrop-filter: grayscale(1) !important;
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
      width: 15px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: 1px solid ${(props) => props.theme.panelColor} !important;
      border-radius: 4px;
      outline: transparent !important;;
      transition: 0.3s;
    }
    ::-webkit-scrollbar-track {
      background-color: ${(props) => props.theme.sky} !important;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${(props) => props.theme.LiHover} !important;
      outline: ${(props) => props.theme.layerBG} !important;
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
  height: min-content;
  width: 69ch !important;
  text-align: justify;
  border: 1px solid ${(props) => props.theme.layerBG};
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  padding: 10px;
  border-radius: 10px;
  /* display: inline; */
  background-color: ${(props) => props.theme.backdrop};
  /* text-indent: 3em; */

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

    & p {
      height: min-content;
      overflow-y: scroll !important;
    }

    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 15px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: 1px solid ${(props) => props.theme.panelColor} !important;
      border-radius: 4px;
      outline: transparent !important;;
      transition: 0.3s;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${(props) => props.theme.LiHover} !important;
      outline: ${(props) => props.theme.layerBG} !important;
      box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      -webkit-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      -moz-box-shadow: 0 0 0 1px ${(props) => props.theme.panelColor};
      transition: 0.3s;
    }
  }
`;
