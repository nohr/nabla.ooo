import React from "react";
import '../../App.css'
import useDocumentTitle from "../UI/documentTitle";
import { Container } from "../UI/style";
import { Header } from "../UI/svg";

const NotFound = () => {
    useDocumentTitle("404 @ Nabla");

    return (
        <>
            <Header id="404" />
            <Container className="container notfound">
                <p>Can't find this page!</p>
            </Container>

        </>
    )
}

export default NotFound

