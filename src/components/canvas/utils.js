import React, { useEffect } from "react";
import { Html, useProgress } from "@react-three/drei";
import { cloud, state } from "../../common/state";
import { useSnapshot } from "valtio";
import { usePlane } from "@react-three/cannon";

// Spinner
export const Spinner = () => {
    const { progress } = useProgress();

    useEffect(() => {
        cloud.CanvasLoading = true;

        return () => {
            cloud.CanvasLoading = false;
        };
    });

    return (
        <Html fullscreen>
            <div className="gugmu9vdpaw">
                <p>{`${Math.floor(progress)}`}</p>
            </div>
        </Html>
    );
};

export function Wall() {
    const snap = useSnapshot(state);
    return (
        <>
            <mesh rotation={[0, -Math.PI / 2, 0]} position={[30, 17, 0]}>
                <planeGeometry args={[70, 35]} />
                <meshPhongMaterial
                    color={snap.theme === "light" ? snap.light.sky : snap.dark.sky}
                    opacity={0}
                />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]} position={[-30, 17, 0]}>
                <planeGeometry args={[70, 35]} />
                <meshPhongMaterial
                    color={snap.theme === "light" ? snap.light.sky : snap.dark.sky}
                    opacity={0}
                />
            </mesh>
            <mesh rotation={[0, -Math.PI, 0]} position={[0, 17, 30]}>
                <planeGeometry args={[70, 35]} />
                <meshPhongMaterial
                    color={snap.theme === "light" ? snap.light.sky : snap.dark.sky}
                    opacity={0}
                />
            </mesh>
            <mesh rotation={[0, 0, 0]} position={[0, 17, -30]}>
                <planeGeometry args={[70, 35]} />
                <meshPhongMaterial
                    color={snap.theme === "light" ? snap.light.sky : snap.dark.sky}
                    opacity={0}
                />
            </mesh>
        </>
    );
}

export function Lights() {
    const snap = useSnapshot(state);
    return (
        <>
            {/* SPOTLIGHT */}
            <spotLight
                intensity={
                    snap.theme === "light"
                        ? snap.light.spotIntensity
                        : snap.dark.spotIntensity
                }
                decay={2}
                angle={Math.PI / 2}
                color={
                    snap.theme === "light" ? snap.light.spotlight : snap.dark.spotlight
                }
                position={[90, 60, -50]}
            />
            {/* RECT LIGHT */}
            <rectAreaLight
                intensity={
                    snap.theme === "light"
                        ? snap.light.rectIntensity
                        : snap.dark.rectIntensity
                }
                args={[
                    snap.theme === "light" ? snap.light.panelColor : snap.dark.panelColor,
                    20,
                    20,
                    20,
                ]}
                position={[0, -1, 0]}
                rotation-x={-Math.PI / 2}
            />
            {/* AMBIENT LIGHT */}
            <ambientLight
                intensity={
                    snap.theme === "light"
                        ? snap.light.ambIntensity
                        : snap.dark.ambIntensity
                }
            />
        </>
    );
}