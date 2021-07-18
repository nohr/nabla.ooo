import { OutlineEffect } from 'postprocessing';
import React, { MutableRefObject } from 'react';
import { Object3D } from 'three';
declare type ObjectRef = MutableRefObject<Object3D>;
export declare type OutlineProps = ConstructorParameters<typeof OutlineEffect>[2] & Partial<{
    selection: ObjectRef | ObjectRef[];
    selectionLayer: number;
}>;
export declare const Outline: React.ForwardRefExoticComponent<Partial<{
    blendFunction: import("postprocessing").BlendFunction;
    patternTexture: number;
    edgeStrength: number;
    pulseSpeed: number;
    visibleEdgeColor: number;
    hiddenEdgeColor: number;
    width: number;
    height: number;
    kernelSize: any;
    blur: boolean;
    xRay: boolean;
}> & Partial<{
    selection: ObjectRef | ObjectRef[];
    selectionLayer: number;
}> & React.RefAttributes<OutlineEffect>>;
export {};
