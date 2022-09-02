import React, { useEffect } from "react";
import "../../../App.css";
import { Container } from "./Page";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";
import Tilty from 'react-tilty';
import { DiagonalArrow, EkoThumb, Header } from "../../utils/svg";
import { cloud, state } from "../../utils/state";
import { useSnapshot } from "valtio";
import { GetStore } from "../../utils/common";

function Store(props) {
  const snap = useSnapshot(state);
  // cloud.UILoading = false;
  useEffect(() => {
    GetStore();
  }, [snap.store])

  return (<>
    <Header id={"store"} />
    <Container
      ref={props.container}
      overflow='hidden' className="container"
      opacity={props.opacity}
      pointerEvents={props.pointerEvents}
      transition={props.transition}
    >
      <StoreItemsLayer>
        {
          snap.store.map((item, key) => (
            <Tilty key={key} reverse axis="xy"
              style={{ transformStyle: 'preserve-3d' }}
              scale={1} perspective={700} reset={false}
            >
              <StoreItem
                id={item.productName.replace(/\s+/g, '')}
                className="item">
                <EkoThumb />
                <div className="desc">
                  <HashLink className="title w"
                    style={{ transform: 'translateZ(190px)' }}
                    to="/nabla#EkoDigital">
                    {item.productName}
                    <DiagonalArrow />
                  </HashLink>
                  <p>{item.tagline[0]} <br />
                    <i style={{ opacity: ".5" }}>
                      {item.tagline[1]}
                    </i>
                  </p>
                  <a className="buyBtn"
                    style={{ transform: 'translateZ(900px)' }}
                    href={item.productURL}
                    target="_blank"
                    rel="noopener noreferrer">
                    BUY ${`${item.price}`}
                  </a>
                </div>
              </StoreItem>
            </Tilty>

          ))}  </StoreItemsLayer>
    </Container>
  </>)
}

export default Store;

const StoreItemsLayer = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  flex-direction: column-reverse;
  flex-wrap: nowrap;
  overflow: visible;
  gap: 60px;
`
const StoreItem = styled.div`
    width: auto;
    aspect-ratio: 1 / 1;
      height:85vh;
      display: grid;
      grid-template-rows: 70% 30%;
      justify-items: center;
      /* padding: 50px 0 0; */
      box-shadow: 0 8px 32px 0 ${props => props.theme.LiHover};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.LiHover};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.LiHover};
      backdrop-filter: blur(var(--blur));
      -webkit-backdrop-filter: blur(var(--blur));
      border: 1px solid;
      border-color:  ${props => props.theme.panelColor};
      border-radius: 50%;
      overflow: visible;
      transition: 1.3s;

    &:hover{
  	animation: pulseItem 4s infinite;
    }
  @keyframes pulseItem {
	0% {
		text-shadow: 1px 1px 10px ${props => props.theme.LiHover};
      box-shadow: 0 8px 32px 0 ${props => props.theme.LiHover};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.LiHover};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.LiHover};
	}

	50% {
		text-shadow: 1px 1px 30px ${props => props.theme.LiHover};
      box-shadow: 0 8px 12px 0 ${props => props.theme.LiHover};
      -webkit-box-shadow:  0 8px 12px 0 ${props => props.theme.LiHover};
      -moz-box-shadow:  0 8px 12px 0 ${props => props.theme.LiHover};
	}

	100% {
		text-shadow: 1px 1px 10px ${props => props.theme.LiHover};
      box-shadow: 0 8px 32px 0 ${props => props.theme.LiHover};
      -webkit-box-shadow:  0 8px 32px 0 ${props => props.theme.LiHover};
      -moz-box-shadow:  0 8px 32px 0 ${props => props.theme.LiHover};
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
    a{
      /* height: min-content; */
      width: max-content;
      background-color:  ${props => props.theme.LiHover};
      -webkit-box-shadow: 0px 3px 10px 1px  ${props => props.theme.LiHover};
      -moz-box-shadow: 0px 3px 10px 1px  ${props => props.theme.LiHover};
      box-shadow: 0px 3px 10px 1px  ${props => props.theme.LiHover};
      color: #ebebeb !important;
      font-style: italic;
      align-self: center;
      display: inline-block;
      vertical-align: baseline;
      padding: 0 10px;
      text-shadow: 1px 1px 3px rgba(235, 235, 235, 0.5);
      border-radius: 30px;
    }
    a:hover{
      text-shadow: 1px 1px 10px ${props => props.theme.LiHover};
      box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      -webkit-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      -moz-box-shadow: 0 0 0 1px  ${props => props.theme.panelColor};
      color:  ${props => props.theme.panelColor};
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
      background-color: ${props => props.theme.LiHover};
      -webkit-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
      -moz-box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
      box-shadow: 0px 3px 10px 1px ${props => props.theme.LiHover};
    }
`