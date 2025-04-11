import express from "express"
import {getAllCourses} from "../controllers/course.js"
import {getSingleCourse, fetchLectures, fetchLecture} from "../controllers/course.js"
import { isAuth }from "../middlewares/isAuth.js"
import {getMyCourses} from "../controllers/course.js"
import {checkout} from "../controllers/course.js"
import {paymentVerification} from "../controllers/course.js"

const router = express.Router();

router.get("/course/all",getAllCourses);
router.get("/course/:id",getSingleCourse);
router.get("/lectures/:id" , isAuth, fetchLectures);
router.get("/lecture/:id" , isAuth, fetchLecture);
router.get("/mycourse",isAuth, getMyCourses);
router.post("/course/checkout/:id", isAuth, checkout)
router.post("/verification/:id", isAuth, paymentVerification)

export default router;