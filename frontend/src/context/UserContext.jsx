import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // LOGIN
  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(`Welcome back ${data.user.name}`);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
      fetchMyCourse();
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errMsg);
      setIsAuth(false);
    } finally {
      setBtnLoading(false);
    }
  }

  // REGISTER
  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      navigate("/verify");
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Registration failed. Try again.";
      toast.error(errMsg);
    } finally {
      setBtnLoading(false);
    }
  }

  // VERIFY
  async function verifyUser(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(data.message);
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Verification failed.";
      toast.error(errMsg);
    } finally {
      setBtnLoading(false);
    }
  }

  // FORGOT PASSWORD
  async function forgotPassword(email) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/forgot-password`, {
        email,
      });

      toast.success(data.message);
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errMsg);
    } finally {
      setBtnLoading(false);
    }
  }

  // RESET PASSWORD
  async function resetPassword(token, password, confirmPassword, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.put(
        `${server}/api/user/reset-password/${token}`,
        { password, confirmPassword }
      );

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Reset password failed.";
      toast.error(errMsg);
    } finally {
      setBtnLoading(false);
    }
  }

  // FETCH USER
  async function fetchUser() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      console.log("User fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  }

  // LOGOUT
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuth(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        loginUser,
        registerUser,
        verifyUser,
        forgotPassword,
        resetPassword,
        fetchUser,
        logoutUser,
        btnLoading,
        loading,
      }}
    >
      {children}
      <Toaster position="top-center" />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);