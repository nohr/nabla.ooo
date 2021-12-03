import { proxy } from 'valtio'

export const state = proxy({
    works: [],
    sectors: [],
    collection: null,
    selectedImg: null,
    loading: false,
    paused: false,
    navWidth: 180,
    settWidth: 180,
    portWidth: 0,
    portX: 0,
    containerWidth: 0,
    isPort: false,
    isSett: false,
    themeChanged: false,
    userControlled: true,
    sfxVolume: 1,
    muted: false,
    navPosition: { x: 0, y: 0 },
    prtPosition: { x: 0, y: 0 },
    theme: "light",
    light: {
        panelColor: "#006ebc",
        panelBg: "#ebebeb80",
        textHover: "#F3E8EE",
        sky: "#c3c3c3",
        fog: "#848484",
        link: "#006ebc",
        LiHover: "#006ebc67",
        LiActiveBackground: "#5e5e5e67",
        CD: '#E3B5A4',
        CDHover: '#942433',
        CDRough: 0,
        Surface: '#AEDEFF',
        spotIntensity: 6,
        ambIntensity: 0.1,
        rectIntensity: 5,

    },
    dark: {
        panelColor: "#f3e8ee",
        panelBg: "#64646460",
        textHover: "#F3E8EE",
        sky: "#1F1F1F",
        fog: "#030303",
        link: "#C6182A",
        LiHover: "#C6182A67",
        LiActiveBackground: "#ebebeb67",
        CD: "#0A0A0A",
        CDHover: '#35A7FF',
        CDRough: 0,
        Surface: '#ff8a98',
        spotlight: '#646464',
        spotIntensity: 8,
        ambIntensity: 1,
        rectIntensity: 5,
    },
    transparent: "#00000000",
    white: "#009977",
    //Canvas
    canvasVisible: true,
    CDRotationY: 0.002,
    CDRotationZ: 0.0001,
    cameraPosition: [36, 15, 0],
    modalPosition: { x: 0, y: 0 },
    autoRotateSpeed: 0.09,
});


