import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const StudentItem = ({student: t}) => {
  const [showStudent, setShowStudent] = useState(false);
  return (
    <div>
      <ListItemButton key={t.id} onClick={() => setShowStudent((p) => !p)}>
        <ListItemIcon>
          {showStudent ? (
            <FiChevronUp className="text-lg text-indido-700 font-bold" />
          ) : (
            <FiChevronDown className="text-lg text-indido-700 font-bold" />
          )}
        </ListItemIcon>
        <ListItemText primary={t.username} secondary={t.email} />
        <ListItemText primary={t.first_name} />
      </ListItemButton>
    </div>
  );
};

