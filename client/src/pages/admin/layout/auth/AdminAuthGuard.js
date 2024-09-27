import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminAuthGuard = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            console.log("token", token);
            setIsAuthenticated(true);
            console.log("object2")
        } else {
            setIsAuthenticated(false);
        }

        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={"/admin"} replace />;
    }

    return <div>{children}</div>;
};

export default AdminAuthGuard;
