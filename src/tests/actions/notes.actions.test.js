import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { NOTES_TYPES as types } from 'types'
import { startAddNote } from 'actions'
import { db } from 'db/firebase.config'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Pruebas en notes.actions', () => {
    test('debe crear una nueva nota', async () => {
        const uid = 'testing'
        const store = mockStore({
            auth: {
                uid,
            },
        })
        await store.dispatch(startAddNote())
        const actions = store.getActions()
        // debe activar la nota
        expect(actions[0]).toEqual({
            type: types.active,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
            },
        })
        // debe agregar la nota a la lista
        expect(actions[1]).toEqual({
            type: types.add,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
            },
        })
        const id = actions[0].payload.id
        // limpiando la nota
        await db.deleteDoc(`${uid}/journal/notes/${id}`)
    })
})
