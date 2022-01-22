/**
 *
 * @param {{
 *      label: String,
 *      placeholder: String,
 *      invalid: String,
 * }} props
 */
export const Input = ({ label, placeholder = ' ', invalid, ...props }) => {
    return (
        <div className='input-group'>
            <input className='input-group__input' autoComplete='none' placeholder={placeholder} {...props} />
            {label && <label className='input-group__label'>{label}</label>}
            {(invalid || label) && <span className='input-group__invalid-text'>{invalid || label}</span>}
        </div>
    )
}
