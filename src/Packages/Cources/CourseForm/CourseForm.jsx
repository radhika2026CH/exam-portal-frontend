import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  course_name: yup
    .string("Enter Course Name")
    .required("Course Name is required"),
});

export const CourseForm = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const AuthorizationHeader = `Bearer ${token}`;

  const create_course = async (values) => {
    const courseData = {
      course_name: values.course_name,
      creater_name: username,
    };
    const data = await axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: AuthorizationHeader,
      },
      url: "http://localhost:8000/exam/course/create-course/",
      data: courseData,
    });
    console.log("Data", data);
    navigate("/profile");
  };

  const formik = useFormik({
    initialValues: {
      course_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      toast.promise(create_course(values), {
        loading: "Saving...",
        success: <b>Course Created Successful!</b>,
        error: (err) => err.message,
      });
    },
  });

  return (
    <div className="flex-1 w-full flex items-center justify-center mt-48">
      <div className="w-[350px] lg:w-[400px] shadow p-3">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold text-gray-900">
              Course Registration
            </h1>
            <p className="text-sm text-gray-500">
              Please enter a valid Course Name.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <TextField
              fullWidth
              id="course_name"
              name="course_name"
              label="Course name"
              value={formik.values.course_name}
              onChange={formik.handleChange}
              error={
                formik.touched.course_name && Boolean(formik.errors.course_name)
              }
              helperText={
                formik.touched.course_name && formik.errors.course_name
              }
            />
          </div>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button variant="outlined" fullWidth onClick={formik.handleReset}>
                Reset
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={formik.handleSubmit}
              >
                Register
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
