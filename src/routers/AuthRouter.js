import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../components/auth/LoginPage'
import { SignupPage } from '../components/auth/SignupPage'

export const AuthRouter = () => {
    return (
        <div className='auth__main'>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/*' element={<Navigate to='/auth/login' replace />} />
            </Routes>
        </div>
    )
}
