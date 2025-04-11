import express from "express"
import { isAuth, isAdmin } from "../middlewares/isAuth.js";
import { createCourse, addLectures, getAllUser, updateRole } from "../controllers/admin.js";
import { uploadfiles } from "../middlewares/multer.js";
import {deleteLecture} from "../controllers/admin.js"
import {deleteCourse} from "../controllers/admin.js"
import {getAllStats} from "../controllers/admin.js"

const router = express.Router();

router.post("/course/new", isAuth, isAdmin, uploadfiles, createCourse);
router.post("/course/:id", isAuth, isAdmin, uploadfiles, addLectures);
router.delete("/course/:id", isAuth, isAdmin, deleteCourse);
router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);
router.get("/stats" ,isAuth,isAdmin, getAllStats);
router.put("/user/:id" ,isAuth,isAdmin,updateRole);
router.get("/users" ,isAuth,isAdmin,getAllUser);

export default router;