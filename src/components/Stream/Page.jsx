import React from "react";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import '../../App.css'
import { Container } from "../UI/style"
import PageData from "./PageData";
import Modal from "../UI/Modal";
import useDocumentTitle from '../UI/documentTitle'
import { HeadSVG } from '../UI/svg'

const Page = React.memo(function Page(id) {
    useDocumentTitle(id.title)
    // const container = useRef(null);
    const snap = useSnapshot(state);
    // useEffect(() => {
    //     state.containerWidth = container.current.getBoundingClientRect().width;
    //     console.log(container.current.getBoundingClientRect());
    // }, [container])
    return (
        <>  {snap.selectedImg === null && 
            <div className="head">
                    <HeadSVG id={id.id}/>
            </div>}
            <Container className="container">
                <PageData id={id.id}/>
                    {snap.selectedImg && <Modal />}
            </Container>
        </>
    )
})

const Results = React.memo(function Results() {
    useDocumentTitle("Results")
    const snap = useSnapshot(state);
    console.log(state.query);
    return (
        <>
        <div className="head">
                    <HeadSVG id={snap.query}/>
            </div>
            <Container className="container">
                <div>
                    {snap.query}
                </div>
            </Container>
        </>
    )
})

export { Page, Results }
