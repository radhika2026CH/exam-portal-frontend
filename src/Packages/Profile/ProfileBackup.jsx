import {
  Chip,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { ToggleButton } from "../Shared";

const bull = (
  <span className="mx-2 scale-80 inline-block text-gray-700">•</span>
);

const UserItem = ({ data, type }) => {
  const { first_name, last_name, username, email } = data;
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center shadow p-3">
      <div>
        <p className="text-indigo-700 font-medium tracking-wider">
          @{username}
        </p>
        <p className="text-lg font-bold tracking-tight">
          {first_name} {last_name}
        </p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
      <div className="flex gap-4 items-center">
        <Chip label={type} className="capitalize" />
        <ToggleButton />
      </div>
    </div>
  );
};

const CourseItem = ({ cource }) => {
  const [showTest, setShowTest] = useState(false);
  return (
    <>
      <ListItemButton onClick={() => setShowTest(p => !p)}>
        <ListItemIcon>
          {showTest ? (
            <FiChevronUp className="text-lg text-indido-700 font-bold" />
          ) : (
            <FiChevronDown className="text-lg text-indido-700 font-bold" />
          )}
        </ListItemIcon>
        <div className="flex flex-col gap-1">
          <p className="font-bold tracking-tight">{cource.course_name}</p>
          <div className="flex items-center">
            <Chip
              size="small"
              label={
                <span className="text-indigo-700 font-medium tracking-wider text-sm">
                  Course
                </span>
              }
            />
            {bull}
            <Chip
              size="small"
              label={
                <span className="text-indigo-700 font-medium tracking-wider text-sm">
                  {cource.creater_name}
                </span>
              }
            />
          </div>
        </div>
      </ListItemButton>
      <Collapse in={showTest}>
        <div className="shadow-lg">
          <TestItem />
        </div>
      </Collapse>
    </>
  );
};

const TestItem = () => {
  const { test_detail_list } = {
    success: 200,
    test_detail_list: [
      {
        test_name: "DBMS test 1",
        test_duration: "01:23:20",
        fk_course: {
          course_name: "DBMS Advance",
          creater_name: "Prof. ABCD",
        },
      },
      {
        test_name: "DBMS test 2",
        test_duration: "01:23:20",
        fk_course: {
          course_name: "DBMS Advance",
          creater_name: "Prof. ABCD",
        },
      },
    ],
  };
  return (
    <List dense>
      {test_detail_list.map(({ test_name, test_duration }) => (
        <ListItemButton>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold tracking-tight">{test_name}</p>
            <div>
              <Chip
                size="small"
                label={
                  <span className="text-indigo-700 font-medium tracking-wider text-sm">
                    {test_duration}
                  </span>
                }
              />
            </div>
            <p className="text-sm text-gray-500"></p>
          </div>
        </ListItemButton>
      ))}
    </List>
  );
};

export const Profile = () => {
  const { students_detail_list } = {
    success: 200,
    students_detail_list: [
      {
        id: 17,
        password:
          "pbkdf2_sha256$390000$KKQcZEBxKI9Whhn7dudpWV$Vx2Cxh17kuxorCImfy24RyUw5jQasqCS9R2Rv7t3X6c=",
        last_login: null,
        is_superuser: false,
        username: "student",
        first_name: "student",
        last_name: "1",
        email: "abc@outlook.com",
        is_staff: false,
        is_active: false,
        date_joined: "2022-10-26T06:04:10.363646Z",
      },
      {
        id: 18,
        password:
          "pbkdf2_sha256$390000$pOYgBckLk4Uwy4FMcxCl9V$83yBQm8Rj3KhJOE0VOM6o5am4I0XV112+Gq3mH/toTE=",
        last_login: "2022-10-26T10:23:51.831041Z",
        is_superuser: false,
        username: "student123",
        first_name: "student",
        last_name: "1",
        email: "abc@outlook.com",
        is_staff: false,
        is_active: true,
        date_joined: "2022-10-26T06:19:57.232543Z",
      },
    ],
  };

  const { course_detail_list } = {
    success: 200,
    course_detail_list: [
      {
        course_name: "DBMS Basics",
        creater_name: "Prof. ABEED",
      },
      {
        course_name: "DBMS Advance",
        creater_name: "Prof. ABCD",
      },
      {
        course_name: "DSA Basics",
        creater_name: "Prof. Stack Queue",
      },
    ],
  };
  return (
    <div className="w-full py-8">
      <div className="flex flex-col gap-2">
        {students_detail_list.map(s => (
          <UserItem data={s} type="Student" />
        ))}
      </div>
      <List>
        {course_detail_list.map(c => (
          <CourseItem cource={c} />
        ))}
      </List>
    </div>
  );
};
