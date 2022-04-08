import React from "react";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import '../../App.css'
import { Container } from "../UI/style"
import PageData from "./PageData";
import Modal from "../UI/Modal";
import useDocumentTitle from '../UI/documentTitle'
import { Header } from '../UI/svg'


//offset head
    
function Page(id) {
    // const margin = state.setSwitched ? "margin-left: -40vw !important;" : "margin-left: calc(var(--panelWidth) + var(--headOffset));" 
    useDocumentTitle(id.title);
    const snap = useSnapshot(state);
    return (
        <>  
            <Header id={id.id}/>
            <Container className="container">
                <PageData id={id.id}/>
                    {snap.selectedImg ? <Modal /> : null}
            </Container>
        </>
    )
}

const Results = React.memo(function Results() {
    // const margin = state.setSwitched ? "margin-left: -40vw !important;" : "margin-left: calc(var(--panelWidth) + var(--headOffset));" 
    useDocumentTitle("Results");
    const snap = useSnapshot(state);
    console.log(state.query);
    return (
        <>
            <Header/>
            <Container className="container">
                <div>
                    {snap.query}
                </div>
            </Container>
        </>
    )
})

export { Page, Results }
