import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  lname: yup.string("Enter your last name").required("Last name is required"),
  fname: yup.string("Enter your first name").required("First name is required"),
  email: yup.string("Enter your email").required("Email is required"),
});

export const EditProfileDialog = ({ initialValue }) => {
const { first_name, last_name, username, email } = initialValue;
console.log("intial valuess", initialValue)
const registration = async (values) => {
  console.log("values", values);
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
    username: username,
    fname: first_name,
    lname: last_name,
    email: email,
  },
  // validationSchema: validationSchema,
  onSubmit: async (values) => {
    toast.promise(registration(values), {
      loading: "Saving...",
      success: <b>Registraton Successful!</b>,
      error: (err) => err.message,
    });
  },
});
console.log("formik", formik.values)


  return (
      <form>
          <DialogContent>
            <div className="flex flex-col gap-3">
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
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
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined">Reset</Button>
            <Button variant="contained">Submit</Button>
          </DialogActions>
        </form>
  );
};
