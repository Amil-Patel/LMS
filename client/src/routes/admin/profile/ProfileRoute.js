import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../../../pages/admin/profile/Profile";

const ProfileRoute = () => {
  return (
    <Routes>
      <Route
        path="/profile"
        element={
          <>
          <Profile/>
          </>
        }
      />
    </Routes>
  );
};

export default ProfileRoute;
