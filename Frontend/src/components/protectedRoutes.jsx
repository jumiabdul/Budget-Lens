import { useNavigate } from "react-router-dom";

const protectedRoutes = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) navigate("/");

    return (
        <>
            {children}
        </>
    )
}

export default protectedRoutes;