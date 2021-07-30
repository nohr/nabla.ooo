import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function Sand(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('Canvas_Sand.glb')
    return (
      <group receiveShadow ref={group} {...props} dispose={null}>
        <group position={[-496.54, 0, -0]} rotation={[-Math.PI, 0, -Math.PI]}>
          <mesh geometry={nodes.Landscape3_1.geometry} material={nodes.Landscape3_1.material}  />
        </group>
        <mesh geometry={nodes.Landscape1.geometry} material={nodes.Landscape1.material} position={[318.05, 0, 6000]} />
      </group>
    )
  }

  