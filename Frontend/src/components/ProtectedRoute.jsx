import PropTypes from "prop-types"; // Import PropTypes
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
