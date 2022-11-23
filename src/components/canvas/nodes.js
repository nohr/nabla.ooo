import { useSphere } from "@react-three/cannon";
import { useSelect, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { memo, useRef } from "react";
import { useSnapshot } from "valtio";
import { useLocation } from "wouter";
import { cloud, state } from "../../common/state";

export function Node({
  select,
  confirm,
  hit,
  index,
  ...props
}) {
  const snap = useSnapshot(state);
  const [location, setLocation] = useLocation();
  const cover = useTexture(hit.cover);
  const selected = useSelect();
  let radius = [1.5];
  const pos = useRef([0, 0, 0]);
  const [Ref, api] = useSphere(() => ({
    mass: 10,
    position: [
      Math.floor(Math.random() * -2),
      index + 5,
      Math.floor(Math.random() * -3),
    ],
    args: radius,
    ...props,
  }));

  useFrame((state) => {
    if (Ref.current && selected[0] && selected[0].id === Ref.current.id) {
      cloud.target = pos.current;
      radius = [3];
      // console.log(Ref.current.scale);
      // Ref.current.scale.set  [3, 3, 3];
      // state.camera.position.lerp(vec.set(xPosition, Position, Position), .01);
      // state.camera.updateProjectionMatrix();
      state.camera.zoom = 1 - snap.grabberPosition.x / 300;
      const unsubscribe = api.position.subscribe((v) => {
        pos.current = v;
      });
      return unsubscribe;
    }
    return null;
  });

  // useFrame(() => {
  //     api.wakeUp();
  //     api.allowSleep.set(false);
  // })

  // Handle preview
  if (Ref && selected[0] && selected[0].id === Ref.current.id) {
    cloud.preview = [hit];
  }
  if (!selected[0]) {
    cloud.preview = [];
  }

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      ref={Ref}
      onClick={() => {
        if (Ref.current && selected[0] && selected[0].id === Ref.current.id) {
          setLocation(`${hit.lot}`);
          cloud.query = '';
          confirm();
        } else {
          cloud.preview = [hit];
          // Ref.current.scale.set([1, 1, 1]);
          select();
        }
      }}
    >
      <sphereGeometry
        args={[
          Ref && selected[0] && selected[0].id === Ref.current.id ? 3 : 1.5,
          40,
          40,
        ]}
      />
      <meshPhysicalMaterial
        map={cover}
        reflectivity={1}
        clearcoat={0.8}
        metalness={0.2}
      />
    </mesh>
  );
};

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
