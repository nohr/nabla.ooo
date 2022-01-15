import React, { useRef } from "react"
import '../../App.css'
import Draggable from "react-draggable";
import { Head } from "./Page";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import { Container } from "../UI/style";
import useDocumentTitle from "../UI/documentTitle";
import { Contrast } from "../UI/svg";
// import { HeadSVG } from "../UI/svg";
//TODO: Replace with HeadSVG

function Store() {
  useDocumentTitle("Store @ Nabla");
  const snap = useSnapshot(state);
  const nodeRef = useRef(null);

  return (
    <>
      <Head className="head">
        <Draggable nodeRef={nodeRef} position={snap.prtPosition} onStart={() => false}>
          <h1 ref={nodeRef} >store</h1>
        </Draggable>
      </Head>
      <Container className="container">
        <div className="str">
          <div className="contrastWrap">
            <Contrast />
            <p>It's ready when it's ready!</p>
          </div>
          <div className="eko">
            <div className="eko-thumb">
              Aa
            </div>
            <div className="desc">
              <div className="title"> <p>Eko Digital</p></div>
              My first display font offers a stencil with a distinct futuristic style. <br />
              <i style={{ opacity: ".5" }}>It's just what your acid graphics were missing!</i>
              <br />
              <a className="buyBtn" href="https://nablaooo.gumroad.com/l/ekodigi" target="_blank" rel="noopener noreferrer">
                $30
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
export default Store;