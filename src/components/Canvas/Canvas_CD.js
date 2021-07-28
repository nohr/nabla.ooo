import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function CD(props) {
  const group = useRef()

  const [hovered, setHovered] = useState(false);
  const { nodes, materials } = useGLTF('Canvas_CD.glb')

  useFrame(() => {
    group.current.rotation.y += 0.02;
   });

  return (
    <group  {...props} dispose={null}  >
      <group ref={group} position={[0, 800, 2000]} receiveShadow castShadow >
        <group position={[0.47, -57.27, -3.71]} scale={5}>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere2.geometry}
            material={nodes.Sphere2.material}
            position={[5.28, 57.74, -265.23]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere1.geometry}
            material={nodes.Sphere1.material}
            position={[306.5, 57.74, 134.46]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere.geometry}
            material={nodes.Sphere.material}
            position={[-296.7, 57.74, 134.46]}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('Canvas_CD.glb')

