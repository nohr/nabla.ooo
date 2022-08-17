import React from 'react'
import { Container } from "./Page";
import { useSnapshot } from 'valtio'
import { state } from '../../utils/state'
import styled from 'styled-components'
import { Header } from "../../utils/svg";

const BlogWrap = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 7vh;
    /* padding-top: 300px; */
    transition: 1.3s;
`
const PostWrap = styled.div`
    display: flex;
    /* gap: 10%; */
    flex-direction: column;

    h2{
        width: fit-content;
    }

    p{
        white-space: pre-line;
    }
`
const Ttile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`
function Blog(props) {
    const snap = useSnapshot(state);
    return (
        <>
            <Header id='blog' />
            <Container className="container"
                opacity={props.opacity}
                pointerEvents={props.pointerEvents}
                transition={props.transition}
            >
                <BlogWrap>
                    {snap.blog.map((post) => (
                        <PostWrap key={Math.random()}>
                            <Ttile>
                                <h2>{post.title}</h2>
                                <div>{post.created}</div>
                            </Ttile>
                            <p>{post.content}</p>
                        </PostWrap>
                    ))}
                </BlogWrap>
            </Container>
        </>
    )
}

export default Blog
