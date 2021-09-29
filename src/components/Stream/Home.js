import React from "react";
import '../../App.css'
import { state } from "../UI/state";
import { Container } from "../UI/Theme";

function Home() {
    state.cameraPosition = [0, 3, 0]
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