/**
 * @param {{
 *      validations: {{[x]: (value: String, validator) => boolean}},
 *      onSubmit: (event: Event) => void
 * }} props
 */
export const Form = ({ validations, onSubmit, ...props }) => {
    const handleSubmit = event => {
        event.stopPropagation()
        event.preventDefault()
        onSubmit instanceof Function && onSubmit(event)
    }
    return <form {...props} onSubmit={handleSubmit} noValidate />
}
