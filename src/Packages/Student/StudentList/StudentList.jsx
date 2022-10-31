import { List, ListSubheader } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {StudentItem}from "../StudentItem";

export const StudentList = () => {
 const token = localStorage.getItem("token");
 const AuthorizationHeader = `Bearer ${token}`;
 const [studentList, setStudentList] = useState([]);
 const studentListHandler = async() => {
    const data = await axios({
      method: "get",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: AuthorizationHeader,
      },
      url: "http://localhost:8000/student/students-detail/",

    });
    setStudentList(data.data.students_detail_list);
    console.log("data", data.data.students_detail_list);
 };

 useEffect(()=> {
    studentListHandler();
 }, [])

 return (
   <List subheader={<ListSubheader>Courses</ListSubheader>}>
     {studentList.map((c) => (
      <StudentItem key = {c.id} student={c} />
     ))}
   </List>
 );

};