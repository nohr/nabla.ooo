import React from 'react'
import { Container } from '../UI/style'
import Draggable from 'react-draggable'
import { useSnapshot } from 'valtio'
import { state } from '../UI/state'

function Blog() {
    const snap = useSnapshot(state)
    return (
        <>
            <div className="head">
                <Draggable position={snap.prtPosition} onStart={() => false}>
                    <h1>blog</h1>
                </Draggable>
            </div>
            <Container className="container">
                <div>
                    HI!
                </div>
            </Container>
        </>
    )
}

export default Blog
