import globals, { AUTH_TYPES as types } from '../types'
const initial = {
    uid: null,
    name: null,
    photo: '',
    logged: false,
    loading: false,
}
export const auth = (state = initial, action) => {
    const { type, payload } = action
    switch (type) {
        case types.login: {
            const { uid, name, photo = '' } = payload
            return {
                uid,
                name,
                photo,
                logged: true,
                loading: false,
            }
        }
        case globals.clearStore:
        case types.logout:
            return initial
            
        case types.loading:
            return {
                ...state,
                loading: true,
            }
        case types.finished:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}
