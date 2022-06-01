import React from "react";
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import '../../App.css'
import { Container } from "../UI/style"
import PageData from "./PageData";
import Modal from "../UI/Modal";
import useDocumentTitle from '../UI/documentTitle'
import { Header } from '../UI/svg'

function Page(id) {
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


export { Page }
