import React from 'react'
import { MdDashboard } from "react-icons/md";
import "./account.css"
import { IoLogOutOutline } from "react-icons/io5";
import {UserData} from "../../context/UserContext"
import toast,{Toaster} from "react-hot-toast"
import {useNavigate} from "react-router-dom";


const Account = ({user}) => {
  const {setIsAuth, setUser} = UserData();

  const navigate = useNavigate()

  const logoutHandler = () =>{
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  }
  return (
    <div>
      { user && (
        <div className="profile">
        <h2>My Profile</h2>
        <div className="profile-info">
            <p>
                <strong>Name - {user.name}</strong>
            </p>

            <p>
                <strong>Email - {user.email}</strong>
            </p>
            

            <button onClick={()=> navigate(`/${user._id}/dashboard`)} className="common-btn">
              <MdDashboard/>
              Dashboard
              </button>
            <br />

            {
              user.role === "admin" && (
              <button onClick={()=> navigate(`/admin/dashboard`)} className="common-btn">
              <MdDashboard/>
              Admin Dashboard
              </button>
              )
            }
              <br />

            <button onClick={logoutHandler} className="common-btn" style={{background: "red"}}>
              <IoLogOutOutline/>
              Logout
              </button>
        </div>
      </div>
      )}
    </div>
  )
}

export default Account
