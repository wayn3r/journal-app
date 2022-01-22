import Swal from 'sweetalert2'
import { db } from 'db/firebase.config'
import { uploadImage } from 'services/cloudinary'
import { NOTES_TYPES as types } from 'types'

export const startAddNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        const note = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
        const { id } = await db.addDoc(uid + '/journal/notes', note)
        dispatch(setNote(id, note))
        dispatch(addNote(id, note))
    }
}

export const setNote = (id, note) => ({
    type: types.active,
    payload: { ...note, id },
})
export const addNote = (id, note) => ({
    type: types.add,
    payload: { ...note, id },
})

export const startLoadNotes = uid => {
    return async dispatch => {
        try {
            const notes = (await db.getDocs(`${uid}/journal/notes`)).docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }))
            dispatch(loadNotes(notes))
        } catch (err) {
            throw err
        }
    }
}
export const loadNotes = notes => ({
    type: types.load,
    payload: notes,
})

export const startSaveNote = note => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        const { id, ...noteToFireStore } = note
        try {
            await db.updateDoc(uid + '/journal/notes/' + id, noteToFireStore)
            dispatch(refreshNotes(id, noteToFireStore))
            Swal.fire('Note', 'Note saved successfully', 'success')
        } catch (e) {
            Swal.fire('Note', 'An error has ocurred while trying to update your note', 'error')
        }
    }
}

export const refreshNotes = (id, note) => ({
    type: types.update,
    payload: { ...note, id },
})

export const startUploadNoteImage = image => {
    return async (dispatch, getState) => {
        const { note } = getState().notes

        Swal.fire({
            title: 'Uploading image',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })
        const url = await uploadImage(image)
        const newNote = { ...note, image: url }
        dispatch(setNote(newNote.id, newNote))
        dispatch(startSaveNote(newNote))
        Swal.close()
    }
}

export const startDeleteNote = id => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth

        await db.deleteDoc(uid + '/journal/notes/' + id)

        dispatch(deleteNote(id))
    }
}
export const deleteNote = id => ({
    type: types.delete,
    payload: id,
})
