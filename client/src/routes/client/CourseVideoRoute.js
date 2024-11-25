import React from "react";
import { Route, Routes } from "react-router-dom";
import CourseVideo from "../../pages/client/course/CourseVideo";

const CourseVideoRoute = () => {
  return (
    <Routes>
      <Route path="/course-video" element={<CourseVideo />} />
    </Routes>
  );
};

export default CourseVideoRoute;
