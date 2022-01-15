import React, { useRef } from 'react';
import * as THREE from "three";
import { useFrame } from '@react-three/fiber'
import { state } from '../UI/state';

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
      material={material}
    // material={!clicked ? material : material1}
    // onClick={(e) => { !clicked && !state.paused ? setClick(true) : setClick(false) }}
    >
      <sphereGeometry args={[220, 220, 220]} />
    </mesh>
  )
}

export default function CD() {
  const group = useRef()
  useFrame(() => {
    if (!state.paused) {
      group.current.rotation.x += state.CDRotationX;
      group.current.rotation.y += state.CDRotationY;
    }
  });

  return (
    <group ref={group} position={[0, 2, 0]} dispose={null}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]} receiveShadow castShadow >
      <group position={[0, 0, 1]} scale={.01}>
        <Ball position={[5.28, 0, -265.23]} />
        <Ball position={[306.5, 0, 134.46]} />
        <Ball position={[-296.7, 0, 134.46]} />
      </group>
    </group>
  )
}


