import React, {useState, useEffect} from "react";
import useSound from 'use-sound';
import sound1 from './select.mp3';
import db from '../firebase'
import { NavLink } from "react-router-dom";
function Portfolio(work){
    const[works, setWorks] = useState([]);
    const[loading, setLoading] = useState(false);
    
    const [select] = useSound(sound1);  
    
    const ref = db.collection("portfolio").orderBy("projectYear", "desc");
    const fer = db. collection("studentWork").orderBy("projectYear", "desc");
    
    function getWorks(){
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setWorks(items);
            setLoading(false);
        });
    }

    useEffect(() => {
        getWorks();
    }, []);
if (loading) {
    return <div>loading...</div>
}

return(
    <div>
        {works.map((work)=>(
            <NavLink exact className="li w" activeClassName="active" onClick={()=> select()} to={`/${work.id}`} key={work.id} ><div>{work.projectName}</div></NavLink>
        ))}
    </div>
)

}
export default Portfolio