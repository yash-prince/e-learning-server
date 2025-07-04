import React, { useEffect } from 'react'
import "./coursestudy.css"
import {Link, useNavigate, useParams} from 'react-router-dom'
import {CourseData} from '../../context/CourseContext'
import { server } from '../../main'

const CourseStudy = ({user}) => {
 const params = useParams()

 const {fetchCourse, course} = CourseData();
 const navigate = useNavigate();

 if(user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/")

 useEffect(()=>{
    fetchCourse(params.id)
 },[]);

 return (<>{course && (<div className="course-study-page">
   <img src={`${server}/uploads/${course.image}`} alt=" " width={350} />
   <h2>{course.title}</h2>
   <h4>{course.description}</h4>
   <h5>by - {course.createdBy} </h5>
   <h5>Duration -{course.duration} weeks </h5>
   <Link to={`/lectures/${course._id}`}>Lectures</Link>
 </div>)}
 </>
 );
};

export default CourseStudy
