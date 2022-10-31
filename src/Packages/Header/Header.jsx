import React from "react";
import { AppBar, Toolbar, Container, Stack, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { redirect, useNavigate } from "react-router-dom";
export const Header = () => {
  const navigate = useNavigate();
  // const redirect = (value) => {
  //   if (value = "add course") {
  //     navigate("/create-course");
  //   }
  //   else if( value = "add test") {
  //     navigate("/create-test");
  //   }
  //   else if( value = "add ques"){
  //     navigate("/ques")
  //   }
  //   else if (value = "Profile") {
  //     navigate("/profile")
  //   }
  //   else if (value = "student") {
  //     navigate("/students-list");
  //   }
  // };
  return (
    <AppBar variant="outlined" position="relative">
      <Container>
        <Toolbar className="justify-between" disableGutters>
          <h1 className="uppercase font-bold text-lg tracking-wide">
            Exam Portal
          </h1>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

{
  /* <Toolbar>
  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
  <Stack direction="row" spacing={2}>
    <Button color="inherit" onClick={redirect("add course")}>
      Add Course
    </Button>
    <Button color="inherit" onClick={redirect("add test")}>
      {" "}
      Add Test
    </Button>
    <Button color="inherit" onClick={redirect("add ques")}>
      {" "}
      Add Question
    </Button>
    <Button color="inherit" onClick={redirect("view course")}>
      Profile
    </Button>
    <Button color="inherit" onClick={redirect("student")}>
      Deactivate Student
    </Button>
  </Stack>
</Toolbar>; */
}
