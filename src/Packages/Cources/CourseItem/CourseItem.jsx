import {
  Collapse,
  Container,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { TestsList } from "../../Tests";

export const CoursesItem = ({ course: c }) => {
  const [showTest, setShowTest] = useState(false);
  return (
    <div>
  <ListItemButton
        key={c.id}
        onClick={() => setShowTest(p => !p)}>
        <ListItemIcon>
          {showTest ? (
            <FiChevronUp className="text-lg text-indido-700 font-bold" />
          ) : (
            <FiChevronDown className="text-lg text-indido-700 font-bold" />
          )}
        </ListItemIcon>
        <ListItemText primary={c.course_name} secondary={c.creater_name} />
      </ListItemButton>
      <Collapse in={showTest}>
        <Container>
          <div className="shadow-inner rounded-md border">
            <TestsList key_id = {c.id}/>
          </div>
        </Container>
      </Collapse>
    </div>
  );
};
