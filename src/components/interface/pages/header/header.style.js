import styled from "styled-components";

export const Head = styled.div`
  pointer-events: none;
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 4000;
  height: var(--panelHeight);
  width: fit-content;
  margin-top: 20px;
  margin-left: calc(var(--panelWidth) + var(--headOffset));

  @media only screen and (max-width: 768px) {
    margin-left: 0;
  }

  & h1 {
    /* text-shadow: 9px 4px 13px  ${(props) => props.theme.sky}; */
    justify-self: flex-start;
    position: absolute;
    font-size: 14vw;
    height: 70px;
    line-height: 0px;
    color: transparent;
    -webkit-text-stroke-width: 1px;
    margin: var(--headOffset);
    font-family: "helvetica";
    font-weight: 400;
    font-style: normal;
    -webkit-text-stroke-color: ${(props) => props.theme.panelColor};
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  @media only screen and (max-width: 768px) {
    margin-left: 0 !important;
    h1 {
      font-size: 22vw;
    }
    & svg {
      height: auto;
      width: 90vw !important;
    }
    .HomeCD {
      margin-left: 0px !important;
    }
  }

  @media only screen and (min-width: 768px) {
    .HomeCD {
      margin-left: calc(-1 * var(--panelWidth) + 15px) !important;
    }
  }
  & svg {
    /* -webkit-filter: drop-shadow( 9px 4px 1px  ${(props) => props.theme.sky});
          filter: drop-shadow( 9px 4px 1px  ${(props) => props.theme.sky}); */
    fill: transparent !important;
    stroke: ${(props) => props.theme.panelColor} !important;
    stroke-width: 1px;
    position: absolute;
    /* width: 35vw;
        height: auto; */
    height: 300px;
    width: auto;
    overflow: visible;
    margin: 20px 20px;
  }
  .HomeCD {
    padding: 0 !important;
    height: auto !important;
    width: 641.75px !important;
    stroke: ${(props) => props.theme.panelColor} !important;
    fill: none !important;
    margin-top: 288px !important;
  }
  .swamilogo {
    height: 200px;
    width: auto;
  }
`;
