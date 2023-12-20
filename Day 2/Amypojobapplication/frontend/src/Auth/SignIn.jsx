import React, { useState } from "react";
import logo from "../assets/Images/logo.svg";
import login from "../assets/Images/login.png";
import { useNavigate } from "react-router-dom";
import Services from "../Services/service";
import toast, { Toaster } from "react-hot-toast";

export const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });
  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    await Services.SignIn(formData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userid", res.data.id);
        toast.custom((t) => (
          <div
            className={`bg-[#55ba45] text-white px-6 py-5 shadow-xl rounded-xl transition-all  ${
              t.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            } duration-300 ease-in-out`}>
            <div className="flex items-center gap-2 text-white">
              <span>
                <i class="fa-solid fa-circle-check"></i>
              </span>
              <div>
                <span className="">Login successfull!</span>
              </div>
            </div>
          </div>
        ));
        setTimeout(() => {
          if (localStorage.getItem("role") == "Admin") {
            navigate("/home");
          }
          else
          {
            navigate("/userhome");
          }
        }, 3000);
      })
      .catch((err) => {
        console.log(err.message);
        toast.custom((t) => (
          <div
            className={`bg-[#ff5e5b] text-white px-6 py-5 shadow-xl rounded-xl transition-all  ${
              t.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            } duration-300 ease-in-out`}>
            <div className="flex items-center gap-2 text-white">
              <span>
                <i class="fa-solid text-xl fa-circle-xmark"></i>
              </span>
              <div>
                <span className="">Login failed!</span>
              </div>
            </div>
          </div>
        ));
      });
  };
  return (
    <>
      <main>
        <section className="flex lg:flex-col items-start">
          <div className="bg-[#20d489] h-screen xl:w-[38em] lg:w-full">
            <div className="flex flex-col gap-12 items-center ">
              <figure className="mt-20 flex flex-col items-center gap-7">
                <img className="w-36" src={logo} alt="" />
                <div className="font-bold font-poppins text-white text-3xl text-center w-[10em]  leading-[40px]">
                  <p>Discover Start with great build tools</p>
                </div>
              </figure>

              <figure>
                <img className="h-[22em]" src={login} alt="" />
              </figure>
            </div>
          </div>
          <div className="xl:w-[48em] lg:p-5 h-full">
            <div className="flex flex-col h-screen    py-32 font-poppins items-center ">
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-4xl">Welcome to Start</p>
                  <p className="flex items-center gap-2 ">
                    <span className="text-[#99a1b7]">New here?</span>
                    <button
                      onClick={() => navigate("/signup")}
                      className="text-[#20d489] font-bold">
                      Create Account
                    </button>
                  </p>
                </div>
                <form
                  onSubmit={handleLogin}
                  className="flex flex-col w-full gap-8">
                  <div className="flex flex-col gap-3 items-start">
                    <label className="font-bold " htmlFor="email">
                      Email
                    </label>
                    <input
                      className="bg-[#f9f9f9] focus:outline-none focus:border focus:border-brightgreen w-[24em] text-black px-3.5 py-2.5 text-lg fon rounded-lg "
                      type="text"
                      name="email"
                      id="email"
                      onChange={handleInputchange}
                    />
                  </div>
                  <div className="flex flex-col gap-3 items-start">
                    <label className="font-bold " htmlFor="email">
                      Password
                    </label>
                    <input
                      onChange={handleInputchange}
                      name="password"
                      id="password"
                      className="bg-[#f9f9f9] focus:outline-none focus:border focus:border-brightgreen w-[24em] text-black px-3.5 py-2.5 text-lg rounded-lg "
                    />
                  </div>
                  <div>
                    <button className="bg-[#20d489] p-3 font-bold text-white px-8 text-sm rounded-lg">
                      Sign In
                    </button>
                  </div>
                </form>
                <div className="flex mt-12 items-center gap-5 font-bold text-[#99a1b7]">
                  <p>About</p>
                  <p>Support</p>
                  <p>Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Toaster
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
