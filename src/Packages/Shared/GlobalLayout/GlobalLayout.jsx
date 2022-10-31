import React from "react";
import { Toolbar, Container } from "@mui/material";
import { Header } from "../../Header";

export const GlobalLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container className="py-8">{children}</Container>
    </div>
  );
};
