import React, { useState } from 'react'
import "./auth.css";
import {Link, useNavigate} from "react-router-dom";
import {UserData} from "../../context/UserContext"

const Verify = () => {
  const [otp,setOtp] = useState("");
  const {btnLoading,verifyUser} = UserData()
  const navigate = useNavigate();

  const submitHandler=async(e)=>{
    e.preventDefault()
    await verifyUser(Number(otp), navigate)
  };
  return (
    <div className="auth-page">
        <dic className="auth-form">
            <h2>Verify Account</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="otp">Otp</label>
                <input type="number" value={otp} onChange={e=>setOtp(e.target.value)} required />
                <button disabled={btnLoading} type="submit" className="common-btn">{btnLoading ? "Please Wait....": "Verify"}</button>
            </form>
            <p>
                Go to <Link to="/login ">Login</Link> Login page
            </p>
        </dic>
    </div>
  )
}

export default Verify