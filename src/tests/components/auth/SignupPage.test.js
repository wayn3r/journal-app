import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'

import { SignupPage } from 'components/auth/SignupPage'

// jest.mock('actions/auth.actions', () => ({
//     startGoogleLogin: jest.fn(),
//     startLoginEmailPassword: jest.fn(),
// }))

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
            <SignupPage />
        </MemoryRouter>
    </Provider>
)

describe('Pruebas en <SignupPage />', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('debe renderizarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
    test('debe hacer dispatch de la acción respectiva', () => {
        const emailField = wrapper.find('input[name="email"]')
        emailField.simulate('change', { target: { value: '', name: 'email' } })

        wrapper.find('form').simulate('submit', { preventDefault() {} })

        expect(store.dispatch).not.toHaveBeenCalled()
    })
})
