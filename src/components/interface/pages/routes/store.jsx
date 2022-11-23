import React, { useEffect } from "react";
import Tilty from "react-tilty";
import { DiagonalArrow, EkoThumb } from "../../../../common/svg";
import { state } from "../../../../common/state";
import { useSnapshot } from "valtio";
import { Link } from "wouter";
import { GetStore } from "../../../../common/api/firebase.service";
import { Container, StoreItem, StoreItemsLayer } from "../page.style";
import { Header } from "../header/header";

function Store(props) {
  const snap = useSnapshot(state);
  useEffect(() => {
    GetStore();
  }, [snap]);

  return (
    <>
      <Header id={"store"} />
      <Container
        ref={props.container}
        overflow="hidden"
        className="container"
        opacity={props.opacity}
        pointerEvents={props.pointerEvents}
        transition={props.transition}
        style={{ justifyContent: "center" }}
      >
        <StoreItemsLayer>
          {snap.store.map((item, key) => (
            <Tilty
              key={key}
              reverse
              axis="xy"
              style={{ transformStyle: "preserve-3d" }}
              scale={1}
              perspective={700}
              reset={false}
            >
              <StoreItem id={item.lot} className="item">
                <EkoThumb />
                <div className="desc">
                  <Link
                    className="title w"
                    style={{ transform: "translateZ(190px)" }}
                    to={`/${item.lot}`}
                    onClick={() => props.confirm()}
                  >
                    {item.productName}
                    <DiagonalArrow />
                  </Link>
                  <p>
                    {item.tagline[0]} <br />
                    <i style={{ opacity: ".5" }}>{item.tagline[1]}</i>
                  </p>
                  <a
                    className="buyBtn"
                    style={{ transform: "translateZ(900px)" }}
                    href={item.productURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`${item.price}`}
                  </a>
                </div>
              </StoreItem>
            </Tilty>
          ))}
        </StoreItemsLayer>
      </Container>
    </>
  );
}

export default Store;
