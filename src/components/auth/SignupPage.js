import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { startSignUp } from 'actions'
import { useForm } from 'hooks'
import { check } from 'helpers/check'
import { Form, Input } from '../forms'

const initial = {
    name: '',
    email: '',
    password: '',
    password2: '',
}
const validations = {
    name: ({ value, name }) => [
        check(!name.isEmpty(value), 'Name is required'),
        check(name.isLength(value, { min: 3 }), 'Name is too short'),
    ],
    email: ({ value, email }) => [
        check(!email.isEmpty(value), 'Email is required'),
        check(email.isEmail(value), 'Email is invalid'),
    ],
    password: ({ value, password }) => [
        check(!password.isEmpty(value), 'Password is required'),
        check(password.isLength(value, { min: 6 }), 'Password must be at least 6 characters'),
    ],
    password2: ({ value, form }) => [check(value === form.password, 'Passwords do not match')],
}

export const SignupPage = () => {
    const [values, onChange, , validate] = useForm(initial, validations)
    const { name, email, password, password2 } = values
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.auth)
    const handleSignin = e => {
        if (!validate(e)) return

        dispatch(startSignUp(name, email, password))
    }

    return (
        <div className='auth__container animate__animated animate__fadeIn'>
            <h1 className='auth__title'>Sign Up</h1>
            <Form className='auth__form' onSubmit={handleSignin}>
                <Input
                    label='Name'
                    type='text'
                    name='name'
                    value={name}
                    invalid='Invalid name'
                    onChange={onChange}
                />
                <Input
                    label='Email'
                    type='email'
                    name='email'
                    value={email}
                    invalid='Invalid email'
                    onChange={onChange}
                />
                <Input
                    label='Password'
                    type='password'
                    name='password'
                    value={password}
                    invalid='Invalid password'
                    onChange={onChange}
                />
                <Input
                    label='Confirm password'
                    type='password'
                    name='password2'
                    value={password2}
                    invalid='Invalid password'
                    onChange={onChange}
                />

                <button className='button button--primary' type='submit' disabled={loading}>
                    {!loading ? (
                        'Sign Up'
                    ) : (
                        <>
                            <i className='fa fa-spinner fa-spin'></i> Loading...
                        </>
                    )}
                </button>
                <Link to='/auth/login' className='link auth__link'>
                    Already registered?
                </Link>
            </Form>
        </div>
    )
}
