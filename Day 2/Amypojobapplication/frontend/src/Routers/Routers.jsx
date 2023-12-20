import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import { UseStates } from "../States/Usestates";
import { SignIn } from "../Auth/SignIn";
import { Signup } from "../Auth/Signup";
import { Adminroutes } from "../privateroutes/Adminroutes";
import { Navigate } from "react-router-dom";
import { Userroutes } from "../privateroutes/Userroutes";
import { Userhome } from "../Pages/User/Userhome";

export const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <UseStates>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />

            {/* admin routes */}

            <Route element={<Adminroutes />}>
              <Route path="/home" element={<Home />} />
            </Route>

            {/* userroutes */}
            <Route element={<Userroutes/>}>
              <Route path="/userhome" element={<Userhome/>}/>
            </Route>
          </Routes>
        </UseStates>
      </BrowserRouter>
    </>
  );
};
