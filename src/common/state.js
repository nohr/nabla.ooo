import { proxy, subscribe } from "valtio";
import { originalColors, target } from "./utils";

const storedStateString = localStorage.getItem("state");
const initialState = storedStateString
  ? JSON.parse(storedStateString)
  : {
    // Firebase
    store: [],
    blog: [],
    quotes: "Come in, you must be freezing.",
    //UI
    modalPosition: { x: 0, y: 0 },
    descPosition: { x: 0, y: 0 },
    // Mobile
    modal: false,
    gyro: false,
    hideNav: false,
    // Audio
    sfxVolume: 2,
    muted: false,
    songIndex: 0,
    // Panel
    navWidth: 270,
    isPro: false,
    isOpt: false,
    colorWheel: false,
    dragged: false,
    proSwitched: false,
    setSwitched: false,
    direction: true,
    navPosition: { x: 0, y: 0 },
    proPosition: { x: 0, y: 0 },
    optPosition: { x: 0, y: 0 },
    wheelPosition: { x: 0, y: 0 },
    mobileNavPosition: { x: 0, y: 0 },
    searchPosition: { x: 0, y: 0 },
    grabberPosition: { x: 0, y: 0 },
    optionsPosition: { x: 0, y: 0 },
    dist: 79,
    //Canvas
    canvasPaused: false,
    canvasVisible: true,
    CDRotationX: 0.002,
    CDRotationY: 0.002,
    CDRotationZ: 0.0001,
    loadSpeed: 0.15,
    cameraPosition: [-20, 3, -1],
    //Theme
    auto: false,
    themeChanged: false,
    colorChanged: false,
    hue: 209,
    monochrome: false,
    theme: "light",
    light: {
      //UI
      panelColor: originalColors.light.panelColor,
      textHover: "#EBEBEB",
      placeholder: originalColors.light.panelColor,
      link: originalColors.light.panelColor,
      LiHover: originalColors.light.LiHover,
      LiActiveBackground: "#5e5e5e67",
      blend: "plus-lighter",
      backdrop: "#FFFFFFd7",
      layerBG: "#ffffff20",
      bwElement: "#000",
      //Canvas
      sky: "#ffffff",
      fog: "#ffffff",
      CD: originalColors.light.CD,
      CDHover: "#0A0A0A",
      CDRough: 0,
      Surface: originalColors.light.Surface,
      SurfaceRough: 0,
      spotlight: "#ffffff",
      spotIntensity: 0.6,
      ambIntensity: 0.3,
      rectIntensity: 2,
      noise: 0.25,
    },
    dark: {
      //UI
      panelColor: originalColors.dark.panelColor,
      textHover: "#EBEBEB",
      placeholder: originalColors.dark.panelColor,
      link: "#C6182A",
      LiHover: originalColors.dark.LiHover,
      LiActiveBackground: "#ebebeb67",
      blend: "plus-lighter",
      backdrop: "#000000d7",
      layerBG: "#00000020",
      bwElement: "#fff",
      //Canvas
      sky: "#000000",
      fog: "#000",
      CD: "#0A0A0A",
      CDHover: "hsla(205, 31%, 70%, 1)",
      CDRough: 0.1389,
      Surface: originalColors.dark.Surface,
      SurfaceRough: 30,
      spotlight: originalColors.dark.spotlight,
      spotIntensity: 0.5,
      ambIntensity: 0.8,
      rectIntensity: 0.5,
      noise: 0.24,
    },
  };

storedStateString
  ? (initialState.cached = true)
  : (initialState.cached = false);

export const state = proxy(initialState);
subscribe(state, () => {
  localStorage.setItem("state", JSON.stringify(state));
});

// Short-term State
export const cloud = proxy({
  // Firebase
  data: [],
  collection: [],
  store: [],
  projects: [],
  types: [],
  selfs: [],
  clients: [],
  sectors: [],
  sector: [],
  about: '',
  users: [],
  categories: [],
  //UI
  query: '',
  UILoading: true,
  skew: false,
  preview: [],
  work: null,
  selectedImg: null,
  selectedDesc: null,
  chatMode: false,
  // Panel
  talking: false,
  drag: false,
  // Audio
  playMusic: false,
  playRate: 0.75,
  resetRate: Math.random() * (1.15 - 0.3) + 0.3,
  selectRate: Math.random() * (1.15 - 0.85) + 0.85,
  songs: [
    {
      name: "cemetery d1",
      artist: "nohri",
      tempo: 113,
    },
    {
      name: "cemetery c",
      artist: "nohri",
      tempo: 135,
    },
    {
      name: "covenant",
      artist: "nohri",
      tempo: 135,
    },
    //     {
    //     name: '104_GHOST',
    //     artist: 'nohri ft. chrismelh',
    //     tempo: 104
    // }, {
    //     name: 'shore',
    //     artist: 'nohri',
    //     tempo: 120
    // }, {
    //     name: '125_BAD ONE',
    //     artist: 'nohri',
    //     tempo: 125,
    // }, {
    //     name: 'saturation estate',
    //     artist: 'nohri',
    //     tempo: 167
    // }, {
    //     name: 'lysergic_72',
    //     artist: 'nohri ft. MELO-X',
    //     tempo: 72
    // }, {
    //     name: 'angel 2097',
    //     artist: 'nohri ft. emly',
    //     tempo: 120
    // }, {
    //     name: 'silly!',
    //     artist: 'nohri',
    //     tempo: 160,
    // }, {
    //     name: 'spo0ky action',
    //     artist: 'nohri',
    //     tempo: 120
    //     },
  ],
  // Accelerometer
  leftright: 0,
  frontback: 0,
  // Canvas
  CanvasLoading: true,
  target: target,
  selected: false,
  prevMat: null,
  mobileCameraPosition: [0, 20, 25],
  mobileCameraRotation: [0, 0, 0],
  mobileCameraQuaternion: [0, 0, 0],
  // Mobile
  mobile: window.matchMedia("(max-width: 768px)").matches,
  orientation: true,
  mobileOptions: false,
  mobileSearch: false,
});
