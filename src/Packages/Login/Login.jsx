import axios from "axios";
import toast from "react-hot-toast";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context";

const validationSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  password: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/profile");
    }
  }, []);

  const loginHandler = async values => {
    const data = await axios({
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      url: "http://localhost:8000/student/login/",
      data: values,
    });
    
    login(data.data.username, data.data.group);
    localStorage.setItem("username", data.data.username);
    localStorage.setItem("token", data.data.access);
    localStorage.setItem("refresh", data.data.refresh);
    navigate("/profile");
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      toast.promise(loginHandler(values), {
        loading: "Saving...",
        success: <b>Login Successful!</b>,
        error: err => err.message,
      });
    },
  });
  return (
    <div className="flex-1 w-full flex items-center justify-center mt-48">
      <div className="w-[350px] lg:w-[400px] shadow p-3">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold text-gray-900">Login</h1>
            <p className="text-sm text-gray-500">
              Please enter a valid email and password.
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
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
                onClick={formik.handleSubmit}>
                Login
              </Button>
            </div>
            <p className="text-gray-500 text-sm text-center">
              or,{" "}
              <Link to="/register">
                <span className="text-indigo-700 text-base">Register</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
