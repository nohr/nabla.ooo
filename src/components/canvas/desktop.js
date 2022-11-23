import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Suspense } from "react";
import { CD } from "./CD";
import { Floor } from "./reflector";
import { Spinner, Wall } from "./utils";

export function DesktopComp({ clip, snap }) {

    return <>
        <Wall />
        <CD rotation={[-Math.PI / 2, Math.PI / 3.25, Math.PI / 2]} />
        <Suspense fallback={<Spinner />}>
            <Floor />
            <EffectComposer>
                <Noise
                    opacity={
                        snap.theme === "light"
                            ? clip.mobile
                                ? 0.5
                                : snap.light.noise
                            : clip.mobile
                                ? 0.09
                                : snap.dark.noise
                    }
                // premultiply={(state.theme === "light")}
                />
            </EffectComposer>
        </Suspense>
    </>
}