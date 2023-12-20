import React, { useEffect, useState } from "react";
import p1 from "../assets/Images/p1.png";
import axios from "axios";
import { useShowExpense } from "../States/Usestates";

export const Landingsection1 = () => {
  const [count, setCount] = useState(0);
  const [incomecount, setIncomecount] = useState(0);
  const [expensecount, setExpensecount] = useState(0);
  const { showexpense, updateShowExpense } = useShowExpense([]);
  const [showeditpopup, setShoweditpopup] = useState(false);

  const [id, setId] = useState(0);

  const [entrytype, setEntrytype] = useState("");
  const [expensename, setExpensename] = useState("");
  const [expenseamount, setExpenseamount] = useState("");
  const [updateExpense, setUpdateExpense] = useState({});

  const totalValue = showexpense.reduce(
    (total, expense) => total + parseInt(expense.expenseamount, 10),
    0
  );

  const totalExpense = showexpense
    .filter((expense) => expense.entrytype === "Expense")
    .reduce((total, expense) => total + parseInt(expense.expenseamount), 0);

  const totalIncome = showexpense
    .filter((expense) => expense.entrytype === "Income")
    .reduce((total, income) => total + parseInt(income.expenseamount), 0);

  const handleEditExpense = (expense) => {
    setId(expense.id);
    setEntrytype(expense.entrytype);
    setExpensename(expense.expensename);
    setExpenseamount(expense.expenseamount);
    setShoweditpopup(true);
  };

  const editExpense = () => {
    axios
      .put(
        `https://658010ed6ae0629a3f5440cb.mockapi.io/track/expenses/Expensedata/${id}`,
        {
          entrytype,
          expensename,
          expenseamount,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleExpense = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://658010ed6ae0629a3f5440cb.mockapi.io/track/expenses/Expensedata",
        {
          entrytype,
          expensename,
          expenseamount,
        }
      )
      .then((res) => {
        console.log(res.data);
        getExpenses();
        axios.post(
          "https://658010ed6ae0629a3f5440cb.mockapi.io/track/expenses/expenseanalysis",
          {}
        );
        setShowpopup(false);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const getExpenses = () => {
    axios
      .get(
        "https://658010ed6ae0629a3f5440cb.mockapi.io/track/expenses/Expensedata"
      )
      .then((res) => {
        updateShowExpense(res.data);
        console.log(showexpense);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getExpenses();
  }, []);

  const deleteExpense = (id) => {
    axios
      .delete(
        `https://658010ed6ae0629a3f5440cb.mockapi.io/track/expenses/Expensedata/${id}`
      )
      .then((res) => {
        console.log(res.data);
        getExpenses();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [showpopup, setShowpopup] = useState(false);

  const handleShowpopup = () => {
    setShowpopup(!false);
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
            <p className="font-bold font-poppins text-xl">Track.</p>
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
            <p className="font-extrabold">Expense Analysis</p>
          </div>
          <div className="text-white flex flex-col gap-5  font-bold p-5">
            <p>
              Number of Transactions:<span> {showexpense?.length}</span>
            </p>
            <p>
              Total Values:<span>{totalValue}</span>
            </p>
            <p>
              Total Income: <span>{totalIncome}</span>
            </p>
            <p>
              Total Expenses: <span>{totalExpense}</span>
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
              className="text-white font-bold bg-[#20d489] rounded-lg w-fit py-2 px-5">
              Add Expense
            </button>
            <figure className="">
              <img className="w-72 " src={p1} alt="" />
            </figure>
          </div>
        </section>
        <section className=" ">
          <div className="bg-white font-poppins p-3 h-[28em] rounded-xl w-[37em]">
            <div>
              <p className="font-extrabold text-xl p-5">Income & Expenses</p>
            </div>
            {showexpense?.map((expense) => {
              const timestamp = expense.createdAt;
              const formattedDate = new Intl.DateTimeFormat("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(timestamp));
              return (
                <div className="flex items-center w-full  justify-between p-3">
                  <div className="flex items-center gap-3">
                    <figure className="bg-[#f3f1ff] px-3 py-2 rounded-lg ">
                      <i class="fa-solid text-[#9c85ff] text-lg fa-shirt"></i>
                      {/* <img src="" alt="" /> */}
                    </figure>
                    <div>
                      <p className="font-bold">{expense.expensename}</p>
                      <p className="text-[#a8adbc]">{formattedDate}</p>
                    </div>
                  </div>
                  {expense.entrytype === "Expense" ? (
                    <p>
                      <i class="fa-solid text-red  fa-arrow-down"></i>{" "}
                    </p>
                  ) : (
                    <p>
                      <i class="fa-solid text-[#20d489]  fa-arrow-up"></i>
                    </p>
                  )}
                  <div className="flex items-center gap-5">
                    <p className="font-bold">₹ {expense.expenseamount}</p>
                    <button
                      onClick={() => handleEditExpense(expense)}
                      className="bg-[#ddecff] px-3 py-1.5 rounded-lg">
                      <i class="fa-solid text-[#59a7ff] fa-pencil "></i>
                    </button>
                    <button
                      onClick={() => deleteExpense(expense.id)}
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
      {showpopup ? (
        <div
          class="min-w-screen font-poppins h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id">
          <div
            class="absolute bg-black opacity-25
                           inset-0 z-0"></div>
          <div class="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <form onSubmit={handleExpense} class="">
              <div>
                <h1 className="text-center font-bold ">Add Expenses</h1>
              </div>
              <div className="p-3 flex flex-col gap-3 ">
                <div className="flex items-center gap-3">
                  <select
                    required
                    className="bg-[#f5f8fa] w-full px-3 py-2.5 rounded-lg"
                    type="text"
                    onChange={(e) => setEntrytype(e.target.value)}>
                    <option value="Select Entry Type">Select Entry Type</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    onChange={(e) => setExpensename(e.target.value)}
                    placeholder="Please Enter Name of the Expense"
                    className="bg-[#f5f8fa] w-full px-3 py-2.5 rounded-lg"
                    type="text"
                    required
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    onChange={(e) => setExpenseamount(e.target.value)}
                    className="bg-[#f5f8fa] w-full px-3 py-2.5 rounded-lg"
                    type="text"
                    placeholder="Please Enter the Total Amount"
                  />
                </div>
              </div>
              <div class="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={() => setShowpopup(false)}
                  class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-lg hover:shadow-lg hover:bg-gray-100 ">
                  Cancel
                </button>

                <button class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white bg-[#20d489] rounded-lg hover:shadow-lg hover:bg-red-600">
                  <span>Add</span>
                </button>
              </div>
            </form>
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
          <div class="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <form class="">
              <div>
                <h1 className="text-center font-bold ">Edit Expenses</h1>
              </div>
              <div className="p-3 flex flex-col gap-3 ">
                <div className="flex items-center gap-3">
                  <select
                    required
                    className="bg-[#f5f8fa] w-full px-3 py-2.5 rounded-lg"
                    type="text"
                    value={entrytype}
                    onChange={(e) => setEntrytype(e.target.value)}>
                    <option value="Select Entry Type">Select Entry Type</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    onChange={(e) => setExpensename(e.target.value)}
                    value={expensename}
                    placeholder="Please Enter Name of the Expense"
                    className="bg-[#f5f8fa] w-full px-3 py-2.5 rounded-lg"
                    type="text"
                    required
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    onChange={(e) => setExpenseamount(e.target.value)}
                    className="bg-[#f5f8fa] w-full px-3 py-2.5 rounded-lg"
                    type="text"
                    value={expenseamount}
                    placeholder="Please Enter the Total Amount"
                  />
                </div>
              </div>
              <div class="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={() => setShoweditpopup(false)}
                  class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-lg hover:shadow-lg hover:bg-gray-100 ">
                  Cancel
                </button>

                <button class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white bg-[#20d489] rounded-lg hover:shadow-lg hover:bg-red-600">
                  <span onClick={editExpense(id)}>Edit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};
