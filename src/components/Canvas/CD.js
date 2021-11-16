import React, { useRef, useState } from 'react';
import * as THREE from "three";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { state } from '../UI/state';



function Ball(props) {
  const material = new THREE.MeshPhysicalMaterial({
    color: state.theme === 'light' ? state.light.CD : state.dark.CD,
    reflectivity: 1,
    roughness: state.theme === 'light' ? state.light.CDRough : state.dark.CDRough,
    metalness: 0.2,
    opacity: 1,
  })

  const material1 = new THREE.MeshPhysicalMaterial({
    color: state.theme === 'light' ? state.light.CDHover : state.dark.CDHover,
    reflectivity: 1,
    roughness: state.theme === 'light' ? state.light.CDRough : state.dark.CDRough,
    metalness: 0.2,
    opacity: 1,
  })

  const [hovered, setHover] = useState(false)

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      material={!hovered ? material : material1}
      onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}
    >
      <sphereGeometry args={[190, 190, 190]} />
    </mesh>
  )
}

export default function CD(props) {
  const group = useRef()
  useFrame(() => {
    group.current.rotation.y += state.CDRotationY;
    group.current.rotation.z += state.CDRotationZ;
  });

  //  const material = new THREE.MeshPhysicalMaterial({
  //   color: "#E3B5A4",
  //   reflectivity: 1,
  //   ior:1.363,
  //   roughness: 0,
  //   metalness: 0.16,
  //   clearcoat: 0.1,
  //   clearcoatRoughness: 0,
  //   transmission: 1.0,
  //   opacity: 1,
  //   transparent: true
  // })

  return (
    <group  {...props} dispose={null} >
      <group ref={group} position={[0, 2, 0]} receiveShadow castShadow >
        <group position={[0, 0, 1]} scale={.01}>
          <Ball position={[5.28, 0, -265.23]} />
          <Ball position={[306.5, 0, 134.46]} />
          <Ball position={[-296.7, 0, 134.46]} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('Canvas_CD.glb')

