import React, { useEffect, useState } from 'react'
import "./coursedescription.css"
import { useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext';
import Loading from '../../components/loading/Loading';

const CourseDescription = ({user}) => {
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading]=useState(false);
    const {fetchUser} = UserData();
    const {fetchCourse, course, fetchCourses, fetchMyCourse} = CourseData();
    

    useEffect(()=>{
        fetchCourse(params.id);
    },[]);

    const checkHandler = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
      
          // 1) Create order on backend
          const { data: { order } } = await axios.post(
            `${server}/api/course/checkout/${params.id}`,
            {},
            {
              headers: {
                token,
              },
            }
          );
      
          // 2) Stop loading once order is created
          setLoading(false);
      
          // 3) Setup Razorpay options
          const options = {
            key: "rzp_test_DKrkjEj2EujJwn",
            amount: order.id,       // use the actual numeric amount from your backend
            currency: "INR",
            name: "E learning",
            order_id: order.id,         // the actual order ID
            handler: async (response) => {
              const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
              try {
                const { data } = await axios.post(
                  `${server}/api/verification/${params.id}`,
                  { razorpay_order_id, razorpay_payment_id, razorpay_signature },
                  {
                    headers: {
                      token,
                    }, 
                  }
                );
      
                await fetchUser();
                await fetchCourses();
                await fetchMyCourse();
                toast.success(data.message);
                setLoading(false);
                navigate(`/payment-success/${razorpay_payment_id}`);
              } catch (error) {
                toast.error(error.response.data.message);
                setLoading(false);
              }
            },
            theme: {
              color: "#8a4baf",
            },
          };
      
          // 4) Open Razorpay popup
          const razorpay = new window.Razorpay(options);
          razorpay.open();
      
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      
  return (
   <>
   {
    loading? <Loading/> : <>
    {course && (
     <div className="course-description">
         <div className="course-header">
             <img src={`${server}/uploads/${course.image}`}
             alt=""
             className="course-image"/>
             <div className="course-info">
                 <h2>{course.title}</h2>
                 <p>Instructor: {course.createdBy}</p>
                 <p>Duration: {course.duration} weeks</p>
                 
             </div>
             </div>
 
             <p>Let's get started with course At ₹{course.price}</p>
             <p>{course.description}</p>
 
             {
                 user && user.subscription.includes(course._id)? (
                     <button onClick={()=> navigate(`/course/study/${course._id}`)}className="common-btn">Study</button>
                 ): (
                     <button onClick={checkHandler} className="common-btn">Buy Now</button>
                 )
             }
     </div>
    )}
    </>
   }
   </>
  )
}

export default CourseDescription
