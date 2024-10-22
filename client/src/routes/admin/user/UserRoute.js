import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import User from "../../../pages/admin/user/User";
import AdminAuthGuard from "../../../pages/admin/layout/auth/AdminAuthGuard";
import useCheckRolePermission from "../../../pages/admin/layout/CheckRolePermission";
import NotAuthor from "../../../pages/admin/notfound/NotAuthor";
import { userRolesContext } from "../../../pages/admin/layout/RoleContext";
const UserRoute = () => {
  const { userRole } = useContext(userRolesContext);
  const userData = useCheckRolePermission("Student");
  const viewUserData = userRole === "superAdmin" || (userData.length > 0 && userData[0].can_view === 1);

  const instrucatureData = useCheckRolePermission("Instructor");
  const viewInstrucatureData = userRole === "superAdmin" || (instrucatureData.length > 0 && instrucatureData[0].can_view === 1);

  const adminData = useCheckRolePermission("Admin");
  const viewAdminData = userRole === "superAdmin" || (adminData.length > 0 && adminData[0].can_view === 1);
  return (
    <Routes>
      <Route
        path="/user"
        element={
          <>
            <AdminAuthGuard>
              {viewUserData && viewInstrucatureData && viewAdminData ? <User /> : <NotAuthor />}
            </AdminAuthGuard>
          </>
        }
      />
    </Routes>
  );
};

export default UserRoute;
