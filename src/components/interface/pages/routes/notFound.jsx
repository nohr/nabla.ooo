import React from "react";
import { Header } from "../header/header";
import { Container } from "../page.style";

const NotFound = (props) => {
  return (
    <>
      <Header id="404" />
      <Container
        ref={props.container}
        className="container notfound"
        opacity={props.opacity}
        pointerEvents={props.pointerEvents}
        transition={props.transition}
      >
        <h2>Can't find this page!</h2>
      </Container>
    </>
  );
};

export default NotFound;
