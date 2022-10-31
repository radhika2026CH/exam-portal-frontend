import { Button, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  lname: yup.string("Enter your last name").required("Last name is required"),
  fname: yup.string("Enter your first name").required("First name is required"),
  email: yup.string("Enter your email").required("Email is required"),
  group: yup.string("Enter your group").required("Group is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/profile");
    }
  }, []);

  const registration = async (values) => {
    console.log("values",values);
    const data = await axios({
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      url: "http://localhost:8000/student/user-register/",
      data: values,
    });
    console.log("Data", data);
    localStorage.setItem("token", data.data.access);
    localStorage.setItem("username", data.data.username);
    localStorage.setItem("refresh", data.data.refresh);
    navigate("/profile");
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      fname: "",
      lname: "",
      email: "",
      password: "",
      group: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      toast.promise(registration(values), {
        loading: "Saving...",
        success: <b>Registraton Successful!</b>,
        error: (err) => err.message,
      });
    },
  });
  return (
    <div className="flex-1 w-full flex items-center justify-center mt-8">
      <div className="w-[350px] lg:w-[400px] shadow p-3">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold text-gray-900">Register</h1>
            <p className="text-sm text-gray-500">
              Please fill the following fields
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              id="fname"
              name="fname"
              label="First name"
              value={formik.values.fname}
              onChange={formik.handleChange}
              error={formik.touched.fname && Boolean(formik.errors.fname)}
              helperText={formik.touched.fname && formik.errors.fname}
            />
            <TextField
              fullWidth
              id="lname"
              name="lname"
              label="Last name"
              value={formik.values.lname}
              onChange={formik.handleChange}
              error={formik.touched.lname && Boolean(formik.errors.lname)}
              helperText={formik.touched.lname && formik.errors.lname}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              id="group"
              name="group"
              label="Group"
              type="group"
              select
              value={formik.values.group}
              onChange={formik.handleChange}
              error={formik.touched.group && Boolean(formik.errors.group)}
              helperText={formik.touched.group && formik.errors.group}>
              <MenuItem value="staff">Staff</MenuItem>
              <MenuItem value="student">Student</MenuItem>
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
                onClick={formik.handleSubmit}>
                Login
              </Button>
            </div>
            <p className="text-gray-500 text-sm text-center">
              or,{" "}
              <Link to="/login">
                <span className="text-indigo-700 text-base">Login</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
