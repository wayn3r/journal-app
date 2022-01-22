import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { authentication } from 'db/firebase.config'
import { login, logout, startLoadNotes } from 'actions'
import { PleaseWaitPage } from 'components/auth/WaitingPage'
import { JournalPage } from 'components/journal/JournalPage'

import { AuthRouter } from './AuthRouter'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const AppRouter = () => {
    const dispatch = useDispatch()
    const { logged } = useSelector(state => state.auth)
    const [checkingAuth, setCheckingAuth] = useState(true)
    useEffect(() => {
        authentication.onChanged(user => {
            if (user?.uid) {
                dispatch(login(user))
                dispatch(startLoadNotes(user?.uid))
            } else dispatch(logout())

            setCheckingAuth(false)
        })
    }, [dispatch])

    if (checkingAuth) return <PleaseWaitPage />
    return (
        <Router>
            <Routes>
                <Route
                    path='/auth/*'
                    element={<PublicRoute auth={logged} element={<AuthRouter />} />}
                />
                <Route
                    path='/'
                    element={<PrivateRoute auth={logged} element={<JournalPage />} />}
                />
                <Route path='/*' element={<Navigate to='/auth/login' replace />} />
            </Routes>
        </Router>
    )
}
