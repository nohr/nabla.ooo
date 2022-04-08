import { proxy } from 'valtio'

export const state = proxy({
    //UI
    selfs: [],
    clients: [],
    sectors: [],
    blog: [],
    selectedImg: null,
    loading: true,
    containerWidth: 0,
    themeChanged: false,
    sfxVolume: 1,
    // Panel
    navWidth: 270,
    isPort: false,
    isSett: false,
    prtSwitched: false,
    setSwitched: false,
    direction: false,
    muted: false,
    playMusic: false,
    // navPosition: { x: Math.random(), y: Math.random() },
    prtPosition: { x: 0, y: 0 },
    setPosition: { x: 0, y: 0 },
    modalPosition: { x: 0, y: 0 },
    dist: 79,
    //Search
    query: '',
    //Theme
    theme: "light",
    light: {
        //UI
        panelColor: "#00538f",
        textHover: "#F3E8EE",
        placeholder: "#00538f",
        link: "#00538f",
        LiHover: "#00538f67",
        LiActiveBackground: "#5e5e5e67",
        blend: "unset",
        backdrop: "rgba(255, 255, 255, 0.8)",
        //Canvas
        sky: "#EDEDED",
        fog: "#B8B8B8",
        CD: '#E3B5A4',
        CDHover: '#0A0A0A',
        CDRough: 0,
        Surface: '#AEDEFF',
        SurfaceRough: 0.3,
        spotIntensity: 6,
        ambIntensity: 0.3,
        rectIntensity: 2,
        noise: 0.29,
    },
    dark: {
        //UI
        panelColor: "#85CEFF",
        textHover: "#F3E8EE",
        placeholder: "unset",
        link: "#C6182A",
        LiHover: "#85CEFF67",
        LiActiveBackground: "#ebebeb67",
        blend: "unset",
        backdrop: "rgba(0, 0, 0, 0.8)",
        //Canvas
        sky: "#0D0D0D",
        fog: "#010101",
        CD: "#070707",
        CDHover: '#E3B5A4',
        CDRough: 4,
        Surface: '#85CEFF',
        SurfaceRough: 3,
        spotlight: '#646464',
        spotIntensity: 0,
        ambIntensity: 0.8,
        rectIntensity: 0.21,
        noise: 0.045,
    },
    //Canvas
    paused: true,
    canvasVisible: true,
    CDRotationX: 0.002,
    CDRotationY: 0.002,
    CDRotationZ: 0.0001,
    cameraPosition: [20, 0, 0],
});