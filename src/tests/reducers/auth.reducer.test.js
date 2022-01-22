import { auth } from 'reducers/auth.reducer'
import { AUTH_TYPES as types } from 'types'

describe('Pruebas al auth.reducer', () => {
    test('debe realizar el login', () => {
        const user = { uid: '123', name: 'Juan' }
        const state = auth(undefined, {
            type: types.login,
            payload: user,
        })
        expect(state).toEqual({
            uid: user.uid,
            name: user.name,
            photo: '',
            logged: true,
            loading: false,
        })
    })
    test('debe realizar el logout', () => {
        const initial = { uid: '123', name: 'Juan' }
        const state = auth(initial, {
            type: types.logout,
        })
        expect(state).toEqual({ uid: null, name: null, photo: '', logged: false, loading: false })
    })
    test('debe devolver loading en true', () => {
        const state = auth(undefined, {
            type: types.loading,
        })
        expect(state.loading).toEqual(true)
    })
    test('debe devolver loading en false', () => {
        const state = auth(
            { loading: true },
            {
                type: types.finished,
            }
        )
        expect(state.loading).toEqual(false)
    })
    test('debe devolver el estado actual', () => {
        const initial = { test: true }
        const state = auth(initial, {
            type: 'undefined type for testing purposes',
        })
        expect(state).toEqual(initial)
    })
})
