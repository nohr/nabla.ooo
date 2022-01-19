import { proxy } from 'valtio'

export const state = proxy({
    //UI
    selfs: [],
    clients: [],
    sectors: [],
    selectedImg: null,
    loading: false,
    containerWidth: 0,
    themeChanged: false,
    sfxVolume: 1,
    // Panel
    navWidth: 270,
    isPort: false,
    prtSwitched: false,
    setSwitched: false,
    isSett: false,
    grabbed: false,
    muted: false,
    playMusic: false,
    navPosition: { x: 0, y: 0 },
    prtPosition: { x: 0, y: 0 },
    setPosition: { x: 0, y: 0 },
    modalPosition: { x: 0, y: 0 },
    dist: 79,
    direction: true,
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
        backdrop: "rgba(255, 255, 255, 0.50)",
        //Canvas
        sky: "#c3c3c3",
        invert: "#1E1E1E",
        fog: "#848484",
        CD: '#E3B5A4',
        CDHover: '#0A0A0A',
        CDRough: 0,
        Surface: '#AEDEFF',
        SurfaceRough: 0.3,
        spotIntensity: 6,
        ambIntensity: 0.3,
        rectIntensity: 5,
        noise: 0.059,
    },
    dark: {
        //UI
        panelColor: "#5CBBFF",
        textHover: "#F3E8EE",
        placeholder: "unset",
        link: "#C6182A",
        LiHover: "#5CBBFF67",
        LiActiveBackground: "#ebebeb67",
        blend: "unset",
        backdrop: "rgba(0, 0, 0, 0.60)",
        //Canvas
        sky: "#1E1E1E",
        invert: "#c3c3c3",
        fog: "#030303",
        CD: "#070707",
        CDHover: '#E3B5A4',
        CDRough: 4,
        Surface: '#AEDEFF',
        SurfaceRough: 0.3,
        spotlight: '#646464',
        spotIntensity: 0.5,
        ambIntensity: 0.8,
        rectIntensity: 5,
        noise: 0.035,
    },
    //Canvas
    paused: false,
    canvasVisible: true,
    CDRotationX: 0.002,
    CDRotationY: 0.002,
    CDRotationZ: 0.0001,
    cameraPosition: [20, 10, 0],
});