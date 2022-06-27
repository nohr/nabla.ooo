import { proxy, subscribe } from "valtio"

const storedStateString = localStorage.getItem('state');
const initialState = storedStateString ? JSON.parse(storedStateString) : {
    // Firebase
    store: [],
    blog: [],
    projectNames: [],
    projectClients: [],
    mediums: [],
    by: [],
    quotes: "",
    statement: null,
    //UI
    selectedImg: null,
    selectedDesc: null,
    loading: true,
    containerWidth: 0,
    themeChanged: false,
    colorChanged: false,
    sfxVolume: 1,
    modalPosition: { x: 0, y: 0 },
    descPosition: { x: 0, y: 0 },
    // Audio
    muted: false,
    songIndex: 0,
    // Panel
    navWidth: 270,
    isPro: false,
    isOpt: false,
    colorWheel: false,
    drag: false,
    prtSwitched: false,
    setSwitched: false,
    direction: true,
    navPosition: { x: 0, y: 0 },
    proPosition: { x: 0, y: 0 },
    optPosition: { x: 0, y: 0 },
    dist: 79,
    //Canvas
    canvasPaused: true,
    canvasVisible: true,
    CDRotationX: 0.002,
    CDRotationY: 0.002,
    CDRotationZ: 0.0001,
    cameraPosition: [-20, 5, -1],
    //Theme
    theme: "light",
    light: {
        //UI
        panelColor: "hsl(205, 100%, 28%)",
        textHover: "#F3E8EE",
        placeholder: "hsl(205, 100%, 28%)",
        link: "hsl(205, 100%, 28%)",
        LiHover: "hsla(205, 100%, 28%, 0.67)",
        LiActiveBackground: "#5e5e5e67",
        blend: "plus-lighter",
        backdrop: "rgba(255, 255, 255, 0.8)",
        layerBG: '#ffffff20',
        bwElement: '#000',
        //Canvas
        sky: "#BFBFBF",
        fog: "hsl(360, 0%, 72%)",
        CD: "hsla(14, 31%, 84%, 1)",
        CDHover: "#0A0A0A",
        CDRough: 0,
        Surface: "hsla(205, 100%, 80%, 1)",
        SurfaceRough: 0,
        spotlight: "hsl(360, 0%, 72%)",
        spotIntensity: 6,
        ambIntensity: 0.3,
        rectIntensity: 2,
        noise: 0.12,
    },
    dark: {
        //UI
        panelColor: "hsl(205, 31%, 70%)",
        textHover: "#F3E8EE",
        placeholder: "hsl(205, 31%, 70%)",
        link: "#C6182A",
        LiHover: "hsla(205, 31%, 70%, 0.67)",
        LiActiveBackground: "#ebebeb67",
        blend: "plus-lighter",
        backdrop: "rgba(0, 0, 0, 0.8)",
        layerBG: '#00000020',
        bwElement: '#fff',
        //Canvas
        sky: "#0D0D0D",
        fog: "#0D0D0D",
        CD: "#0A0A0A",
        CDHover: "hsla(205, 31%, 70%, 1)",
        CDRough: .1389,
        Surface: "hsla(205, 15%, 50%, 1)",
        SurfaceRough: 30,
        spotlight: "hsla(205, 31%, 70%, 1)",
        spotIntensity: 0.5,
        ambIntensity: 0.8,
        rectIntensity: 0.21,
        noise: 0.045,
    }
};

storedStateString ? initialState.cached = true : initialState.cached = false;

export const state = proxy(initialState);
subscribe(state, () => {
    localStorage.setItem('state', JSON.stringify(state));
});

// Short-term State
export const cloud = proxy({
    // Firebase
    selfs: [],
    clients: [],
    sectors: [],
    //UI
    selectedImg: null,
    chatMode: false,
    loading: true,
    playMusic: false,
    songs: [{
        name: 'tardigrade',
        artist: 'nohri',
        tempo: 120,
    }, {
        name: 'covenant',
        artist: 'nohri',
        tempo: 135,
    }],
})