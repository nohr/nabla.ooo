import React from "react";
import '../../App.css'
import { Container } from "../UI/style";
import useDocumentTitle from "../UI/documentTitle";

function Home() {
    useDocumentTitle("Nabla");
    return (
        <>
            <Container className="hom container">
            </Container>
        </>
    )
}
export default Home;