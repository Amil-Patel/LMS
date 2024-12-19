import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const userRolesContext = createContext();

const RoleContext = ({ children }) => {
    const savedToken = Cookies.get('token');
    const stuSavedToken = Cookies.get('student-token');
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [stuUserId, setStuUserId] = useState(null);
    const [stuUserRole, setStuUserRole] = useState(null);
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
        if (stuSavedToken) {
            try {
                const payload = stuSavedToken.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                setStuUserRole(decodedPayload.role);
                setStuUserId(decodedPayload.id);
            } catch (error) {
                console.error("Failed to decode token:", error);
            }
        }
    }, [savedToken, stuSavedToken]);
    return (
        <>
            <userRolesContext.Provider value={{ userRole, setUserRole, userId, setUserId, stuUserId, setStuUserId, stuUserRole, setStuUserRole }}>
                {children}
            </userRolesContext.Provider>
        </>
    )
}

export { userRolesContext, RoleContext }
