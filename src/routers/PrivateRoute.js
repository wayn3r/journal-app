import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
/**
 *
 * @param {{
 *  element: JSX.Element,
 *  auth: Boolean,
 * }}
 */
const PrivateRoute = ({ auth, element }) => {
    return auth ? element : <Navigate to='/login' replace />
}
PrivateRoute.propTypes = {
    auth: PropTypes.bool.isRequired,
    element: PropTypes.element.isRequired,
}
export default PrivateRoute
