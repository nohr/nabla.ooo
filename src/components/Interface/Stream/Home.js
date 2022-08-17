import React from "react";
import '../../../App.css'
import { Container } from "./Page";
import { cloud } from "../../utils/state";
import { useSnapshot } from "valtio";
import { Program } from "../../utils/svg";
import { CreatorMedal, InfoBox, Scroller } from "./Results";

function Home() {
    const clip = useSnapshot(cloud);

    function Preview({ statement, program, by, projectName }) {
        return (
            <InfoBox
                className="preview"
            >
                <div className="icons">
                    <div className="both">
                        {program && <Program program={program} />}
                        <CreatorMedal name={by} />
                    </div>
                    <h3>{projectName}</h3>
                </div>
                <Scroller className="Scroller" animation='autoscroll 10s linear infinite' >
                    {<p>
                        {statement && `"${statement}"`}

                    </p>}
                </Scroller>
            </InfoBox>
        )
    }

    return (
        <>
            <Container className="hom container">
                {clip.mobile && clip.preview.map((value, key) => (<Preview key={key} by={value.by} statement={value.statement} program={value.program} projectName={value.projectName} />))}
            </Container>
        </>
    )
}
export default Home;