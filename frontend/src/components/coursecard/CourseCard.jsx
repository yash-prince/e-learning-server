import React from "react";
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const { user, isAuth } = UserData();
  const navigate = useNavigate();
  const{fetchCourse} = CourseData();

  const deleteHandler = async(id)=>{
    if(confirm("Are you sure you want to delete this course")){
      try{
        const{data}=await axios.delete(`${server}/api/course/${id}`,{
          headers: {
            token:localStorage.getItem("token"),
          },
        });
  
        toast.success(data.message);
        fetchCourse();
      }catch(error){
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="course-card">
      <img
        src={`${server}/uploads/${course.image}`}
        alt=""
        className="course-image"
      />
      <h3>{course.title}</h3>
      <p>Instructor - {course.createdBy}</p>
      <p>Duration - {course.duration} Weeks</p>
      <p>Price- ₹{course.price}</p>

      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
            {
                user.subscription.includes(course._id)?(
                    <button onClick={() => navigate(`/course/study/${course._id}`)} className="common-btn">
          Study
        </button>
                ): (
                    <button onClick={() => navigate(`/course/${course._id}`)} className="common-btn">
          Get Started
        </button>
                )
            }
            </>
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate(`/login`)} className="common-btn">
          Get Started
        </button>
      )}
      <br/>

      {
        user && user.role ==="admin" && 
        <button onClick={()=> deleteHandler(course._id)} className="common-btn" style={{background:"red"}}>Delete</button>
      }
    </div>
  );
};

export default CourseCard;
