import { Button, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  test_name: yup.string("Enter test name").required("Test name is required"),
  test_duration: yup.number()
    .positive("Must be more than 0")
    .integer("Must be more than 0")
    .required("Duration is required"),
  fk_course_id: yup.number()
    .positive("Must be more than 0")
    .integer("Must be more than 0")
    .required("Course Id is required"),
});
export const TestForm = () =>{
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const AuthorizationHeader = `Bearer ${token}`;

    const create_test = async(values) => {
    const data = await axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: AuthorizationHeader,
      },
      url: "http://localhost:8000/exam/test/create-test/",
      data: values,
    });
    console.log("values reg test", values);
    navigate("/profile");
    };

    const [courseList, setCourseList] = useState([]);
    const courseListHandler = async () => {
      const data = await axios({
        method: "get",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AuthorizationHeader,
        },
        url: "http://localhost:8000/exam/course/course-list-by-creater/student123",
      });
      setCourseList(data.data.course_detail_list);
      console.log("data", data.data.course_detail_list);
    };

    const formik = useFormik({
      initialValues: {
        course_name: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        toast.promise(create_test(values), {
          loading: "Saving...",
          success: <b>Test Created Successful!</b>,
          error: (err) => err.message,
        });
      },
    });

    useEffect(() => {
      courseListHandler();
    }, []);
    return (
      <div className="flex-1 w-full flex items-center justify-center mt-8">
        <div className="w-[350px] lg:w-[400px] shadow p-3">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-bold text-gray-900">Register Test</h1>
              <p className="text-sm text-gray-500">
                Please fill the following fields
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <TextField
                fullWidth
                id="test_name"
                name="test_name"
                label="Test name"
                value={formik.values.test_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.test_name && Boolean(formik.errors.test_name)
                }
                helperText={formik.touched.test_name && formik.errors.test_name}
              />
              <TextField
                fullWidth
                type="integer"
                id="test_duration"
                name="test_duration"
                label="Test Duration"
                value={formik.values.test_duration}
                onChange={formik.handleChange}
                error={
                  formik.touched.test_duration &&
                  Boolean(formik.errors.test_duration)
                }
                helperText={
                  formik.touched.test_duration && formik.errors.test_duration
                }
              />
              <TextField
                fullWidth
                id="fk_course_id"
                name="fk_course_id"
                label="Course"
                type="group"
                select
                value={formik.values.fk_course_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.fk_course_id &&
                  Boolean(formik.errors.fk_course_id)
                }
                helperText={
                  formik.touched.fk_course_id && formik.errors.fk_course_id
                }
              >
                {courseList.map((c) => (
                  <MenuItem value={c.id}>{c.course_name}</MenuItem>
                ))}
              </TextField>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={formik.handleReset}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={formik.handleSubmit}
                >
                  Create Test
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );

}
