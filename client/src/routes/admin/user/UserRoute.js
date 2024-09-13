import React from "react";
import { Routes, Route } from "react-router-dom";
import User from "../../../pages/admin/user/User";

const UserRoute = () => {
  return (
    <Routes>
      <Route
        path="/user"
        element={
          <>
          <User/>
          </>
        }
      />
    </Routes>
  );
};

export default UserRoute;
