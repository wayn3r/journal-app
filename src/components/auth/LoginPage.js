import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'hooks'
import { Form, Input } from '../forms'
import { GoogleLoginButton } from '../buttons/GoogleLoginButton'
import { startGoogleLogin, startLoginEmailPassword } from 'actions'
import { check } from 'helpers/check'
const validations = {
    email: ({ value, email }) => [
        check(!email.isEmpty(value), 'Email is required'),
        check(email.isEmail(value), 'Email is invalid'),
    ],
    password: ({ value, password }) => [check(!password.isEmpty(value), 'Password is required')],
}

export const LoginPage = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.auth)
    const [values, onChange, , validate] = useForm(
        {
            email: '',
            password: '',
        },
        validations
    )
    const { email, password } = values

    const handleLogin = e => {
        if (!validate(e)) return

        dispatch(startLoginEmailPassword(email, password))
    }
    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }
    return (
        <div className='auth__container animate__animated animate__fadeIn'>
            <h1 className='auth__title'>Login</h1>
            <Form className='auth__form' onSubmit={handleLogin}>
                <Input
                    label='Email'
                    type='email'
                    value={email}
                    name='email'
                    invalid='Invalid email'
                    onChange={onChange}
                />
                <Input
                    type='password'
                    label='Password'
                    name='password'
                    value={password}
                    onChange={onChange}
                />
                <button className='button button--primary' disabled={loading} type='submit'>
                    {!loading ? (
                        'Login'
                    ) : (
                        <>
                            <i className='fa fa-spinner fa-spin'></i> Loading...
                        </>
                    )}
                </button>
            </Form>
            <div className='auth__social-networks'>
                <p>Login with social networks</p>
                <GoogleLoginButton onClick={handleGoogleLogin} />
            </div>

            <Link to='/auth/signup' className='link auth__link'>
                Create new account
            </Link>
        </div>
    )
}
