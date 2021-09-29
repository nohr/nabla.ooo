import React, { useEffect } from 'react'
import db from '../../firebase'
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import { ImgWrapper, Sector, TextWrapper } from "../UI/Theme"
import { motion } from 'framer-motion'



function Setup(title) {

    // Get Works and Information
    state.loading = true;
    const ref1 = db.collection("portfolio").orderBy("projectYear", "desc");
    const getWorks = () => {
        ref1.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().at === title.title.title) {
                    items.push(doc.data());
                }
            });
            state.sectors = items;
            state.loading = false;
        });
    }

    const unsub = () => {
        ref1.onSnapshot(() => {
            const items = [];
            state.sectors = items;
            state.loading = false;
        });
    }
    getWorks();
    return () => unsub();
}



const ImgGrid = ({ work }) => {
    function setSelectedImg(selected) {
        state.selectedImg = selected;
        if (state.isPort || state.isSett) {
            state.isPort = false;
            state.isSett = false;
        }
    }
    return (
        <>
            <ImgWrapper key={`${Math.random()}`}>
                <>
                    {work.images && work.images.map((url) => (
                        <motion.div className="img-thumb"
                            key={Math.random()}
                            layout
                            whileHover={{ opacity: 1 }}
                            onClick={() => setSelectedImg(url)}
                        ><img key={`${Math.random()}`} src={`${url}`} alt={`/${work.at}`} />
                        </motion.div>
                    ))}
                </>
            </ImgWrapper>
        </>
    )
}



function PageData(title, setSelectedImg) {
    const snap = useSnapshot(state);
    useEffect(() => {
        Setup(title);

    }, [title])



    return (
        <>
            {snap.sectors.map((work) => (
                <Sector key={`${Math.random()}`} className="sector">
                    <span key={`${Math.random()}`} className="lot">LOT#: {Math.random()}</span>
                    <TextWrapper key={`${Math.random()}`} className="textWrapper">
                        <h3 key={`${work.projectName}`}>{work.projectName}</h3>
                        <p key={`${work.statement}`}>{work.statement}</p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h5 key={`${work.projectMedium}`}>{`${work.projectMedium}`}</h5>
                            <h4 key={`${work.projectYear}`}>{`${work.projectYear.toDate().getMonth() + 1} ${work.projectYear.toDate().getFullYear()}`}</h4>
                            <h5 key={`${work.projectClient}`}>{`${work.projectClient}`}</h5>
                        </div>
                    </TextWrapper>
                    <ImgGrid setSelectedImg={setSelectedImg} work={work} />
                </Sector>
            ))}
        </>
    )
}

export default PageData
