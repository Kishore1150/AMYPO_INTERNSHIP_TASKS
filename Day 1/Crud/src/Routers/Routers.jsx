import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import { UseStates } from "../States/Usestates";

export const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <UseStates>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </UseStates>
      </BrowserRouter>
    </>
  );
};
