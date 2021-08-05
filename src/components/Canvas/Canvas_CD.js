import React, { useRef, useState } from 'react';
import * as THREE from "three";
import { Color } from '../UI/Colors';
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function CD(props) {
  const group = useRef()

  const [hovered, setHovered] = useState(false);
  const { nodes, materials } = useGLTF('Canvas_CD.glb')

  useFrame((clock) => {
    group.current.rotation.y += 0.002;
    group.current.rotation.z += 0.0001;

    // group.current.position.y = Math.sin(clock.getElapsedTime())

   });

   const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(2048)
   const material = new THREE.MeshPhysicalMaterial({
    color: Color.CD,
    reflectivity: 0,
    refractionRatio:0,
    roughness: 0,
    metalness: 0.16,
    clearcoat: 0.1,
    clearcoatRoughness: 0,
    transmission: 1.0,
    opacity: 1,
    transparent: true
  })
  return (
    <group  {...props} dispose={null} >
      <group ref={group} position={[0, 2, 0]} receiveShadow castShadow >
        <group position={[0, 0, 1]} scale={.01}>
        <mesh
            castShadow
            receiveShadow
            position={[5.28, 0, -265.23]}
            material={material}
          >
            <sphereGeometry args={[100, 100, 100]} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            position={[306.5, 0, 134.46]}
            material={material}
          >
           <sphereGeometry args={[100, 100, 100]} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            position={[-296.7, 0, 134.46]}
            material={material}
          >
            <sphereGeometry args={[100, 100, 100]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('Canvas_CD.glb')

