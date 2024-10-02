import React, { useContext, useEffect, useState } from 'react';
import { userRolesContext } from "../layout/RoleContext";
import axiosInstance from '../utils/axiosInstance';
import Cookies from 'js-cookie';
const port = process.env.REACT_APP_URL;

const useCheckRolePermission = (permcate) => {
    const { userRole } = useContext(userRolesContext);
    const [checkPerm, setCheckPerm] = useState([]);
    const savedToken = Cookies.get('token');
    const checkPermission = async () => {
        try {
            const res = await axiosInstance.get(`${port}/checkRolePermission`, {
                params: { name: userRole, permName: permcate }
            });
            setCheckPerm(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (savedToken) {  // Only call checkPermission if token is defined
            checkPermission();
        }
    }, [userRole, permcate, savedToken]);

    return checkPerm;
};

export default useCheckRolePermission;
