import React from "react";
import '../../../App.css'
import { Container } from "./Page";
import { Header } from "../../utils/svg";

const NotFound = (props) => {
    return (
        <>
            <Header id="404" />
            <Container
                ref={props.container} className="container notfound"
                opacity={props.opacity}
                pointerEvents={props.pointerEvents}
                transition={props.transition}
            >
                <h2>Can't find this page!</h2>
            </Container>

        </>
    )
}

export default NotFound

