import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  GlobalLayout,
  Login,
  Profile,
  Register,
  Test,
  CourseForm,
  TestForm,
  CourcesList,
  StudentList,
  Navbar,
} from "./Packages";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./Context";


import "@fontsource/mulish/400.css";
import "@fontsource/mulish/500.css";
import "@fontsource/mulish/600.css";
import "@fontsource/mulish/700.css";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider
        theme={createTheme({
          typography: { fontFamily: "Mulish" },
          shape: {
            borderRadius: 20,
          },
        })}>
        <AuthContextProvider>
          <GlobalLayout>
            {/* <Navbar /> */}
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/test/:id" element={<Test />} />
              <Route path="/create-course" element={<CourseForm />} />
              <Route path="/create-test" element={<TestForm />} />
              <Route path = "/course-list" element = {<CourcesList /> } />
              <Route path="/students-list" element = {< StudentList/>} />
            </Routes>
          </GlobalLayout>
        </AuthContextProvider>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
