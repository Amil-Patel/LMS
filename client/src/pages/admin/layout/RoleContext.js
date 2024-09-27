import React, { createContext, useEffect, useState } from 'react';
const userRolesContext = createContext();

const RoleContext = ({ children }) => {
    const [userRole, setUserRole] = useState(() => {
        const storedUserRole = localStorage.getItem('userRole');
        return storedUserRole ? JSON.parse(storedUserRole) : null;
    });

    const [userId, setUserId] = useState(() => {
        const storedUserId = localStorage.getItem('userId');
        return storedUserId ? JSON.parse(storedUserId) : null;
    });

    useEffect(() => {
        if (userRole) {
            localStorage.setItem('userRole', JSON.stringify(userRole));
        } else {
            localStorage.removeItem('userRole');
        }
    }, [userRole]);
    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', JSON.stringify(userId));
        } else {
            localStorage.removeItem('userId');
        }
    }, [userId]);

    return (
        <>
            <userRolesContext.Provider value={{ userRole, setUserRole, userId, setUserId }}>
                {children}
            </userRolesContext.Provider>
        </>
    )
}

export { userRolesContext, RoleContext }
