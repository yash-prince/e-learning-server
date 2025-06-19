import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "./auth.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const stateToken = location.state?.resetToken;
  const queryToken = new URLSearchParams(location.search).get("token");
  const initialToken = stateToken || queryToken || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If no resetToken, redirect back
  useEffect(() => {
    if (!initialToken) {
      navigate("/forgot-password", { replace: true });
    }
  }, [initialToken, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5000/api/user/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resetToken: initialToken,
            otp,
            newPassword,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Reset failed");

      toast.success("Password reset successful!");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Reset Password</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="otp">OTP</label>
          <input
            id="otp"
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="common-btn"
            disabled={loading || !otp || !newPassword}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p>
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
