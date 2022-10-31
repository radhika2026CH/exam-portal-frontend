import { Button, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  question: yup.string("Enter question").required("Question is required"),
  option_a: yup.string("Enter Option").required("Option is required"),
  option_b: yup.string("Enter Option").required("Option is required"),
  option_c: yup.string("Enter Option").required("Option is required"),
  option_d: yup.string("Enter Option").required("Option is required"),
  answer:  yup.string("Enter Answer").required("Correct answer is required"),
});
export const TestForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const AuthorizationHeader = `Bearer ${token}`;

  const create_test = async (values) => {
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
            <h1 className="text-lg font-bold text-gray-900">
              Register Question
            </h1>
            <p className="text-sm text-gray-500">
              Please fill the following fields
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <TextField
              fullWidth
              id="question"
              name="question"
              label="Question"
              value={formik.values.question}
              onChange={formik.handleChange}
              error={formik.touched.question && Boolean(formik.errors.question)}
              helperText={formik.touched.question && formik.errors.question}
            />
            <TextField
              fullWidth
              id="option_a"
              name="option_a"
              label="option A"
              value={formik.values.option_a}
              onChange={formik.handleChange}
              error={formik.touched.option_a && Boolean(formik.errors.option_a)}
              helperText={formik.touched.option_a && formik.errors.option_a}
            />
            <TextField
              fullWidth
              id="option_b"
              name="option_b"
              label="Option B"
              value={formik.values.option_b}
              onChange={formik.handleChange}
              error={formik.touched.option_b && Boolean(formik.errors.option_b)}
              helperText={formik.touched.option_b && formik.errors.option_b}
            />
            <TextField
              fullWidth
              id="option_c"
              name="option_c"
              label="Option C"
              value={formik.values.option_c}
              onChange={formik.handleChange}
              error={formik.touched.option_c && Boolean(formik.errors.option_c)}
              helperText={formik.touched.option_c && formik.errors.option_c}
            />
            <TextField
              fullWidth
              id="option_d"
              name="option_d"
              label="Option D"
              value={formik.values.option_d}
              onChange={formik.handleChange}
              error={formik.touched.option_d && Boolean(formik.errors.option_d)}
              helperText={formik.touched.option_d && formik.errors.option_d}
            />
            <TextField
              fullWidth
              id="fk_test_id"
              name="fk_test_id"
              label="Test"
              type="group"
              select
              value={formik.values.fk_test_id}
              onChange={formik.handleChange}
              error={
                formik.touched.fk_test_id &&
                Boolean(formik.errors.fk_test_id)
              }
              helperText={
                formik.touched.fk_test_id && formik.errors.fk_test_id
              }
            >
              {courseList.map((t) => (
                <MenuItem value={t.id}>{t.test_name}</MenuItem>
              ))}
            </TextField>
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
                Create Test
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
