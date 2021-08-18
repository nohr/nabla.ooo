import React, { useRef } from 'react';
import * as THREE from "three";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { state } from '../UI/state';

export default function CD(props) {
  const group = useRef()

  useFrame(() => {
    group.current.rotation.y += 0.002;
    group.current.rotation.z += 0.0001;
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

  const material = new THREE.MeshPhysicalMaterial({
    color: "#2C2754",
    reflectivity: 1,
    roughness: 0.016,
    metalness: 0.16,
    opacity: 1,
  })

  const material1 = new THREE.MeshPhysicalMaterial({
    color: "#4F646F",
    reflectivity: 0,
    roughness: 0,
    metalness: 0.16,
    opacity: 1,
  })
  
  return (
    <group  {...props} dispose={null} >
      <group ref={group} position={[0, 2, 0]} receiveShadow castShadow >
        <group position={[0, 0, 1]} scale={.01}>
        <mesh
            castShadow
            receiveShadow
            position={[5.28, 0, -265.23]}
            material={state.theme === 'light' ? material1 : material}
          >
            <sphereGeometry args={[100, 100, 100]} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            position={[306.5, 0, 134.46]}
            material={state.theme === 'light' ? material1 : material}
          >
           <sphereGeometry args={[100, 100, 100]} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            position={[-296.7, 0, 134.46]}
            material={state.theme === 'light' ? material1 : material}
          >
            <sphereGeometry args={[100, 100, 100]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('Canvas_CD.glb')

