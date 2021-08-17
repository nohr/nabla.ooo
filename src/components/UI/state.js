import { proxy } from 'valtio'

export const state = proxy ({
    works:[],
    loading: false,
    isPort: false,
    isSett: false,
    wasClicked: false,
    userControlled: true,
    sfxVolume:1,
    navPosition: {x: 0, y: 0},
    prtPosition: {x: 0, y: 0},
    cameraPosition: [-30, 3,0],
    theme: "light",
    light: {
        panelColor: "#444",
        textHover: "#ebebeb",
        sky: "#c3c3c3",
        fog: "#848484",
        LiHover: "#62b9ff67",
        LiActiveBackground: "#5e5e5e67",
        CD: 'material1',
        Surface:'#AEDEFF',
        
    },
    dark:{
        panelColor: "#ebebeb",
        textHover: "#ebebeb",
        sky: "#1E1E1E",
        fog: "#030303",
        LiHover: "#ff62b967",
        LiActiveBackground: "#5e5e5e67",
        CD: 'material',
        Surface:'#ff26b9',
    },
    transparent: "#00000000",
    white: "#ebebeb",
});


