import React, { useState } from "react";
import "./admincourses.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
import { CourseData } from "../../context/CourseContext";

const categories = [
  "web development",
  "Data Science",
  "App Development",
  "Artificial - Intelligence",
];

const AddCourse = () => {
  const { courses, fetchCourses } = CourseData(); // ✅ Hook inside component

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description); // ✅ fixed typo from "descrription"
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();

      // Reset form fields
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setBtnLoading(false);
    }
  };

  return (
    <div className="right">
      <div className="add-course">
        <div className="course-form">
          <h2>Add Course</h2>
          <form onSubmit={submitHandler}>
            <label htmlFor="text">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="text">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label htmlFor="text">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <label htmlFor="text">Created By</label>
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              required
            />

            <label htmlFor="text">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))}
            </select>

            <label htmlFor="text">Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />

            <label htmlFor="file">Upload Image</label>
            <input type="file" required onChange={changeImageHandler} />
            {imagePrev && <img src={imagePrev} alt="" width={300} />}

            <button type="submit" disabled={btnLoading} className="common-btn">
              {btnLoading ? "Please Wait..." : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
