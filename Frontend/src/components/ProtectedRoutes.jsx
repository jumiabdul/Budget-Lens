import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, role }) => {
    const token = localStorage.getItem("token");
    const { user } = useSelector((state) => state.user);

    if (!token) {
        return <Navigate to="/" />;
    }

    if (role && user?.role !== role) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoutes;