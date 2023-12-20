import React, { useEffect, useState, useRef } from "react";
import p1 from "../assets/Images/p1.png";
import { Collapse } from "@material-tailwind/react";
import photodrop from "../assets/Images/imagedrop.svg";
import ImageCompressor from "image-compressor.js";
import Services from "../Services/service";
import { useShowExpense } from "../States/Usestates";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Landingsection1 = () => {
  const { showexpense, updateShowExpense } = useShowExpense([]);
  const [showeditpopup, setShoweditpopup] = useState(false);

  const [data, setData] = useState({});

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [portfolioLink, setPorfolioLink] = useState("");
  const [applyPosition, setApplyPosition] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [previousCompanyName, setPreviousCompanyName] = useState("");
  const [comments, setComments] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userImage: "",
    mobileNumber: "",
    portfolioLink: "",
    applyPosition: "",
    expectedSalary: "",
    address: "",
    dob: "",
    relocate: "",
    previousCompanyName: "",
    comments: "",
  });

  useEffect(() => {
    if (data) {
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setEmail(data?.email);
      setMobileNumber(data?.mobileNumber);
      setPorfolioLink(data?.portfolioLink);
      setExpectedSalary(data?.expectedSalary);
      setApplyPosition(data?.applyPosition);
      setPreviousCompanyName(data?.previousCompanyName);
      setComments(data?.comments);
      setUserImage(data?.userImage);
    }
  }, [data]);

  const handleEditApplication = (data) => {
    setData(data);
    //  setFormData({
    //    firstName:data.firstName,

    //  });
    setShoweditpopup(true);
  };
  console.log(data);

  const editExpense = () => {};

  const handleExpense = (e) => {
    e.preventDefault();
  };

  const getApplications = () => {
    Services.getApplication().then((res) => {
      updateShowExpense(res.data);
    });
  };

  const deleteApplication = (id) => {
    Services.deleteApplication(id)
      .then((res) => {
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
                <span className="">Application deleted successfully!</span>
              </div>
            </div>
          </div>
        ));
        getApplications();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [showpopup, setShowpopup] = useState(false);
  const [showdetailpopup, setShowdetailpopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handlePopup = (user) => {
    setSelectedUser(user);
    setShowdetailpopup(true);
    console.log(user);
  };

  const handleShowpopup = () => {
    setShowpopup(!false);
  };

  const [currentSection, setCurrentSection] = useState(1);
  const [open, setOpen] = useState(true);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imageurl, setImageurl] = useState("");
  const navigate = useNavigate();

  const fileRef = useRef(null);
  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const compressedImage = await compressImage(selectedImage);
      const imageData = new FormData();
      imageData.append("file", compressedImage);
      imageData.append("upload_preset", "t516gx5k");
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dalynypf0/image/upload`,
          {
            method: "POST",
            body: imageData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        formData.userImage = data.secure_url;
        console.log(formData);
        setCurrentSection(3);
        console.log(data.secure_url);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  const compressImage = async (image) => {
    return new Promise((resolve, reject) => {
      new ImageCompressor(image, {
        quality: 0.1,
        success(result) {
          resolve(result);
        },
        error(error) {
          reject(error);
        },
      });
    });
  };

  const handleContentChange = (value) => {
    setContent(value);
    formData.content = content;
  };

  const toggleOpen = () => {
    if (currentSection !== 1) setCurrentSection(1);
    setOpen((cur) => !cur);
  };

  const toggleOpen2 = () => {
    if (currentSection !== 2 && isFormValid) setCurrentSection(2);
    setOpen(true);
  };

  const toggleOpen3 = () => {
    if (currentSection !== 3) setCurrentSection(3);
    setOpen(true);
  };

  const toggleOpen4 = () => {
    if (currentSection !== 4) setCurrentSection(4);
    setOpen(true);
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  useEffect(() => {
    getApplications();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      await Services.addApplication(formData)
        .then((res) => {
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
                  <span className="">
                    Application added successfully verification in progress!
                  </span>
                </div>
              </div>
            </div>
          ));
          // setTimeout(() => {
          //   navigate("/dashboard");
          // }, 3000);
          setShowpopup(false);
          getApplications();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.custom((t) => (
        <div
          className={`bg-[#ff5e5b] text-white px-6 py-5 shadow-xl rounded-xl transition-all  ${
            t.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } duration-300 ease-in-out`}>
          <div className="flex items-center gap-2 text-white">
            <span>
              <i class="fa-solid text-xl fa-circle-xmark"></i>
            </span>
            <div>
              <span className="">Please Enter all fields</span>
            </div>
          </div>
        </div>
      ));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };
  const handleTopicsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.mobileNumber.trim() !== "" &&
      formData.email.trim() !== ""
    );
  };

  // const isLastFormValid = () => {
  //   return (
  //     formData.goalamount.trim() !== "" &&
  //     formData.goalformat.trim() !== "" &&
  //     formData.amountoflevel.trim() !== "" &&
  //     formData.levelname.trim() !== "" &&
  //     formData.description.trim() !== "" &&
  //     formData.minimumgoal.trim() !== "" &&
  //     formData.buttonlabel.trim() !== "" &&
  //     formData.goalmet.trim() !== ""
  //   );
  // };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updateData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userImage: userImage,
      mobileNumber: mobileNumber,
      portfolioLink: portfolioLink,
      applyPosition: applyPosition,
      expectedSalary: expectedSalary,
      address: "",
      dob: "",
      relocate: "",
      previousCompanyName: previousCompanyName,
      comments: comments,
    };

    console.log(updateData);

    Services.updateApplication(data.id, updateData)
      .then((res) => {
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
                  <span className="">
                    Application updated successfully!
                  </span>
                </div>
              </div>
            </div>
          ));
          getApplications()

        setShoweditpopup(false);
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
                  <span className="">Unable to update</span>
                </div>
              </div>
            </div>
          ));
      });
  };

  const handleUpdateNext = (e) => {
    e.preventDefault();
    if (currentSection === 1) {
      setCurrentSection(2);
      console.log(formData);
    } else if (currentSection === 2) {
      console.log(formData);
      setCurrentSection(3);
    } else if (currentSection === 3) {
      console.log(formData);
      setCurrentSection(4);
    } else if (currentSection === 4) {
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentSection === 1) {
      if (isFormValid()) {
        setCurrentSection(2);
        console.log(formData);
      } else {
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
                <span className="">Please Enter all fields</span>
              </div>
            </div>
          </div>
        ));
      }
    } else if (currentSection === 2) {
      if (formData.userImage.trim() !== "") {
        console.log(formData);
        setCurrentSection(3);
      } else {
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
                <span className="">Please Enter all fields</span>
              </div>
            </div>
          </div>
        ));
      }
    } else if (currentSection === 3) {
      console.log(formData);
      setCurrentSection(4);
    } else if (currentSection === 4) {
    }
  };

  const handlePrev = () => {
    if (currentSection === 2) {
      setCurrentSection(1); // Move back to the "Title" section
    } else if (currentSection === 3) {
      setCurrentSection(2); // Move back to the "Problem" section
    } else if (currentSection === 4) {
      setCurrentSection(3); // Move back to the "Photo" section
    }
  };

  return (
    <div className="bg-[#fbf9f6] h-screen ">
      <header className=" flex items-start">
        <nav className="w-4/5 p-5 flex items-center  justify-between">
          <div className="flex items-center gap-3">
            <figure className="font-poppins font-bold bg-[#f9f2e7] w-fit p-2 rounded-md">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="mh-50px">
                <g
                  id="Stockholm-icons-/-Text-/-Article"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd">
                  <rect id="bound" x="0" y="0" width="24" height="24"></rect>
                  <rect
                    id="Rectangle-20"
                    fill="#000000"
                    x="4"
                    y="5"
                    width="16"
                    height="3"
                    rx="1.5"></rect>
                  <path
                    d="M5.5,15 L18.5,15 C19.3284271,15 20,15.6715729 20,16.5 C20,17.3284271 19.3284271,18 18.5,18 L5.5,18 C4.67157288,18 4,17.3284271 4,16.5 C4,15.6715729 4.67157288,15 5.5,15 Z M5.5,10 L12.5,10 C13.3284271,10 14,10.6715729 14,11.5 C14,12.3284271 13.3284271,13 12.5,13 L5.5,13 C4.67157288,13 4,12.3284271 4,11.5 C4,10.6715729 4.67157288,10 5.5,10 Z"
                    id="Combined-Shape"
                    fill="#000000"
                    opacity="0.3"></path>
                </g>
              </svg>
            </figure>
            <p className="font-bold font-poppins text-xl">JobSeeker.</p>
          </div>
          <div className="font-poppins flex items-center gap-8">
            <input
              className="px-5 py-2 font-poppins  rounded-lg focus:outline-none"
              name="searchbar"
              placeholder="Search"
              type="text"
            />
            <div className="flex    items-center gap-10 font-semibold text-[#9ea4b5]">
              <button className="hover:text-black hover:transition-all hover:duration-500">
                Overview
              </button>
              <button className="hover:text-black hover:transition-all hover:duration-500">
                Finance
              </button>
              <button className="hover:text-black hover:transition-all hover:duration-500">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  class="mh-50px">
                  <path
                    opacity="0.3"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.4862 18L12.7975 21.0566C12.5304 21.54 11.922 21.7153 11.4386 21.4483C11.2977 21.3704 11.1777 21.2597 11.0887 21.1255L9.01653 18H5C3.34315 18 2 16.6569 2 15V6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V15C22 16.6569 20.6569 18 19 18H14.4862Z"
                    fill="black"></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 7H15C15.5523 7 16 7.44772 16 8C16 8.55228 15.5523 9 15 9H6C5.44772 9 5 8.55228 5 8C5 7.44772 5.44772 7 6 7ZM6 11H11C11.5523 11 12 11.4477 12 12C12 12.5523 11.5523 13 11 13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11Z"
                    fill="black"></path>
                </svg>
              </button>
              <button className="hover:text-black hover:transition-all hover:duration-500">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="mh-50px">
                  <g
                    id="Stockholm-icons-/-General-/-User"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd">
                    <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                    <path
                      d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                      id="Mask"
                      fill="#000000"
                      fill-rule="nonzero"
                      opacity="0.3"></path>
                    <path
                      d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                      id="Mask-Copy"
                      fill="#000000"
                      fill-rule="nonzero"></path>
                  </g>
                </svg>
              </button>
              <button className="hover:text-white hover:bg-[#f1416c] bg-[#ffeff3] px-3 py-1.5 rounded-lg  hover:transition-all hover:duration-500 text-[#f1416c]">
                <span>3</span>
              </button>
            </div>
          </div>
          <div className="font-poppins flex items-center gap-5"></div>
        </nav>
        <aside className="bg-[#5710b2] font-poppins  fixed right-0 h-screen w-[22rem]">
          <div className="p-5 pt-12 text-xl text-white flex items-center gap-3">
            <span>
              <i class="fa-solid fa-chart-simple"></i>
            </span>
            <p className="font-extrabold">Application Analysis</p>
          </div>
          <div className="text-white flex flex-col gap-5  font-bold p-5">
            <p>
              Number of Applications:<span> {showexpense?.length}</span>
            </p>

            <figure className="pt-16">
              <svg
                id="SvgjsSvg5412"
                width="343"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:svgjs="http://svgjs.com/svgjs"
                class="apexcharts-svg"
                xmlns:data="ApexChartsNS"
                transform="translate(0, 0)">
                <g
                  id="SvgjsG5414"
                  class="apexcharts-inner apexcharts-graphical"
                  transform="translate(42.09090995788574, 30)">
                  <defs id="SvgjsDefs5413">
                    <clipPath id="gridRectMaskflw4ply9i">
                      <rect
                        id="SvgjsRect5418"
                        width="296.90909004211426"
                        height="179.93527076339723"
                        x="-3"
                        y="-1"
                        rx="0"
                        ry="0"
                        opacity="1"
                        stroke-width="0"
                        stroke="none"
                        stroke-dasharray="0"
                        fill="#fff"></rect>
                    </clipPath>
                    <clipPath id="gridRectMarkerMaskflw4ply9i">
                      <rect
                        id="SvgjsRect5419"
                        width="294.90909004211426"
                        height="181.93527076339723"
                        x="-2"
                        y="-2"
                        rx="0"
                        ry="0"
                        opacity="1"
                        stroke-width="0"
                        stroke="none"
                        stroke-dasharray="0"
                        fill="#fff"></rect>
                    </clipPath>
                  </defs>
                  <g
                    id="SvgjsG5429"
                    class="apexcharts-xaxis"
                    transform="translate(0, 0)">
                    <g
                      id="SvgjsG5430"
                      class="apexcharts-xaxis-texts-g"
                      transform="translate(0, -4)">
                      <text
                        id="SvgjsText5432"
                        font-family="inherit"
                        x="24.24242417017619"
                        y="206.93527076339723"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        font-weight="400"
                        fill="#823fd9"
                        class="apexcharts-text apexcharts-xaxis-label ">
                        <tspan id="SvgjsTspan5433">Feb</tspan>
                        <title>Feb</title>
                      </text>
                      <text
                        id="SvgjsText5435"
                        font-family="inherit"
                        x="72.72727251052856"
                        y="206.93527076339723"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        font-weight="400"
                        fill="#823fd9"
                        class="apexcharts-text apexcharts-xaxis-label ">
                        <tspan id="SvgjsTspan5436">Mar</tspan>
                        <title>Mar</title>
                      </text>
                      <text
                        id="SvgjsText5438"
                        font-family="inherit"
                        x="121.21212085088094"
                        y="206.93527076339723"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        font-weight="400"
                        fill="#823fd9"
                        class="apexcharts-text apexcharts-xaxis-label ">
                        <tspan id="SvgjsTspan5439">Apr</tspan>
                        <title>Apr</title>
                      </text>
                      <text
                        id="SvgjsText5441"
                        font-family="inherit"
                        x="169.69696919123334"
                        y="206.93527076339723"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        font-weight="400"
                        fill="#823fd9"
                        class="apexcharts-text apexcharts-xaxis-label ">
                        <tspan id="SvgjsTspan5442">May</tspan>
                        <title>May</title>
                      </text>
                      <text
                        id="SvgjsText5444"
                        font-family="inherit"
                        x="218.18181753158572"
                        y="206.93527076339723"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        font-weight="400"
                        fill="#823fd9"
                        class="apexcharts-text apexcharts-xaxis-label ">
                        <tspan id="SvgjsTspan5445">Jun</tspan>
                        <title>Jun</title>
                      </text>
                      <text
                        id="SvgjsText5447"
                        font-family="inherit"
                        x="266.66666587193805"
                        y="206.93527076339723"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        font-weight="400"
                        fill="#823fd9"
                        class="apexcharts-text apexcharts-xaxis-label ">
                        <tspan id="SvgjsTspan5448">Jul</tspan>
                        <title>Jul</title>
                      </text>
                    </g>
                  </g>
                  <g id="SvgjsG5461" class="apexcharts-grid">
                    <g id="SvgjsG5462" class="apexcharts-gridlines-horizontal">
                      <line
                        id="SvgjsLine5464"
                        x1="0"
                        y1="0"
                        x2="290.90909004211426"
                        y2="0"
                        stroke="#661dc5"
                        stroke-dasharray="4"
                        class="apexcharts-gridline"></line>
                      <line
                        id="SvgjsLine5465"
                        x1="0"
                        y1="44.48381769084931"
                        x2="290.90909004211426"
                        y2="44.48381769084931"
                        stroke="#661dc5"
                        stroke-dasharray="4"
                        class="apexcharts-gridline"></line>
                      <line
                        id="SvgjsLine5466"
                        x1="0"
                        y1="88.96763538169861"
                        x2="290.90909004211426"
                        y2="88.96763538169861"
                        stroke="#661dc5"
                        stroke-dasharray="4"
                        class="apexcharts-gridline"></line>
                      <line
                        id="SvgjsLine5467"
                        x1="0"
                        y1="133.4514530725479"
                        x2="290.90909004211426"
                        y2="133.4514530725479"
                        stroke="#661dc5"
                        stroke-dasharray="4"
                        class="apexcharts-gridline"></line>
                      <line
                        id="SvgjsLine5468"
                        x1="0"
                        y1="177.93527076339723"
                        x2="290.90909004211426"
                        y2="177.93527076339723"
                        stroke="#661dc5"
                        stroke-dasharray="4"
                        class="apexcharts-gridline"></line>
                    </g>
                    <g
                      id="SvgjsG5463"
                      class="apexcharts-gridlines-vertical"></g>
                    <line
                      id="SvgjsLine5470"
                      x1="0"
                      y1="177.93527076339723"
                      x2="290.90909004211426"
                      y2="177.93527076339723"
                      stroke="transparent"
                      stroke-dasharray="0"></line>
                    <line
                      id="SvgjsLine5469"
                      x1="0"
                      y1="1"
                      x2="0"
                      y2="177.93527076339723"
                      stroke="transparent"
                      stroke-dasharray="0"></line>
                  </g>
                  <g
                    id="SvgjsG5420"
                    class="apexcharts-bar-series apexcharts-plot-series">
                    <g
                      id="SvgjsG5421"
                      class="apexcharts-series"
                      rel="1"
                      seriesName="Profit"
                      data:realIndex="0">
                      <path
                        id="SvgjsPath5423"
                        d="M16.969696919123333 177.93527076339723L16.969696919123333 69.36209016180038C21.151515086491905 65.84693866109848 25.333333253860474 65.84693866109848 29.515151421229046 69.36209016180038L29.515151421229046 69.36209016180038L29.515151421229046 177.93527076339723L29.515151421229046 177.93527076339723C29.515151421229046 177.93527076339723 16.969696919123333 177.93527076339723 16.969696919123333 177.93527076339723 "
                        fill="rgba(102,29,197,1)"
                        fill-opacity="1"
                        stroke="transparent"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="2"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMaskflw4ply9i)"
                        pathTo="M 16.969696919123333 177.93527076339723L 16.969696919123333 69.36209016180038Q 23.24242417017619 64.08936291074752 29.515151421229046 69.36209016180038L 29.515151421229046 69.36209016180038L 29.515151421229046 177.93527076339723L 29.515151421229046 177.93527076339723z"
                        pathFrom="M 16.969696919123333 177.93527076339723L 16.969696919123333 177.93527076339723L 29.515151421229046 177.93527076339723L 29.515151421229046 177.93527076339723L 29.515151421229046 177.93527076339723L 16.969696919123333 177.93527076339723"
                        cy="66.72572653627395"
                        cx="64.45454525947571"
                        j="0"
                        val="25"
                        barHeight="111.20954422712327"
                        barWidth="14.545454502105713"></path>
                      <path
                        id="SvgjsPath5424"
                        d="M65.45454525947571 177.93527076339723L65.45454525947571 47.12018131637572C69.63636342684427 43.60502981567382 73.81818159421285 43.60502981567382 77.99999976158142 47.12018131637572L77.99999976158142 47.12018131637572L77.99999976158142 177.93527076339723L77.99999976158142 177.93527076339723C77.99999976158142 177.93527076339723 65.45454525947571 177.93527076339723 65.45454525947571 177.93527076339723 "
                        fill="rgba(102,29,197,1)"
                        fill-opacity="1"
                        stroke="transparent"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="2"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMaskflw4ply9i)"
                        pathTo="M 65.45454525947571 177.93527076339723L 65.45454525947571 47.12018131637572Q 71.72727251052856 41.847454065322864 77.99999976158142 47.12018131637572L 77.99999976158142 47.12018131637572L 77.99999976158142 177.93527076339723L 77.99999976158142 177.93527076339723z"
                        pathFrom="M 65.45454525947571 177.93527076339723L 65.45454525947571 177.93527076339723L 77.99999976158142 177.93527076339723L 77.99999976158142 177.93527076339723L 77.99999976158142 177.93527076339723L 65.45454525947571 177.93527076339723"
                        cy="44.48381769084929"
                        cx="112.9393935998281"
                        j="1"
                        val="30"
                        barHeight="133.45145307254793"
                        barWidth="14.545454502105713"></path>
                      <path
                        id="SvgjsPath5425"
                        d="M113.9393935998281 177.93527076339723L113.9393935998281 2.6363636255264282C118.12121176719666 -0.8787878751754761 122.30302993456523 -0.8787878751754761 126.4848481019338 2.6363636255264282L126.4848481019338 2.6363636255264282L126.4848481019338 177.93527076339723L126.4848481019338 177.93527076339723C126.4848481019338 177.93527076339723 113.9393935998281 177.93527076339723 113.9393935998281 177.93527076339723 "
                        fill="rgba(102,29,197,1)"
                        fill-opacity="1"
                        stroke="transparent"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="2"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMaskflw4ply9i)"
                        pathTo="M 113.9393935998281 177.93527076339723L 113.9393935998281 2.6363636255264282Q 120.21212085088095 -2.6363636255264282 126.4848481019338 2.6363636255264282L 126.4848481019338 2.6363636255264282L 126.4848481019338 177.93527076339723L 126.4848481019338 177.93527076339723z"
                        pathFrom="M 113.9393935998281 177.93527076339723L 113.9393935998281 177.93527076339723L 126.4848481019338 177.93527076339723L 126.4848481019338 177.93527076339723L 126.4848481019338 177.93527076339723L 113.9393935998281 177.93527076339723"
                        cy="0"
                        cx="161.42424194018048"
                        j="2"
                        val="40"
                        barHeight="177.93527076339723"
                        barWidth="14.545454502105713"></path>
                      <path
                        id="SvgjsPath5426"
                        d="M162.42424194018048 177.93527076339723L162.42424194018048 47.12018131637572C166.60606010754904 43.60502981567382 170.78787827491763 43.60502981567382 174.9696964422862 47.12018131637572L174.9696964422862 47.12018131637572L174.9696964422862 177.93527076339723L174.9696964422862 177.93527076339723C174.9696964422862 177.93527076339723 162.42424194018048 177.93527076339723 162.42424194018048 177.93527076339723 "
                        fill="rgba(102,29,197,1)"
                        fill-opacity="1"
                        stroke="transparent"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="2"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMaskflw4ply9i)"
                        pathTo="M 162.42424194018048 177.93527076339723L 162.42424194018048 47.12018131637572Q 168.69696919123334 41.847454065322864 174.9696964422862 47.12018131637572L 174.9696964422862 47.12018131637572L 174.9696964422862 177.93527076339723L 174.9696964422862 177.93527076339723z"
                        pathFrom="M 162.42424194018048 177.93527076339723L 162.42424194018048 177.93527076339723L 174.9696964422862 177.93527076339723L 174.9696964422862 177.93527076339723L 174.9696964422862 177.93527076339723L 162.42424194018048 177.93527076339723"
                        cy="44.48381769084929"
                        cx="209.90909028053287"
                        j="3"
                        val="30"
                        barHeight="133.45145307254793"
                        barWidth="14.545454502105713"></path>
                      <path
                        id="SvgjsPath5427"
                        d="M210.90909028053287 177.93527076339723L210.90909028053287 24.87827247095109C215.09090844790143 21.363120970249184 219.27272661527002 21.363120970249184 223.45454478263858 24.87827247095109L223.45454478263858 24.87827247095109L223.45454478263858 177.93527076339723L223.45454478263858 177.93527076339723C223.45454478263858 177.93527076339723 210.90909028053287 177.93527076339723 210.90909028053287 177.93527076339723 "
                        fill="rgba(102,29,197,1)"
                        fill-opacity="1"
                        stroke="transparent"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="2"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMaskflw4ply9i)"
                        pathTo="M 210.90909028053287 177.93527076339723L 210.90909028053287 24.87827247095109Q 217.18181753158572 19.605545219898232 223.45454478263858 24.87827247095109L 223.45454478263858 24.87827247095109L 223.45454478263858 177.93527076339723L 223.45454478263858 177.93527076339723z"
                        pathFrom="M 210.90909028053287 177.93527076339723L 210.90909028053287 177.93527076339723L 223.45454478263858 177.93527076339723L 223.45454478263858 177.93527076339723L 223.45454478263858 177.93527076339723L 210.90909028053287 177.93527076339723"
                        cy="22.24190884542466"
                        cx="258.39393862088525"
                        j="4"
                        val="35"
                        barHeight="155.69336191797257"
                        barWidth="14.545454502105713"></path>
                      <path
                        id="SvgjsPath5428"
                        d="M259.39393862088525 177.93527076339723L259.39393862088525 47.12018131637572C263.57575678825384 43.60502981567382 267.75757495562243 43.60502981567382 271.93939312299096 47.12018131637572L271.93939312299096 47.12018131637572L271.93939312299096 177.93527076339723L271.93939312299096 177.93527076339723C271.93939312299096 177.93527076339723 259.39393862088525 177.93527076339723 259.39393862088525 177.93527076339723 "
                        fill="rgba(102,29,197,1)"
                        fill-opacity="1"
                        stroke="transparent"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="2"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMaskflw4ply9i)"
                        pathTo="M 259.39393862088525 177.93527076339723L 259.39393862088525 47.12018131637572Q 265.6666658719381 41.847454065322864 271.93939312299096 47.12018131637572L 271.93939312299096 47.12018131637572L 271.93939312299096 177.93527076339723L 271.93939312299096 177.93527076339723z"
                        pathFrom="M 259.39393862088525 177.93527076339723L 259.39393862088525 177.93527076339723L 271.93939312299096 177.93527076339723L 271.93939312299096 177.93527076339723L 271.93939312299096 177.93527076339723L 259.39393862088525 177.93527076339723"
                        cy="44.48381769084929"
                        cx="306.8787869612376"
                        j="5"
                        val="30"
                        barHeight="133.45145307254793"
                        barWidth="14.545454502105713"
                        selected="true"></path>
                    </g>
                    <g
                      id="SvgjsG5422"
                      class="apexcharts-datalabels"
                      data:realIndex="0"></g>
                  </g>
                  <line
                    id="SvgjsLine5471"
                    x1="0"
                    y1="0"
                    x2="290.90909004211426"
                    y2="0"
                    stroke-dasharray="0"
                    stroke-width="0"
                    class="apexcharts-ycrosshairs-hidden"></line>
                  <g id="SvgjsG5472" class="apexcharts-yaxis-annotations"></g>
                  <g id="SvgjsG5473" class="apexcharts-xaxis-annotations"></g>
                  <g id="SvgjsG5474" class="apexcharts-point-annotations"></g>
                </g>
                <g
                  id="SvgjsG5449"
                  class="apexcharts-yaxis"
                  rel="0"
                  transform="translate(12.090909957885742, 0)">
                  <g id="SvgjsG5450" class="apexcharts-yaxis-texts-g">
                    <text
                      id="SvgjsText5451"
                      font-family="inherit"
                      x="20"
                      y="31.4"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="12px"
                      font-weight="400"
                      fill="#823fd9"
                      class="apexcharts-text apexcharts-yaxis-label ">
                      <tspan id="SvgjsTspan5452">40</tspan>
                    </text>
                    <text
                      id="SvgjsText5453"
                      font-family="inherit"
                      x="20"
                      y="75.88381769084931"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="12px"
                      font-weight="400"
                      fill="#823fd9"
                      class="apexcharts-text apexcharts-yaxis-label ">
                      <tspan id="SvgjsTspan5454">30</tspan>
                    </text>
                    <text
                      id="SvgjsText5455"
                      font-family="inherit"
                      x="20"
                      y="120.36763538169862"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="12px"
                      font-weight="400"
                      fill="#823fd9"
                      class="apexcharts-text apexcharts-yaxis-label ">
                      <tspan id="SvgjsTspan5456">20</tspan>
                    </text>
                    <text
                      id="SvgjsText5457"
                      font-family="inherit"
                      x="20"
                      y="164.8514530725479"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="12px"
                      font-weight="400"
                      fill="#823fd9"
                      class="apexcharts-text apexcharts-yaxis-label ">
                      <tspan id="SvgjsTspan5458">10</tspan>
                    </text>
                    <text
                      id="SvgjsText5459"
                      font-family="inherit"
                      x="20"
                      y="209.33527076339723"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="12px"
                      font-weight="400"
                      fill="#823fd9"
                      class="apexcharts-text apexcharts-yaxis-label ">
                      <tspan id="SvgjsTspan5460">0</tspan>
                    </text>
                  </g>
                </g>
                <g id="SvgjsG5415" class="apexcharts-annotations"></g>
              </svg>
            </figure>
          </div>
        </aside>
      </header>
      <main className="flex gap-10 items-center ">
        <section className="py-12 pl-12">
          <div className="font-poppins flex flex-col h-[28em] justify-between items-center gap-5  bg-white w-fit rounded-xl ">
            <p className="text-center font-bold text-2xl w-72 pt-24">
              Kickstart Your Application
            </p>
            <button
              onClick={handleShowpopup}
              className="text-white   font-bold bg-[#20d489] rounded-lg w-fit py-2 px-5">
              Apply now
            </button>
            <figure className="">
              <img className="w-72 " src={p1} alt="" />
            </figure>
          </div>
        </section>
        <section className=" ">
          <div className="bg-white font-poppins p-3 h-[28em] rounded-xl w-[37em]">
            <div>
              <p className="font-extrabold text-xl p-5">List of Applications</p>
            </div>
            {showexpense?.map((data) => {
              const timestamp = data.createdAt;
              const formattedDate = new Intl.DateTimeFormat("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(timestamp));
              return (
                <div className="flex items-center w-full  justify-between p-3">
                  <div className="flex items-center gap-3">
                    <figure className=" px-3 py-2 rounded-lg ">
                      {/* <i class="fa-solid text-[#9c85ff] text-lg fa-shirt"></i> */}
                      <img
                        className="w-16 object-cover rounded-lg"
                        src={data.userImage}
                        alt=""
                      />
                    </figure>
                    <div>
                      <p className="font-bold">{data?.firstName}</p>
                      <p className="text-[#a8adbc]">{formattedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => handlePopup(data)}
                      className="font-bold text-[#59a7ff] bg-[#ddecff] px-3 py-1.5 rounded-lg">
                      <i class="fa-solid fa-eye"></i>{" "}
                    </button>
                    <button
                      onClick={() => handleEditApplication(data)}
                      className="bg-[#ddecff] px-3 py-1.5 rounded-lg">
                      <i class="fa-solid text-[#59a7ff] fa-pencil "></i>
                    </button>
                    <button
                      onClick={() => deleteApplication(data.id)}
                      className="bg-[#f4f7fc] px-3 py-1.5 rounded-lg">
                      <i class="fa-solid text-[#b6bbc6] text-sm fa-x"></i>
                    </button>
                  </div>
                </div>
              );
            })}
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
      />{" "}
      {showpopup ? (
        <div
          class="min-w-screen font-poppins h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id">
          <div
            class="absolute bg-black opacity-25
                           inset-0 z-0"></div>
          <div class="w-full max-w-4xl h-[35em] p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <div class="">
              <div>
                <h1 className="text-center text-xl mt-3 font-extrabold">
                  Apply now
                </h1>
              </div>
              <div className="flex  gap-12 p-5 items-start">
                <div className=" w-[20em]">
                  <div className="flex flex-col items-start gap-12  ">
                    <div className="flex items-center gap-4">
                      <figure className="bg-[#e4fff4]  px-5 w-fit py-2.5 rounded-xl">
                        <button
                          onClick={toggleOpen}
                          className="font-bold text-[#20d489]">
                          1
                        </button>
                      </figure>
                      <div>
                        <p className="font-bold">Basic Details</p>
                        <span className="text-sm text-[#a9adbe] ">
                          Add your details
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <figure className="bg-[#f5f8fa]  px-5 w-fit py-2.5 rounded-xl">
                        <button
                          onClick={toggleOpen2}
                          className="font-bold  text-black">
                          2
                        </button>
                      </figure>
                      <div>
                        <p className="font-bold">User Image</p>
                        <span className="text-sm text-[#a9adbe] ">
                          Add your Image
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <figure className="bg-[#f5f8fa]  px-5 w-fit py-2.5 rounded-xl">
                        <button
                          onClick={toggleOpen3}
                          className="font-bold  text-black">
                          3
                        </button>
                      </figure>
                      <div>
                        <p className="font-bold">Job details</p>
                        <span className="text-sm text-[#a9adbe] ">
                          select your Jobdetails
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <figure className="bg-[#f5f8fa]  px-5 w-fit py-2.5 rounded-xl">
                        <button
                          onClick={toggleOpen4}
                          className="font-bold  text-black">
                          4
                        </button>
                      </figure>
                      <div>
                        <p className="font-bold">User comments</p>
                        <span className="text-sm text-[#a9adbe] ">
                          Add your comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {currentSection === 1 && (
                  <Collapse open={open}>
                    <div className="p-3 flex w-4/3 flex-col gap-6 ">
                      <div className="flex items-center gap-3">
                        <input
                          onChange={handleInputChange}
                          placeholder="Please Enter Your FirstName"
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="firstName"
                          id="firstName"
                          required
                          value={formData.firstName}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          onChange={handleInputChange}
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Please Enter your LastName"
                          value={formData.lastName}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          onChange={handleInputChange}
                          placeholder="Please Enter Your Mobilenumber"
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="mobileNumber"
                          id="mobileNumber"
                          required
                          maxLength={"10"}
                          value={formData.mobileNumber}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          onChange={handleInputChange}
                          placeholder="Please Enter Your Email"
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="email"
                          name="email"
                          id="email"
                          required
                        />
                      </div>
                    </div>
                  </Collapse>
                )}
                {currentSection === 2 && (
                  <Collapse open={open}>
                    <div className="flex  flex-col  ml-12 xl:items-start justify-center gap-5 lg:px-5 ">
                      <div className="flex flex-col justify-center ">
                        <p className="font-bold text-darkteal text-2xl">
                          Add a photo
                        </p>
                      </div>
                      <div className="flex flex-col gap-20">
                        <div className="flex flex-col gap-3">
                          <div>
                            <button>
                              <span className="font-bold text-darkteal">
                                Image
                              </span>
                              {/* <span className="text-red">*</span> */}
                            </button>
                          </div>
                          <div className="h-full relative xl:w-[30em]">
                            {image ? (
                              <div className="relative">
                                <img
                                  className=" w-full rounded-xl xl:w-72 lg:w-32 object-cover"
                                  src={URL.createObjectURL(image)}
                                  alt=""
                                />
                                <button
                                  onClick={handleDeleteImage}
                                  className="absolute top-0 flex items-center gap-2 right-0 px-3 py-1.5 font-bold text-bordergray text-sm bg-[#fbf8ef]  ">
                                  <span>
                                    <i class="fa-solid fa-trash"></i>
                                  </span>
                                  <span>Delete</span>
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center   w-[25em] border-[#cccccc] border-2 border-dashed rounded-2xl  lg:w-full lg:px-5 lg:py-16  xl:py-12 flex-col gap-5">
                                <>
                                  <figure>
                                    <img
                                      className="xl:w-32 lg:w-32"
                                      src={photodrop}
                                      alt=""
                                    />
                                  </figure>
                                  <button className="border-[1px] px-5 py-2 border-[#cccccc] lg:flex lg:gap-3 lg:items-center text-bordergray rounded-lg">
                                    <span>
                                      <i class="fa-regular fa-folder-open"></i>
                                    </span>
                                    <button
                                      title=""
                                      className=" text-sm  font-semibold rounded-md ">
                                      <input
                                        type="file"
                                        onChange={handleImageChange}
                                        ref={fileRef}
                                        className="fileInput hidden"
                                        name="myfile"
                                        id="fileInput"
                                      />
                                      <label
                                        className="lg:text-sm inline-block xl:py-[0.5rem] xl:px-3  rounded-md w-cursor-pointer transition-all duration-700 delay-150 ease-in-out"
                                        for="fileInput"
                                        id="fileInputLabel">
                                        Browser Image
                                      </label>
                                    </button>
                                  </button>
                                </>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                )}
                {currentSection === 3 && (
                  <Collapse open={open}>
                    <div className="p-3 flex w-4/3 flex-col gap-6 ">
                      <div className="flex items-center gap-3">
                        <input
                          onChange={handleInputChange}
                          placeholder="Please Enter Your Portfoliolink"
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="portfolioLink"
                          id="portfolioLink"
                          required
                          value={formData.portfolioLink}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          onChange={handleInputChange}
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="applyPosition"
                          id="applyPosition"
                          placeholder="Please Enter your Apply Position"
                          value={formData.applyPosition}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          onChange={handleInputChange}
                          placeholder="Please Enter Your Expectedsalary"
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="expectedSalary"
                          id="expectedSalary"
                          required
                          value={formData.expectedSalary}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          onChange={handleInputChange}
                          value={formData.previousCompanyName}
                          placeholder="Please Enter Your Previous Company Name"
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="previousCompanyName"
                          id="previousCompanyName"
                          required
                        />
                      </div>
                    </div>
                  </Collapse>
                )}
                {currentSection === 4 && (
                  <Collapse open={open}>
                    <div className="p-3 flex w-4/3 flex-col gap-6 ">
                      <div className="flex items-center gap-3">
                        <textarea
                          onChange={handleInputChange}
                          placeholder="Please Enter Your Comments"
                          className="bg-[#f5f8fa] w-full h-[20em] resize-none px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="comments"
                          id="comments"
                          value={formData.comments}
                          required
                        />
                      </div>
                    </div>
                  </Collapse>
                )}
              </div>
              <div class="   text-center space-x-4 md:block">
                <button
                  onClick={() => setShowpopup(false)}
                  class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-lg hover:shadow-lg hover:bg-gray-100 ">
                  Cancel
                </button>

                {currentSection <= 3 ? (
                  <button
                    onClick={handleNext}
                    class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white bg-[#20d489] rounded-lg hover:shadow-lg hover:bg-red-600">
                    <span>next</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white bg-[#20d489] rounded-lg hover:shadow-lg hover:bg-red-600">
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showeditpopup ? (
        <div
          class="min-w-screen font-poppins h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id">
          <div
            class="absolute bg-black opacity-25
                           inset-0 z-0"></div>
          <div class="w-full max-w-4xl h-[35em] p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <div class="">
              <div>
                <h1 className="text-center text-xl mt-3 font-extrabold">
                  Edit Application
                </h1>
              </div>
              <div className="flex  gap-12 p-5 items-start">
                <div className=" w-[20em]">
                  <div className="flex flex-col items-start gap-12  ">
                    <div className="flex items-center gap-4">
                      <figure className="bg-[#e4fff4]  px-5 w-fit py-2.5 rounded-xl">
                        <button
                          onClick={toggleOpen}
                          className="font-bold text-[#20d489]">
                          1
                        </button>
                      </figure>
                      <div>
                        <p className="font-bold">Basic Details</p>
                        <span className="text-sm text-[#a9adbe] ">
                          Add your details
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <figure className="bg-[#f5f8fa]  px-5 w-fit py-2.5 rounded-xl">
                        <button
                          onClick={toggleOpen2}
                          className="font-bold  text-black">
                          2
                        </button>
                      </figure>
                      <div>
                        <p className="font-bold">User Image</p>
                        <span className="text-sm text-[#a9adbe] ">
                          Add your Image
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <figure className="bg-[#f5f8fa]  px-5 w-fit py-2.5 rounded-xl">
                        <button
                          onClick={toggleOpen3}
                          className="font-bold  text-black">
                          3
                        </button>
                      </figure>
                      <div>
                        <p className="font-bold">Job details</p>
                        <span className="text-sm text-[#a9adbe] ">
                          select your Jobdetails
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <figure className="bg-[#f5f8fa]  px-5 w-fit py-2.5 rounded-xl">
                        <button
                          onClick={toggleOpen4}
                          className="font-bold  text-black">
                          4
                        </button>
                      </figure>
                      <div>
                        <p className="font-bold">User comments</p>
                        <span className="text-sm text-[#a9adbe] ">
                          Add your comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {currentSection === 1 && (
                  <Collapse open={open}>
                    <div className="p-3 flex w-4/3 flex-col gap-6 ">
                      <div className="flex items-center gap-3">
                        <input
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Please Enter Your FirstName"
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="firstName"
                          id="firstName"
                          required
                          value={firstName}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          onChange={(e) => setLastName(e.target.value)}
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Please Enter your LastName"
                          value={lastName}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="Please Enter Your Mobilenumber"
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="mobileNumber"
                          id="mobileNumber"
                          required
                          maxLength={"10"}
                          value={mobileNumber}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Please Enter Your Email"
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="email"
                          name="email"
                          value={email}
                          id="email"
                          required
                        />
                      </div>
                    </div>
                  </Collapse>
                )}
                {currentSection === 2 && (
                  <Collapse open={open}>
                    <div className="flex  flex-col  ml-12 xl:items-start justify-center gap-5 lg:px-5 ">
                      <div className="flex flex-col justify-center ">
                        <p className="font-bold text-darkteal text-2xl">
                          Add a photo
                        </p>
                      </div>
                      <div className="flex flex-col gap-20">
                        <div className="flex flex-col gap-3">
                          <div>
                            <button>
                              <span className="font-bold text-darkteal">
                                Image
                              </span>
                              {/* <span className="text-red">*</span> */}
                            </button>
                          </div>
                          <div className="h-full relative xl:w-[30em]">
                            {userImage ? (
                              <div className="relative">
                                <img
                                  className=" w-full rounded-xl xl:w-72 lg:w-32 object-cover"
                                  src={userImage}
                                  alt=""
                                />
                                <button
                                  onClick={handleDeleteImage}
                                  className="absolute top-0 flex items-center gap-2 right-0 px-3 py-1.5 font-bold text-bordergray text-sm bg-[#fbf8ef]  ">
                                  <span>
                                    <i class="fa-solid fa-trash"></i>
                                  </span>
                                  <span>Delete</span>
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center   w-[25em] border-[#cccccc] border-2 border-dashed rounded-2xl  lg:w-full lg:px-5 lg:py-16  xl:py-12 flex-col gap-5">
                                <>
                                  <figure>
                                    <img
                                      className="xl:w-32 lg:w-32"
                                      src={photodrop}
                                      alt=""
                                    />
                                  </figure>
                                  <button className="border-[1px] px-5 py-2 border-[#cccccc] lg:flex lg:gap-3 lg:items-center text-bordergray rounded-lg">
                                    <span>
                                      <i class="fa-regular fa-folder-open"></i>
                                    </span>
                                    <button
                                      title=""
                                      className=" text-sm  font-semibold rounded-md ">
                                      <input
                                        type="file"
                                        onChange={handleImageChange}
                                        ref={fileRef}
                                        className="fileInput hidden"
                                        name="myfile"
                                        id="fileInput"
                                      />
                                      <label
                                        className="lg:text-sm inline-block xl:py-[0.5rem] xl:px-3  rounded-md w-cursor-pointer transition-all duration-700 delay-150 ease-in-out"
                                        for="fileInput"
                                        id="fileInputLabel">
                                        Browser Image
                                      </label>
                                    </button>
                                  </button>
                                </>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                )}
                {currentSection === 3 && (
                  <Collapse open={open}>
                    <div className="p-3 flex w-4/3 flex-col gap-6 ">
                      <div className="flex items-center gap-3">
                        <input
                          onChange={(e) => setPorfolioLink(e.target.value)}
                          placeholder="Please Enter Your Portfoliolink"
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="portfolioLink"
                          id="portfolioLink"
                          required
                          value={portfolioLink}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          onChange={(e) => setApplyPosition(e.target.value)}
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="applyPosition"
                          id="applyPosition"
                          placeholder="Please Enter your Apply Position"
                          value={applyPosition}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          onChange={(e) => setExpectedSalary(e.target.value)}
                          placeholder="Please Enter Your Expectedsalary"
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="expectedSalary"
                          id="expectedSalary"
                          required
                          value={expectedSalary}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          onChange={(e) =>
                            setPreviousCompanyName(e.target.value)
                          }
                          placeholder="Please Enter Your Previous Company Name"
                          className="bg-[#f5f8fa] w-full px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="previousCompanyName"
                          id="previousCompanyName"
                          value={previousCompanyName}
                          required
                        />
                      </div>
                    </div>
                  </Collapse>
                )}
                {currentSection === 4 && (
                  <Collapse open={open}>
                    <div className="p-3 flex w-4/3 flex-col gap-6 ">
                      <div className="flex items-center gap-3">
                        <textarea
                          onChange={(e) => setComments(e.target.value)}
                          placeholder="Please Enter Your Comments"
                          className="bg-[#f5f8fa] w-full h-[20em] resize-none px-3 py-3.5 focus:outline-none focus:border focus:border-brightgreen rounded-lg"
                          type="text"
                          name="comments"
                          id="comments"
                          value={comments}
                          required
                        />
                      </div>
                    </div>
                  </Collapse>
                )}
              </div>
              <div class="   text-center space-x-4 md:block">
                <button
                  onClick={() => setShoweditpopup(false)}
                  class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-lg hover:shadow-lg hover:bg-gray-100 ">
                  Cancel
                </button>

                {currentSection <= 3 ? (
                  <button
                    onClick={handleUpdateNext}
                    class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white bg-[#20d489] rounded-lg hover:shadow-lg hover:bg-red-600">
                    <span>next</span>
                  </button>
                ) : (
                  <button
                    onClick={handleUpdate}
                    class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white bg-[#20d489] rounded-lg hover:shadow-lg hover:bg-red-600">
                    <span>Update</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {selectedUser && showdetailpopup && (
        <div className="">
          <div
            className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
            id="modal-id">
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-full max-w-3xl  p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
              <div className="">
                <div className="text-center p-5 flex-auto justify-center">
                  <div className=" border-[1px] font-poppins  border-lightgray1 h-[500px]  rounded-xl dark:bg-darkgray1 dark:border-none ">
                    <div className="border-b-[1px] flex justify-between items-center border-lightgray1 rounded-t-lg p-6 ">
                      <h1 className="font-bold text-3xl  dark:text-white">
                        Personal Information
                      </h1>
                    </div>

                    <div className="flex flex-col gap-5">
                      <div className="flex items-center  max-md:flex-col mt-5 ml-6 justify-between">
                        <div
                          key={selectedUser.id}
                          className="w-24 text-bordergray flex items-center gap-5">
                          <label className="font-poppins">Profile:</label>
                          {selectedUser.userImage ? (
                            <img
                              width="50"
                              height="50"
                              className="h-24 w-24 rounded-full"
                              src={selectedUser.userImage}
                              alt={selectedUser.firstName}
                            />
                          ) : (
                            <img
                              width="50"
                              height="50"
                              className="h-24 w-24 rounded-full"
                              src={p1}
                              alt={selectedUser.username}
                            />
                          )}
                        </div>
                      </div>
                      {/* <div className="flex flex-col  gap-3 mt-5  items-left "> */}
                      <div className="flex ml-7 items-center  gap-3">
                        <label className="text-bordergray">Full name:</label>
                        <p className="rounded-md dark:bg-bluegray dark:text-white ">
                          {selectedUser.firstName + selectedUser.lastName}
                        </p>
                      </div>
                      <div className="flex  ml-7   gap-3  ">
                        <label className="text-bordergray">
                          Email address:
                        </label>
                        <p className="rounded-md dark:bg-bluegray dark:text-white border-bordergray">
                          {selectedUser.email}
                        </p>
                      </div>
                      {/* </div> */}
                      <div className="flex ml-5 mt-5 max-md:flex-col  gap-3 items-center ">
                        <div className="flex  gap-3 ml-2  items-left">
                          <label className="text-bordergray">
                            Mobile number:
                          </label>
                          <p className="rounded-md dark:bg-bluegray dark:text-white">
                            {selectedUser.mobileNumber}
                          </p>
                        </div>
                        <div className="flex  gap-3  ml-2 ">
                          <label className="text-bordergray">
                            Portfolio link:
                          </label>
                          <p className="rounded-md dark:bg-bluegray dark:text-white">
                            {selectedUser.portfolioLink}
                          </p>
                        </div>
                      </div>
                      <div className="flex ml-5 max-md:flex-col  gap-3 mt-3 items-center ">
                        <div className="flex  gap-3 ml-2   items-left">
                          <label className="text-bordergray">
                            Apply position:
                          </label>
                          <p className="rounded-md dark:bg-bluegray dark:text-white">
                            {selectedUser.applyPosition}
                          </p>
                        </div>
                        <div className="flex  gap-3 ml-2 ">
                          <label className="text-bordergray">
                            Expected Salary:
                          </label>
                          <p className="rounded-md  dark:bg-bluegray dark:text-white">
                            {selectedUser.expectedSalary}
                          </p>
                        </div>
                      </div>

                      <div className="flex   ml-7  mt-4 gap-3">
                        <label className=" max-md:ml-5 text-bordergray">
                          Comments:
                        </label>
                        <p className=" rounded-md dark:bg-bluegray dark:text-white  max-md:ml-5">
                          {selectedUser.comments}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3   text-center space-x-4 md:block">
                  <button
                    onClick={() => setShowdetailpopup(false)}
                    className="mb-2 md:mb-0 bg-black text-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
