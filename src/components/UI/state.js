import { proxy } from 'valtio'

export const state = proxy({
    //UI
    works: [],
    sectors: [],
    selectedImg: null,
    loading: false,
    containerWidth: 0,
    themeChanged: false,
    // Panel
    navWidth: 230,
    settWidth: 230,
    portWidth: 0,
    isPort: false,
    isSett: false,
    sfxVolume: 1,
    muted: false,
    playMusic: false,
    navPosition: { x: 0, y: 0 },
    prtPosition: { x: 0, y: 0 },
    dist: 25,
    //Search
    query: '',
    //Theme
    theme: "light",
    light: {
        panelColor: "#006ebc",
        textHover: "#F3E8EE",
        placeholder: "#006ebc",
        sky: "#c3c3c3",
        fog: "#848484",
        link: "#006ebc",
        LiHover: "#006ebc67",
        LiActiveBackground: "#5e5e5e67",
        CD: '#E3B5A4',
        CDHover: '#0A0A0A',
        CDRough: 0,
        Surface: '#AEDEFF',
        SurfaceRough: '0',
        spotIntensity: 6,
        ambIntensity: 0.1,
        rectIntensity: 5,
        blend: "unset",
        searchFocus: "0 0 50px 50px",
        backdrop: "rgba(255, 255, 255, 0.50)",
        noise: .059,
    },
    dark: {
        panelColor: "#5CBBFF",
        textHover: "#F3E8EE",
        placeholder: "unset",
        sky: "#1E1E1E",
        fog: "#030303",
        link: "#C6182A",
        LiHover: "#5CBBFF67",
        LiActiveBackground: "#ebebeb67",
        CD: "#070707",
        CDHover: '#E3B5A4',
        CDRough: 4,
        Surface: '#AEDEFF',
        SurfaceRough: '0.3',
        spotlight: '#646464',
        spotIntensity: 0.5,
        ambIntensity: 0.8,
        rectIntensity: 5,
        blend: "unset",
        searchFocus: "0 0 0px 0px",
        backdrop: "rgba(0, 0, 0, 0.50)",
        noise: .035,
    },
    //Canvas
    paused: false,
    canvasVisible: true,
    CDRotationX: 0.002,
    CDRotationY: 0.002,
    CDRotationZ: 0.0001,
    cameraPosition: [20, 10, 0],
    modalPosition: { x: 0, y: 0 },
});