import React from "react"
import '../../App.css'
import Draggable from "react-draggable";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import { Container } from "../UI/Theme";
import useDocumentTitle from "../UI/documentTitle";

function Store() {
  useDocumentTitle("Store @ Nabla");
  const snap = useSnapshot(state);

  return (
    <>
      <div className="head">
        <Draggable position={snap.prtPosition} onStart={() => false}>
          <h1>store</h1>
        </Draggable>
      </div>
      <Container className="container">
        <div className="eko">
          <div className="eko-thumb">
            Aa
          </div>
          <div className="desc">
            <div className="title"> <p>Eko Digital</p></div>
            Our first display font offers a stencil with a distinct futuristic style. <br />
            <span style={{ opacity: ".5" }}>Just what your acid graphics were missing!</span>
            <br />
            <a className="buyBtn" href="https://nablaooo.gumroad.com/l/ekodigi" target="_blank" rel="noopener noreferrer">
              $30
            </a>
          </div>
        </div>
      </Container>
    </>
  )
}
export default Store;