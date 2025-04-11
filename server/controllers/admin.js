import TryCatch from "../middlewares/TryCatch.js";
import { Course } from "../models/Course.js";
import { Lecture } from "../models/Lecture.js";
import { rm } from "fs/promises"; 
import path from 'path';
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/User.js";

export const createCourse = TryCatch(async (req, res) => {
  const { title, description, category, createdBy, duration, price } = req.body;

  await Course.create({
    title:title,
    description:description,
    category:category,
    createdBy:createdBy,
    image: req.file?.filename,
    duration:duration,
    price:price,
  });

  res.status(201).json({
    message: "Course created successfully",
  });
});

export const addLectures = TryCatch(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) return res.status(404).json({ message: "No course with this provided ID" });

  const { title, description } = req.body;
  const file = req.file;

  const lecture = await Lecture.create({
    title,
    description,
    video: file?.path,
    course: course._id,
  });

  res.status(201).json({
    message: "Lecture added",
    lecture,
  });
});

export const deleteLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (!lecture) return res.status(404).json({ message: "Lecture not found" });

  // Deleting the video file if it exists
  if (lecture.video) {
    const videoPath = path.resolve("uploads", path.basename(lecture.video));
    try {
      await rm(videoPath);
      console.log("Video deleted successfully");
    } catch (error) {
      console.error("Error deleting video:", error.message);
    }
  }

  await lecture.deleteOne();

  res.json({ message: "Lecture deleted" });
});

const unlinkAsync = promisify(fs.unlink);

export const deleteCourse = TryCatch(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) return res.status(404).json({ message: "Course not found" });

  const lectures = await Lecture.find({ course: course._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      if (lecture.video && fs.existsSync(lecture.video)) {
        await unlinkAsync(lecture.video);
        console.log("Video deleted");
      }
    })
  );

  // Deleting course image
  const imagePath = path.resolve("uploads", course.image);
  if (fs.existsSync(imagePath)) {
    await rm(imagePath);
    console.log("Image deleted");
  }

  await Lecture.deleteMany({ course: req.params.id });

  await course.deleteOne();

  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({
    message: "Course deleted",
  });
});

export const getAllStats = TryCatch(async(req,res) => {
  const totalCourses = (await Course.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;

  const stats = {
    totalCourses,
    totalLectures,
    totalUsers,
  };

  res.json({
    stats,
  });
});

export const getAllUser = TryCatch(async(req,res) =>{
  const users = await User.find({_id: {$ne: req.user._id}}).select(
    "-password"
  );

  res.json({ users });
});

export const updateRole = TryCatch(async(req,res)=>{
  const user = await User.findById(req.params.id)

  if(user.role === "user"){
    user.role = "admin";
    await user.save();

    return res.status(200).json({
      message:"Role updated to admin",
    });
  }
  if(user.role === "admin"){
    user.role = "user";
    await user.save();

    return res.status(200).json({
      message:"Role updated to user",
    });
  }
})