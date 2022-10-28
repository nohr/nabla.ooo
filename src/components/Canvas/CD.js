
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from "three";
import { useSnapshot } from 'valtio';
import { cloud, state } from '../utils/state';

function Ball(props) {
  const material = new THREE.MeshPhysicalMaterial({
    // wireframe: true,
    color: state.theme === 'light' ? state.light.CD : state.dark.CD,
    reflectivity: 1,
    roughness: state.theme === 'light' ? state.light.CDRough : state.dark.CDRough,
    metalness: 0.2,
    opacity: 1,
    clearcoat: 0.8,
  })

  // const material1 = new THREE.MeshPhysicalMaterial({
  //   color: state.theme === 'light' ? state.light.CDHover : state.dark.CDHover,
  //   reflectivity: 1,
  //   roughness: state.theme === 'light' ? state.light.CDRough : state.dark.CDRough,
  //   metalness: 0.2,
  //   opacity: 1,
  // })

  // const [clicked, setClick] = useState(false);

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      material={material}
    // material={!clicked ? material : material1}
    // onClick={(e) => { !clicked && !state.canvasPaused ? setClick(true) : setClick(false) }}
    >
      <sphereGeometry args={[220, 100, 100]} />
    </mesh>
  )
}

export function CD({ ...props }) {
  const cd = useRef();
  const clip = useSnapshot(cloud);
  const snap = useSnapshot(state);

  useEffect(() => {
    if (cd.current) {
      cd.current.rotation.x = -Math.PI / 2;
      cd.current.rotation.y = Math.PI / 3.25;
      cd.current.rotation.z = Math.PI / 2;
    }
  }, [])

  useFrame(() => {
    if (!clip.mobile) {
      if ((clip.UILoading || clip.talking) && cd.current) {
        cd.current.rotation.x += snap.loadSpeed;
        cd.current.rotation.y += snap.loadSpeed;
        cd.current.rotation.z += snap.loadSpeed;
      } else {
        return;
      }
    }
  });

  return (
    <group ref={cd} position={[0, 1.5, 0]} scale={.01} dispose={null}
      {...props} receiveShadow castShadow >
      <Ball position={[5.28, 0, -265.23]} />
      <Ball position={[306.5, 0, 134.46]} />
      <Ball position={[-296.7, 0, 134.46]} />
    </group>
  )
}

