import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Hoc from '../Hoc';

const AdminAuthGuard = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <Hoc />;
    }

    if (!isAuthenticated) {
        return <Navigate to={"/admin/admin"} replace />;
    }

    return <div>{children}</div>;
};

export default AdminAuthGuard;
