import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoutes = ({ children, role }) => {
    
    const user = useSelector((state) => state.user);

    if (!user) {
        return <LoadingSpinner />; 
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