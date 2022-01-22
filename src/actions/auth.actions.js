import Swal from 'sweetalert2'
import { AUTH_TYPES as types } from 'types'
import { authentication, signin, signup, updateProfile } from 'db/firebase.config'
import { clearStore } from 'actions'

export const startLoginEmailPassword = (email, password) => {
    return async dispatch => {
        dispatch(authLoading())
        try {
            const { user } = await signin.email(email, password)
            dispatch(login(user))
        } catch (error) {
            Swal.fire('Error', 'Incorrect user or password', 'error')
        }
        dispatch(authStop())
    }
}
export const startGoogleLogin = () => {
    return async dispatch => {
        dispatch(authLoading())
        try {
            const { user } = await signin.popup()
            dispatch(login(user))
        } catch (error) {
            throw error
        }
        dispatch(authStop())
    }
}

export const startSignUp = (name, email, password) => {
    return async dispatch => {
        dispatch(authLoading())
        try {
            const { user } = await signup.createUser(email, password)
            await updateProfile(user, { displayName: name })
            dispatch(login(user))
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
        dispatch(authStop())
    }
}

export const authLoading = () => ({
    type: types.loading,
})
export const authStop = () => ({
    type: types.finished,
})
export const login = ({ uid, displayName, photoURL }) => ({
    type: types.login,
    payload: {
        uid,
        name: displayName,
        photo: photoURL,
    },
})
export const logout = () => ({
    type: types.logout,
})
export const startLogOut = () => {
    return async dispatch => {
        await authentication.logout()
        dispatch(logout())
        dispatch(clearStore())
    }
}
