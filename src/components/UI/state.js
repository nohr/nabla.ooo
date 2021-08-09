import { proxy } from 'valtio'

const state = proxy ({
    isPort: false,
    isSett: false,
    navPosition: {x: 0, y: 0},
    prtPosition: {x: 0, y: 0}
});

export { state };