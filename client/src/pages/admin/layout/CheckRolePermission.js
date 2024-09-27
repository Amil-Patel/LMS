import React, { useContext, useEffect, useState } from 'react';
import { userRolesContext } from "../layout/RoleContext";
import axios from 'axios';
const port = process.env.REACT_APP_URL;

const useCheckRolePermission = (permcate) => {
    const { userRole } = useContext(userRolesContext);
    const [checkPerm, setCheckPerm] = useState([]);

    const checkPermission = async () => {
        try {
            const res = await axios.get(`${port}/checkRolePermission`, {
                params: { name: userRole, permName: permcate }
            });
            setCheckPerm(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkPermission();
    }, [userRole, permcate]);

    return checkPerm;
};

export default useCheckRolePermission;
