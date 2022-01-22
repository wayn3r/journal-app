import globals, { NOTES_TYPES as types } from 'types'

const initial = {
    notes: [],
    active: false,
    note: {
        id: '',
        title: '',
        body: '',
        image: '',
        date: '',
    },
}
export const notes = (state = initial, action) => {
    const { type, payload } = action

    switch (type) {
        case types.add: {
            return {
                ...state,
                notes: [payload, ...state.notes],
            }
        }
        case types.active: {
            const {
                id = initial.note.id,
                image = initial.note.image,
                title = initial.note.title,
                body = initial.note.body,
                date = initial.note.date,
            } = payload
            return {
                ...state,
                active: true,
                note: { id, image, title, body, date },
            }
        }
        case types.load: {
            const notes = payload || []
            return {
                ...state,
                notes: notes.sort((a, b) => b.date - a.date),
            }
        }
        case types.update: {
            const notes = [...state.notes]
            const index = notes.findIndex(note => note.id === payload.id)
            if (index !== -1) notes.splice(index, 1, payload)
            return {
                ...state,
                notes,
            }
        }
        case types.delete: {
            const notes = [...state.notes]
            const index = notes.findIndex(note => note.id === payload)
            notes.splice(index, 1)
            return {
                ...state,
                active: false,
                note: initial.note,
                notes,
            }
        }
        case globals.clearStore:
        case types.clear:
            return initial

        default:
            return state
    }
}
