import { usePlane } from "@react-three/cannon";
import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { memo, Suspense, useEffect, useLayoutEffect } from "react";
import { DoubleSide, RepeatWrapping } from "three";
import { useSnapshot } from "valtio";
import { state } from "../../common/state";
import { Spinner } from "./utils";

const Reflector = memo(function Reflector() {
    const snap = useSnapshot(state);
    const textures = useTexture([
        "/images/reflector/Ice_OCC.jpg",
        "/images/reflector/Ice_NORM.jpg",
        "/images/reflector/Ice_DISP.png",
        "/images/reflector/floor_rough.jpeg",
    ]);
    const [ao, normal, height, roughness] = textures;
    useLayoutEffect(() => {
        textures.forEach(
            (texture) => (
                (texture.wrapT = texture.wrapS = RepeatWrapping),
                texture.repeat.set(2, 2)
            )
        );
    }, [textures]);
    return (
        <MeshReflectorMaterial
            debug={2}
            side={DoubleSide}
            resolution={1024}
            mirror={state.theme === "light" ? 0.15 : 0.28}
            blur={[250, 250]}
            mixBlur={14}
            distortion={0}
            mixStrength={1}
            minDepthThreshold={0.9}
            maxDepthThreshold={1.1}
            depthScale={2}
            depthToBlurRatioBias={0.2}
            color={state.theme === "light" ? snap.light.Surface : snap.dark.Surface}
            metalness={0}
            roughness={
                snap.theme === "light"
                    ? snap.light.SurfaceRough
                    : snap.dark.SurfaceRough
            }
            roughnessMap={roughness}
            aoMap={ao}
            normalMap={normal}
            normalScale={[1, 1]}
            envMapIntensity={1}
            bumpMap={height}
        />
    );
});

export function Floor() {
    return (
        // <Suspense fallback={<Spinner />}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[70, 70]} />
            <Reflector />
        </mesh>
        // </Suspense>
    );
}

export function PhysicsFloor() {
    const [ref, api] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
    }));
    // const collision = useRef(null);
    useEffect(() => {
        console.log(api);
    }, [api]);

    // useFrame(() => {
    //   console.log(collision.current);
    //   const unsubscribe = api.collisionResponse.subscribe((v) => collision.current = v);
    //   return unsubscribe;
    // });

    return (
        // <Suspense fallback={<Spinner />}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} ref={ref}>
            <planeGeometry args={[70, 70]} />
            <Reflector />
        </mesh>
        // </Suspense>
    );
}