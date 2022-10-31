import { List, ListSubheader } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoursesItem } from "../CourseItem";

export const CourcesList = () => {
  const token = localStorage.getItem("token");
  const AuthorizationHeader = `Bearer ${token}`;
  const [courseList, setCourseList] = useState([]);
  const courseListHandler = async () => {
    const data = await axios({
      method: "get",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: AuthorizationHeader,
      },
      url: "http://localhost:8000/exam/course/course-list/",
    });
    setCourseList(data.data.course_detail_list);
  };

  useEffect(() => {
    courseListHandler();
  }, []);

  return (
    <List subheader={<ListSubheader>Courses</ListSubheader>}>
      {courseList.map((c) => (
        <CoursesItem course={c} />
      ))}
    </List>
  );
};

// const { course_detail_list } = {
//     success: 200,
//     course_detail_list: [
//       {
//         course_name: "DBMS Basics",
//         creater_name: "Prof. ABEED",
//       },
//       {
//         course_name: "DBMS Advance",
//         creater_name: "Prof. ABCD",
//       },
//       {
//         course_name: "DSA Basics",
//         creater_name: "Prof. Stack Queue",
//       },
//     ],
//   };
