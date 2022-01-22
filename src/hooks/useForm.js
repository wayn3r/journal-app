import { useState } from 'react'
import validator from 'validator'

/**
 *
 * @param {Object} initialState
 * @returns {[Object, (event: Event) => void, function(),function()]}
 */

export const useForm = (initialState = {}, validations) => {
    const [values, setValues] = useState(initialState)
    const reset = () => setValues(initialState)

    const handleInputChange = ({ target }) => {
        const { name, value } = target
        setValues(state => {
            validateField({
                input: target,
                validate: validations && validations[name],
                form: state,
            })
            return { ...state, [name]: value }
            // return state
        })
    }
    const validateField = ({ input, validate, form }) => {
        if (!input || !validate) return true
        const { name, value, parentElement: parent } = input
        const error = validate({ value, [name]: validator, form }).find(input => !input.valid)
        if (!parent) return Boolean(error)
        const spanError = parent.querySelector('.input-group__invalid-text')
        spanError.innerText = ''
        input.removeAttribute('required')
        input.removeAttribute('pattern')

        if (!error) return true

        input.pattern = input.required = true
        spanError.innerText = error.message
        input.focus()
        return false
    }

    const validateForm = ({ target }) => {
        const inputs = target.elements

        return Object.entries(validations).every(([name, validate]) =>
            validateField({
                input: inputs[name],
                validate,
                form: values,
            })
        )
    }

    return [values, handleInputChange, reset, validateForm]
}
