import React from "react";
import { cloud } from "../../../../common/state";
import { useSnapshot } from "valtio";
import { Program } from "../../../../common/svg";
import { Container, InfoBox, Scroller } from "../page.style";
import { CreatorMedal } from "../utils";

function Home(props) {
  const clip = useSnapshot(cloud);

  function Preview({ statement, program, by, projectName }) {
    return (
      <InfoBox className="preview">
        <div className="icons">
          <div className="both">
            {program && <Program program={program} />}
            <CreatorMedal name={by} />
          </div>
          <h3>{projectName}</h3>
        </div>
        <Scroller
          className="Scroller"
          animation="autoscroll 10s linear infinite"
        >
          {<p>{statement !== "" && `"${statement}"`}</p>}
        </Scroller>
      </InfoBox>
    );
  }

  return (
    <>
      <Container
        className="hom container"
        ref={props.container}
        opacity={props.opacity}
        pointerEvents={props.pointerEvents}
        transition={props.transition}
      >
        {clip.mobile &&
          clip.preview.map((value, key) => (
            <Preview
              key={key}
              by={value.by}
              statement={value.description}
              program={value.program}
              projectName={value.name}
            />
          ))}
      </Container>
    </>
  );
}
export default Home;
