import { proxy } from 'valtio'

export const state = proxy({
    works: [],
    sectors: [],
    loading: false,
    paused: false,
    isPort: false,
    isSett: false,
    wasClicked: false,
    userControlled: true,
    sfxVolume: 1,
    muted: false,
    navPosition: { x: 0, y: 0 },
    prtPosition: { x: 0, y: 0 },
    cameraPosition: [-30, 3, 0],
    theme: "light",
    light: {
        panelColor: "#444",
        panelBg: "#ebebeb80",
        textHover: "#ebebeb",
        sky: "#c3c3c3",
        fog: "#848484",
        LiHover: "#62b9ff67",
        LiActiveBackground: "#5e5e5e67",
        CD: '#E3B5A4',
        Surface: '#AEDEFF',

    },
    dark: {
        panelColor: "#ebebeb",
        panelBg: "#64646460",
        textHover: "#ebebeb",
        sky: "#1F1F1F",
        fog: "#030303",
        LiHover: "#d1495b67",
        LiActiveBackground: "#ebebeb67",
        CD: "#d1495b",
        Surface: '#e28d98',
        spotlight: '#646464',
    },
    transparent: "#00000000",
    white: "#ebebeb",
});


