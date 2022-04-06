import React from "react";
import '../../App.css'
import { Container } from "../UI/style";
import useDocumentTitle from "../UI/documentTitle";
import { Head } from "./Page";

function Home() {
    useDocumentTitle("Nabla");
    return (
        <>
            <Head className="head">
            </Head>
            <Container className="hom container">
            </Container>
        </>
    )
}
export default Home;