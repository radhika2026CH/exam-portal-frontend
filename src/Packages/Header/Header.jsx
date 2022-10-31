import React from "react";
import { AppBar, Toolbar, Container } from "@mui/material";

export const Header = () => {
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
