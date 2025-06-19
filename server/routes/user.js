import express from 'express'
import {
  register,
  verifyUser,
  loginUser,
  myProfile,
  forgotPassword,    // ← make sure you export these from your controller
  resetPassword
} from "../controllers/user.js"
import { isAuth } from "../middlewares/isAuth.js"

const router = express.Router()

// existing auth flows
router.post("/user/register", register)
router.post("/user/verify",   verifyUser)
router.post("/user/login",    loginUser)
router.get ("/user/me",       isAuth, myProfile)

// new forgot/reset password flows
router.post("/user/forgot-password", forgotPassword)
router.post("/user/reset-password",  resetPassword)

export default router
