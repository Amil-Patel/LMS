import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const userRolesContext = createContext();

const RoleContext = ({ children }) => {
    const savedToken = Cookies.get('token');
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        if (savedToken) {
            try {
                const payload = savedToken.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                setUserRole(decodedPayload.role);
                setUserId(decodedPayload.id);
            } catch (error) {
                console.error("Failed to decode token:", error);
            }
        }
    }, [savedToken]);
    
    // useEffect(() => {
    //     if (userRole) {
    //         localStorage.setItem('userRole', JSON.stringify(userRole));
    //     } else {
    //         localStorage.removeItem('userRole');
    //     }
    // }, [userRole]);
    // useEffect(() => {
    //     if (userId) {
    //         localStorage.setItem('userId', JSON.stringify(userId));
    //     } else {
    //         localStorage.removeItem('userId');
    //     }
    // }, [userId]);

    return (
        <>
            <userRolesContext.Provider value={{ userRole, setUserRole, userId, setUserId }}>
                {children}
            </userRolesContext.Provider>
        </>
    )
}

export { userRolesContext, RoleContext }
