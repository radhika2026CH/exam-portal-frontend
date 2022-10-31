import {
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsStopwatch } from "react-icons/bs";
import axios from  "axios";

export const Test = () => {
  const token = localStorage.getItem("token");
  const AuthorizationHeader = `Bearer ${token}`;
  const [questionList, setQuestionList] = useState([]);
  const questionListHandler = async () => {
    const data = await axios({
      method: "get",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: AuthorizationHeader,
      },
      url: "http://localhost:8000/exam/questions/ques-list-by-test/4",
    });
    setQuestionList(data.data.questions_detail_list);
  };

  const registerStudentHandler = async () => {
    const data = await axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: AuthorizationHeader,
      },
      url: "http://localhost:8000/exam/student-course/add-student-course/",
      data: {
        student_id: localStorage.getItem("username"),
        course_id: "DSA Basics",
      },
    });
    console.log(data.data)
  };

  useEffect(() => {
    registerStudentHandler();
    questionListHandler();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 py-3 bg-white z-10 flex justify-between">
        <p className="text-lg font-bold tracking-tight">Test Name</p>
        <Chip
          label={"!2:13:14"}
          icon={<BsStopwatch />}
          variant="outlined"
          color="error"
        />
      </div>
      <List>
        {questionList.map((q, index) => (
          <ListItem className="shadow-inner border rounded-md mb-6">
            <div className="flex items-start gap-4">
              <span className="p-2 w-8 h-8 flex items-center justify-center border border-indigo-200 text-indigo-700 bg-indigo-50 rounded-full">
                {index + 1}
              </span>
              <FormControl className="gap-4">
                <p className="text-gray-900 font-semibold tracking-tight mt-1">
                  {q.question}
                </p>
                <RadioGroup>
                  <FormControlLabel
                    value="option_a"
                    label={
                      <p className="text-gray-700 font-medium capitalize text-sm tracking-wider">
                        {q.option_a}
                      </p>
                    }
                    control={<Radio size="small" />}
                  />
                  <FormControlLabel
                    value="option_b"
                    label={
                      <p className="text-gray-700 font-medium capitalize text-sm tracking-wider">
                        {q.option_b}
                      </p>
                    }
                    control={<Radio size="small" />}
                  />
                  <FormControlLabel
                    value="option_c"
                    label={
                      <p className="text-gray-700 font-medium capitalize text-sm tracking-wider">
                        {q.option_c}
                      </p>
                    }
                    control={<Radio size="small" />}
                  />
                  <FormControlLabel
                    value="option_d"
                    label={
                      <p className="text-gray-700 font-medium capitalize text-sm tracking-wider">
                        {q.option_d}
                      </p>
                    }
                    control={<Radio size="small" />}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </ListItem>
        ))}
      </List>
      <div className="flex gap-4 justify-end sticky bottom-0 py-2">
        <Button variant="outlined">Reset</Button>
        <Button variant="contained">Submit</Button>
      </div>
    </div>
  );
};
