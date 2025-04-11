import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import "./admincourses.css";
import AddCourse from "./AddCourse";

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  const [showAddCourse, setShowAddCourse] = useState(false); // ✅ Step 1

  if (user && user.role !== "admin") return navigate("/");

  const { courses } = CourseData();

  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1>All Courses</h1>
          <div className="dashboard-content">
            {courses && courses.length > 0 ? (
              courses.map((e) => <CourseCard key={e._id} course={e} />)
            ) : (
              <p>No Courses Yet</p>
            )}
          </div>
        </div>

        {/* ✅ Step 2: Toggle state on click */}
        <button
          className="common-btn"
          onClick={() => setShowAddCourse((prev) => !prev)}
        >
          {showAddCourse ? "Close Add Course" : "Add Course"}
        </button>

        {/* ✅ Step 3: Conditionally render AddCourse */}
        {showAddCourse && <AddCourse />}
      </div>
    </Layout>
  );
};

export default AdminCourses;
