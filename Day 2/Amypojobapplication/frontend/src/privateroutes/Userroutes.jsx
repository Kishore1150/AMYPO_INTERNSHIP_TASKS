import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const Userroutes = () => {
  const role = localStorage.getItem("role") == "user";
  return role ? <Outlet /> : <Navigate to="siginin" />;
};
