import { Button, Chip, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { BsStopwatch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const TestsList = (key_id) => {
  const [testList, setTestList] = useState([]);
  const token = localStorage.getItem("token");
  const AuthorizationHeader = `Bearer ${token}`;
  const navigate = useNavigate();
  const testListHandler = async () => {
    const data = await axios({
      method: "get",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: AuthorizationHeader,
      },
      url: `http://localhost:8000/exam/test/test-list-by-course/4`,
    });
    console.log("Test list", data.data.test_detail_list);
    setTestList(data.data.test_detail_list);
  };
  const start_test = async (values) => {
    console.log("values", values);
    const data = await axios({
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      url: "http://localhost:8000/student/user-register/",
      data: values,
    });
    console.log("Data", data);
    navigate("/test/4");
  };



  useEffect(() => {
    testListHandler();
  }, []);

  if (!testList) {
    return null;
  }
  return (
    <List>
      {testList.map(({ id, test_name, test_duration }) => (
        <ListItem>
          <div className="w-full flex items-center">
            <span className="flex-1">{test_name}</span>
            <div className="flex-1 flex justify-center">
              <Chip
                label={test_duration}
                variant="outlined"
                color="error"
                icon={<BsStopwatch />}
              />
            </div>
            <div className="flex-1 flex justify-end">
              <Button
                size="small"
                variant="contained"
                onClick={() => navigate(`/test/${id}`)}
              >
                Start
              </Button>
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  );
};
