import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
/**
 *
 * @param {{
 *  element: JSX.Element,
 *  auth: Boolean,
 * }}
 * @returns
 */
const PublicRoute = ({ auth, element }) => {
    return !auth ? element : <Navigate to='/' replace />
}
PublicRoute.propTypes = {
    auth: PropTypes.bool.isRequired,
    element: PropTypes.element.isRequired,
}
export default PublicRoute
