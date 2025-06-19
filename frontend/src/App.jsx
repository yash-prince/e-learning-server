import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Loading from "./components/loading/Loading"

import Home    from "./pages/home/Home"
import About   from "./pages/about/About"
import Courses from "./pages/courses/Courses"

import Login    from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Verify   from "./pages/auth/Verify"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword  from "./pages/auth/ResetPassword"

import Account           from "./pages/account/Account"
import CourseDescription from "./pages/coursedescription/CourseDescription"
import PaymentSuccess    from "./pages/paymentsuccess/PaymentSuccess"
import Dashboard         from "./pages/dashboard/Dashboard"
import CourseStudy       from "./pages/coursestudy/CourseStudy"
import Lecture           from "./pages/lecture/Lecture"

import AdminDashboard from "./admin/Dashboard/AdminDashboard"
import AdminCourses   from "./admin/Courses/AdminCourses"
import AdminUsers     from "./admin/Users/AdminUsers"

import { UserData } from "./context/UserContext"

const App = () => {
  const { isAuth, user, loading } = UserData()

  if (loading) return <Loading />

  // Helper to check admin
  const isAdmin = user && user.role === "admin"

  return (
    <BrowserRouter>
      <Header isAuth={isAuth} />

      <Routes>
        {/* Public */}
        <Route path="/"        element={<Home />} />
        <Route path="/about"   element={<About />} />
        <Route path="/courses" element={<Courses />} />

        {/* Auth */}
        <Route
          path="/login"
          element={isAuth ? <Home /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Home /> : <Register />}
        />
        <Route
          path="/verify"
          element={isAuth ? <Home /> : <Verify />}
        />
        <Route
          path="/forgot-password"
          element={isAuth ? <Home /> : <ForgotPassword />}
        />
        <Route
          path="/reset-password"
          element={isAuth ? <Home /> : <ResetPassword />}
        />

        {/* User‑protected */}
        <Route
          path="/account"
          element={isAuth ? <Account user={user} /> : <Login />}
        />
        <Route
          path="/course/:id"
          element={isAuth ? <CourseDescription user={user} /> : <Login />}
        />
        <Route
          path="/payment-success/:id"
          element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
        />
        <Route
          path="/:id/dashboard"
          element={isAuth ? <Dashboard user={user} /> : <Login />}
        />
        <Route
          path="/course/study/:id"
          element={isAuth ? <CourseStudy user={user} /> : <Login />}
        />
        <Route
          path="/lectures/:id"
          element={isAuth ? <Lecture user={user} /> : <Login />}
        />

        {/* Admin‑protected */}
        <Route
          path="/admin/dashboard"
          element={isAuth && isAdmin ? <AdminDashboard user={user} /> : <Login />}
        />
        <Route
          path="/admin/course"
          element={isAuth && isAdmin ? <AdminCourses user={user} /> : <Login />}
        />
        <Route
          path="/admin/users"
          element={isAuth && isAdmin ? <AdminUsers user={user} /> : <Login />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App