import { useSphere } from '@react-three/cannon';
import { useSelect, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
// import { invalidate, useFrame } from '@react-three/fiber';
import React, { memo, useEffect, useRef } from 'react';
import * as THREE from "three";
import { useSnapshot } from 'valtio';
import { useLocation } from 'wouter';
import { cloud, state } from '../utils/state';

function Node({ select, confirm, clear, hit, index, ...props }) {
    const snap = useSnapshot(state);
    const [location, setLocation] = useLocation();
    const types = new Map([["jpg", "img"], ["jpeg", "img"], ["png", "img"], ["gif", "img"], ["mp4", "video"], ["svg", "svg"]]);
    const link = new URL(hit.images[0]);
    const extension = link.pathname.split(".");
    const element = types.get(extension[extension.length - 1].toLowerCase());
    const cover = useTexture(element === "img" ? hit.images[0] : hit.poster);

    // Handle node select
    const pos = useRef([0, 0, 0]);
    const selected = useSelect();
    const [Ref, api] = useSphere(() => ({ mass: 10, position: [Math.floor(Math.random() * -2), (index + 5), Math.floor(Math.random() * -3)], args: selected[0] ? [3] : [1], ...props }));

    useFrame(state => {
        if (Ref && selected[0] && (selected[0].id === Ref.current.id)) {
            // TODO fix this
            // state.camera.lookAt(pos.current);
            cloud.target = pos.current;
            // state.camera.position.lerp(vec.set(xPosition, Position, Position), .01);
            // state.camera.updateProjectionMatrix();
            state.camera.zoom = 1 - (snap.grabberPosition.x / 300);
            const unsubscribe = api.position.subscribe((v) => {
                pos.current = v;
            });
            return unsubscribe;
        }
        return null;
    });

    if (Ref && selected[0] && (selected[0].id === Ref.current.id)) {
        cloud.preview = [hit];
    }
    if (!selected[0]) {
        cloud.preview = [];
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

    return (
        <mesh
            {...props}
            castShadow
            receiveShadow
            ref={Ref}
            onClick={() => {
                if (Ref.current && selected[0] && (selected[0].id === Ref.current.id)) {
                    setLocation(`${hit.at}#${hit.projectName.replace(/\s+/g, '').toLowerCase()}`);
                    clear();
                    confirm();
                } else {
                    cloud.preview = [hit];
                    console.log();
                    // Ref.current.scale.set([1, 1, 1]);
                    select();
                }
            }}
        >
            <sphereGeometry
                args={[Ref && selected[0] && (selected[0].id === Ref.current.id) ? 3 : 1, 40, 40]}
            />
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

export const Nodes = memo(function Nodes({ ...props }) {
    useEffect(() => {
        cloud.CanvasLoading = false;
    }, []);

    return <>
        {props.hits.map((hit, index) => (
            <Node hit={hit} key={index} index={index}{...props} />))}
    </>
}
)