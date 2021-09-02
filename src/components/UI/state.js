import { proxy } from 'valtio'

export const state = proxy({
    works: [],
    loading: false,
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
        sky: "#1E1E1E",
        fog: "#030303",
        LiHover: "#968fcc67",
        LiActiveBackground: "#0f0f0f67",
        CD: "#0a0a0a",
        Surface: '#968fcc',
        spotlight: '#646464',
    },
    transparent: "#00000000",
    white: "#ebebeb",
});


