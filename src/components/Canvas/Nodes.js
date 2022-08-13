import { useSphere } from '@react-three/cannon';
import { useSelect, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import * as THREE from "three";
import { useSnapshot } from 'valtio';
import { cloud, state } from '../UI/state';
import { target } from './Composition';


function Cover({ select, confirm, clear, hit, hits, index, ...props }) {
    const types = new Map([["jpg", "img"], ["jpeg", "img"], ["png", "img"], ["gif", "img"], ["mp4", "video"], ["svg", "svg"]]);
    const link = new URL(hit.images[0]);
    const extension = link.pathname.split(".");
    const element = types.get(extension[extension.length - 1].toLowerCase());
    const cover = useTexture(element === "img" ? hit.images[0] : hit.poster);
    const selected = useSelect();
    const [Ref, api] = useSphere(() => ({ mass: 10, position: [Math.floor(Math.random() * -2), (index + 5), Math.floor(Math.random() * -3)], args: selected[0] ? [3] : [1], ...props }));

    if (Ref && selected[0] && (selected[0].id === Ref.current.id)) {
        cloud.preview = [hit];
    }
    if (!selected[0]) {
        cloud.preview = [];
        // cloud.target = target;
    }

    const material = new THREE.MeshPhysicalMaterial({
        // wireframe: true,
        color: state.theme === 'light' ? state.light.CD : state.dark.CD,
        reflectivity: 1,
        roughness: state.theme === 'light' ? state.light.CDRough : state.dark.CDRough,
        metalness: 0.2,
        opacity: 1,
        clearcoat: 0.8,
        transmission: 0.89,
    })

    // Handle node select
    const pos = useRef([0, 0, 0]);

    useFrame(() => {
        if (Ref && selected[0] && (selected[0].id === Ref.current.id)) {
            const unsubscribe = api.position.subscribe((v) => (pos.current = v));
            cloud.target = pos.current;
            return unsubscribe;
        }
    });

    return (
        <mesh
            {...props}
            castShadow
            receiveShadow
            ref={Ref}
            onClick={() => {

                if (Ref.current && selected[0] && (selected[0].id === Ref.current.id)) {
                    clear();
                    confirm();
                } else {
                    select();
                }
            }}
        >
            <sphereGeometry
                args={[Ref && selected[0] && (selected[0].id === Ref.current.id) ? 3 : 1, 40, 40]} />
            <meshPhysicalMaterial map={cover} reflectivity={1} clearcoat={0.8} metalness={0.2} />
        </mesh>
    )
}

// function VideoMaterial({ img, Ref, frames }) {
//     let cover = useTexture(img);
//     const selected = useSelect();
//     // TODO: fix autoplay
//     // const [video] = useState(() => {
//     //   const vid = document.createElement("video");
//     //   vid.src = frames;
//     //   vid.crossOrigin = "Anonymous";
//     //   vid.loop = true;
//     //   vid.autoplay = true;
//     //   // vid.play();
//     //   return vid;
//     // });
//     // Ref.

//     return (
//         <mesh
//             castShadow
//             receiveShadow
//             ref={Ref}
//         >
//             <sphereGeometry
//                 args={[1, 40, 40]} />
//             {/* <videoTexture args={[video]} /> */}
//             <meshStandardMaterial map={cover} />
//         </mesh>
//     )
// }

export function Nodes({ ...props }) {

    return <>
        {props.hits.map((hit, index) => (
            <Cover hit={hit} key={index} index={index}{...props} />))}
    </>


}
