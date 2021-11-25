import React from "react";
import '../../App.css'
import { Container } from "../UI/Theme";
import useDocumentTitle from "../UI/documentTitle";

function Home() {
    useDocumentTitle("Nabla");
    return (
        <div className="bigContainer hom">
            <div className="head">
            </div>
            <Container className="hom container">
            </Container>
        </div>
    )
}
export default Home;