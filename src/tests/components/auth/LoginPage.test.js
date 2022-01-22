import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'

import { LoginPage } from 'components/auth/LoginPage'
import { startGoogleLogin, startLoginEmailPassword } from 'actions/auth.actions'
jest.mock('actions/auth.actions', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initialState = {
    auth: {},
    notes: {},
}
const store = mockStore(initialState)
store.dispatch = jest.fn()
const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    </Provider>
)

describe('Pruebas en <LoginPage />', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('debe renderizarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe de llamar la acción startGoogleLogin', () => {
        wrapper.find('GoogleLoginButton').prop('onClick')()
        expect(startGoogleLogin).toHaveBeenCalled()
    })
    test('debe de llamar la acción startLoginEmailPassword', () => {
        const formEvent = { target: { elements: {} } }
        wrapper.find('Form').prop('onSubmit')(formEvent)
        expect(startLoginEmailPassword).toHaveBeenCalledWith('', '')
    })
})
