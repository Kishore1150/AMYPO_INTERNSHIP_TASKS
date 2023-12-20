import React, { useState } from "react";
import logo from "../assets/Images/logo.svg";
import login from "../assets/Images/login.png";
import Services from "../Services/service";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormdata] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate=useNavigate();

  const [confirmpassword,setConfirmpassword]=useState("");


  const handleSignup=async(e)=>{
    e.preventDefault();
    if(confirmpassword==formData.password)
    {
      await Services.Signup(formData).then((res)=>{
        console.log(res.data);
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
                  <span className="">Signup  successfull!</span>
                </div>
              </div>
            </div>
          ));

          setTimeout(()=>{
            navigate("/signin");
          },3000)
      }).catch((err)=>{
        console.log(err.message);
      })
    }
    else
    {
      console.log("Please recheck your password")
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
                <span className="">Unable to Signup!</span>
              </div>
            </div>
          </div>
        ));
    }
  }



  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setFormdata({
      ...formData,
      [name]:value,
    })
    console.log(formData);
  }
  return (
    <main>
      <section className="flex  items-start">
        <div className="bg-[#20d489] h-screen w-[38em]">
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
        <div className="w-[48em] h-full">
          <div className="flex flex-col h-screen    py-32 font-poppins items-center ">
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-col gap-3">
                <p className="font-bold text-4xl">Sign Up</p>
                <p className="flex flex-col items-start gap-2 ">
                  <span className="text-[#99a1b7]">
                    Enter your details to create your account
                  </span>
                </p>
              </div>
              <form
                onSubmit={handleSignup}
                className="scrollbar flex flex-col  overflow-y-scroll h-[20em] w-full gap-8">
                <div className="flex flex-col gap-3 items-start">
                  <label className="font-bold " htmlFor="email">
                    Name
                  </label>
                  <input
                    className="bg-[#f9f9f9] focus:outline-none focus:border focus:border-brightgreen w-[24em] text-black px-3.5 py-2.5 text-lg fon rounded-lg "
                    type="text"
                    name="userName"
                    id="userName"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-3 items-start">
                  <label className="font-bold " htmlFor="email">
                    Email
                  </label>
                  <input
                    className="bg-[#f9f9f9] focus:outline-none focus:border focus:border-brightgreen w-[24em] text-black px-3.5 py-2.5 text-lg fon rounded-lg "
                    type="text"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-3 items-start">
                  <label className="font-bold " htmlFor="email">
                    Password
                  </label>
                  <input
                    name="password"
                    onChange={handleInputChange}
                    id="password"
                    className="bg-[#f9f9f9] focus:outline-none focus:border focus:border-brightgreen w-[24em]  text-black px-3.5 py-2.5 text-lg rounded-lg "
                  />
                </div>
                <div className="flex flex-col gap-3 items-start">
                  <label className="font-bold " htmlFor="email">
                    Confirm password
                  </label>
                  <input
                    name="confirmpassword"
                    id="confirmpassword"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    className="bg-[#f9f9f9] focus:outline-none focus:border focus:border-brightgreen w-[24em]  text-black px-3.5 py-2.5 text-lg rounded-lg "
                  />
                </div>
                <div className="flex flex-col gap-3 items-start">
                  <label className="font-bold " htmlFor="email">
                    Role
                  </label>
                  <select
                    name="role"
                    onChange={handleInputChange}
                    className="w-full bg-[#f9f9f9] focus:outline-none focus:border focus:border-brightgreen   text-black px-3.5 py-2.5 text-lg rounded-lg">
                    <option value="user">Select a role</option>
                    <option value="user">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <button className="bg-[#20d489] p-3 font-bold text-white px-8 text-sm rounded-lg">
                    Sign Up
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
    </main>
  );
};
