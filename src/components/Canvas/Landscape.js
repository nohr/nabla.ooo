import React, { useRef, useLayoutEffect } from 'react'
import * as THREE from "three";
import { useGLTF, Reflector, useTexture } from '@react-three/drei'

export default function Sand(props) {
  const group = useRef()
  const { nodes } = useGLTF('Canvas_Sand.glb')
  const textures = useTexture([
    "../Ice_OCC.jpg",
    "../Ice_NORM.jpg",
    "../Ice_DISP.png",
    "../floor_rough.jpg"
  ]);
  const [ao, normal, height, roughness] = textures;
  useLayoutEffect(() => {
    textures.forEach(
      (texture) => (
        (texture.wrapT = texture.wrapS = THREE.RepeatWrapping),
        texture.repeat.set(2, 2)
      )
    );
  }, [textures]);
  const material = new THREE.MeshPhysicalMaterial({
    color: "#FFAEAE",
    metalness: 0,
    roughness: 1,
    roughnessMap: roughness,
    aoMap: ao,
    normalMap: normal,
    normalScale: [1, 1],
    envMapIntensity: 10,
    bumpMap: height
  });

  return (
    <Reflector
      resolution={1024}
      receiveShadow
      mirror={0.25}
      blur={[250, 250]}
      mixBlur={14}
      mixStrength={1}
      minDepthThreshold={0.9}
      maxDepthThreshold={1.1}
      depthScale={20}
      depthToBlurRatioBias={0.2}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[70, 70]}
    >
      <group receiveShadow ref={group} {...props} dispose={null}>
        <group position={[0, -1, -0]} scale={.01} rotation={[-Math.PI, 0, -Math.PI]}>
          <mesh geometry={nodes.Landscape3_1.geometry} material={nodes.Landscape3_1.material} />

          <mesh geometry={nodes.Landscape1.geometry} material={nodes.Landscape1.material} position={[318.05, 0, 6000]} />
        </group>
      </group>
    </Reflector>
  )
}

