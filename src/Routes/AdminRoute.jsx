/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex justify-center items-center h-screen w-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;