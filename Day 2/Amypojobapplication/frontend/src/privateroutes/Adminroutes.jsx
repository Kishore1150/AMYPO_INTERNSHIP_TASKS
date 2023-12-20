import React from 'react'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export const Adminroutes = () => {

  const role=localStorage.getItem("role")=="Admin";
  return role ? <Outlet /> : <Navigate to="signin" />;
}
