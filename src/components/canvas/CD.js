import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSnapshot } from "valtio";
import { cloud, state } from "../../common/state";

function Ball(props) {
  const material = new THREE.MeshPhysicalMaterial({
    // wireframe: true,
    color: state.theme === "light" ? state.light.CD : state.dark.CD,
    reflectivity: 1,
    roughness:
      state.theme === "light" ? state.light.CDRough : state.dark.CDRough,
    metalness: 0.2,
    opacity: 1,
    clearcoat: 0.8,
  });

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      material={material}
    >
      <sphereGeometry args={[220, 100, 100]} />
    </mesh>
  );
}

export function CD({ ...props }) {
  const cd = useRef();
  const clip = useSnapshot(cloud);
  const snap = useSnapshot(state);

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
    <group
      ref={cd}
      position={[0, 1.5, 0]}
      scale={0.01}
      dispose={null}
      {...props}
      receiveShadow
      castShadow
    >
      <Ball position={[5.28, 0, -265.23]} />
      <Ball position={[306.5, 0, 134.46]} />
      <Ball position={[-296.7, 0, 134.46]} />
    </group>
  );
}
