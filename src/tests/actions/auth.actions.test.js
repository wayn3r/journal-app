import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { login, logout, startLoginEmailPassword, startLogOut } from 'actions'
import globalTypes, { AUTH_TYPES as types } from 'types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
let store = mockStore({})
describe('Pruebas sobre las actions de auth', () => {
    beforeEach(() => {
        store = mockStore({})
    })
    test('login y logout deben devolver los objetos correctos', () => {
        const user = { uid: '123', displayName: 'test', photoURL: '' }
        expect(login(user)).toEqual({
            type: types.login,
            payload: {
                uid: user.uid,
                name: user.displayName,
                photo: user.photoURL,
            },
        })
        expect(logout()).toEqual({
            type: types.logout,
        })
    })

    test('debe de realizar el startLogout', async () => {
        await store.dispatch(startLogOut())

        const [actionLogout, actionClearStore] = store.getActions()
        expect(actionLogout).toEqual({
            type: types.logout,
        })
        expect(actionClearStore).toEqual({
            type: globalTypes.clearStore,
        })
    })
    test('debe de realizar el startLoginEmailPassword', async () => {
        const uid = 'bI6J0ZZItsSYQcwkdZOD2WTbwiF2'
        const email = 'test@test.com'
        const pass = 123456
        await store.dispatch(startLoginEmailPassword(email, pass))

        const [actionLoading, actionLogin, actionStopLoading] = store.getActions()
        expect(actionLoading).toEqual({
            type: types.loading,
        })
        expect(actionLogin).toEqual({
            type: types.login,
            payload: {
                uid,
                name: null,
                photo: null,
            },
        })
        expect(actionStopLoading).toEqual({
            type: types.finished,
        })
    })
})
